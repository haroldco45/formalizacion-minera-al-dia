// Robot de noticias de Formalización Minera al Día (PL 117 de 2026 Cámara) — Vibras Positivas HM
// Corre en GitHub Actions cada 30 minutos. Node 22. sharp es opcional (solo para la imagen de vista previa).
import { readFile, writeFile } from 'node:fs/promises';

const ARCHIVO = 'data/noticias.json';
const MAX_ITEMS = 250;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36';

const CONSULTAS = [
  '"formalización minera"',
  '"formalización gradual" minería',
  '"proyecto de ley 117" minería',
  '"pequeña minería" Colombia',
  '"minería de subsistencia"',
  '"pequeños mineros" Colombia',
  'barequeros Antioquia',
  'formalización minera Antioquia',
  'formalización minera "Bajo Cauca"',
  '"ley minera" Congreso Colombia',
  '"Comisión Quinta" minería',
  '"Ana Ligia Mora" minería',
  '"Agencia Nacional de Minería" formalización',
  'mercurio "pequeña minería"',
  'mineros informales Colombia',
  '"áreas de reserva especial" minería'
];

const TEMA = /formaliz|peque[ñn][ao]s? miner|miner[ií]a de (subsistencia|peque[ñn]a escala)|barequ|ley minera|proyecto de ley|mineros? (informales|artesanales|tradicionales|ancestrales)|ventanilla [úu]nica|reserva especial|mercurio|t[ií]tulos? miner|agencia nacional de miner|comisi[óo]n quinta/i;
const MINERO = /miner|minas?\b|oro\b|barequ|mercurio/i;
const FUERA = /reinfo|per[uú]\b|peruan|bolivia|ecuador|chile|venezuela|argentin|m[eé]xic|honduras|guatemala|ghana|sud[aá]frica/i;
const relevante = t => MINERO.test(t) && TEMA.test(t) && !FUERA.test(t);

function limpiar(t = '') {
  return t
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/\s+/g, ' ').trim();
}
function tag(xml, nombre) {
  const m = xml.match(new RegExp(`<${nombre}[^>]*>([\\s\\S]*?)</${nombre}>`, 'i'));
  return m ? limpiar(m[1]) : '';
}
async function traer(url, ms = 15000) {
  const r = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'es-CO,es;q=0.9' }, signal: AbortSignal.timeout(ms), redirect: 'follow' });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r;
}
function parsearRSS(xml, origen) {
  const out = [];
  for (const bloque of xml.split(/<item>/i).slice(1)) {
    let titulo = tag(bloque, 'title');
    let url = tag(bloque, 'link');
    let fuente = tag(bloque, 'source') || '';
    const fecha = tag(bloque, 'pubDate');
    if (origen === 'bing') {
      try { const u = new URL(url); url = u.searchParams.get('url') || url; } catch {}
      fuente = fuente || tag(bloque, 'News:Source');
    }
    if (origen === 'google' && / - [^-]+$/.test(titulo)) {
      const i = titulo.lastIndexOf(' - ');
      if (!fuente) fuente = titulo.slice(i + 3);
      titulo = titulo.slice(0, i);
    }
    if (!titulo || !url) continue;
    const d = new Date(fecha);
    let host = '';
    try { host = new URL(url).hostname.replace(/^www\./, ''); } catch { continue; }
    out.push({ titulo, url, fuente: fuente || host, fecha: isNaN(d) ? new Date().toISOString() : d.toISOString(), imagen: '' });
  }
  return out;
}
async function buscar(q) {
  const res = [];
  const g = `https://news.google.com/rss/search?q=${encodeURIComponent(q + ' when:60d')}&hl=es-419&gl=CO&ceid=CO:es-419`;
  const b = `https://www.bing.com/news/search?q=${encodeURIComponent(q)}&format=rss&setlang=es-CO&cc=CO&qft=sortbydate%3d%221%22`;
  for (const [u, o] of [[g, 'google'], [b, 'bing']]) {
    try { res.push(...parsearRSS(await (await traer(u)).text(), o)); }
    catch (e) { console.log('fallo', o, q, e.message); }
  }
  return res;
}
async function resolverGoogle(url) {
  if (!/news\.google\.com/.test(url)) return url;
  try { const r = await traer(url, 10000); return r.url || url; } catch { return url; }
}
async function ogImagen(url) {
  try {
    const r = await traer(url, 12000);
    const html = (await r.text()).slice(0, 400000);
    const m = html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)(?::src)?["'][^>]*content=["']([^"']+)["']/i)
           || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:image|twitter:image)["']/i);
    if (!m) return { img: '', final: r.url };
    return { img: new URL(m[1].replace(/&amp;/g, '&'), r.url).href, final: r.url };
  } catch { return { img: '', final: url }; }
}
const clave = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim().slice(0, 90);

async function main() {
  let previo = { items: [] };
  try { previo = JSON.parse(await readFile(ARCHIVO, 'utf8')); } catch {}
  const mapa = new Map(previo.items.map(i => [clave(i.titulo), i]));

  let nuevos = 0;
  for (const q of CONSULTAS) {
    for (const it of await buscar(q)) {
      if (!relevante(it.titulo)) continue;
      const k = clave(it.titulo);
      if (mapa.has(k)) continue;
      mapa.set(k, it); nuevos++;
    }
  }
  console.log('nuevas noticias:', nuevos);

  // Fotos reales: og:image de cada nota (las que aún no tienen)
  const sinFoto = [...mapa.values()].filter(i => !i.imagen && !i._intentado && /^https?:/.test(i.url)).slice(0, 45);
  let hechos = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (sinFoto.length) {
      const it = sinFoto.shift();
      it.url = await resolverGoogle(it.url);
      const { img, final } = await ogImagen(it.url);
      if (final && !/news\.google\.com/.test(final)) it.url = final;
      if (img && !/googleusercontent|gstatic|logo|favicon|default|placeholder/i.test(img)) { it.imagen = img; hechos++; }
      else it._intentado = true;
    }
  }));
  console.log('fotos nuevas:', hechos);

  const items = [...mapa.values()]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, MAX_ITEMS);

  await writeFile(ARCHIVO, JSON.stringify({ actualizado: new Date().toISOString(), items }, null, 1));
  await portada(items);
}

// Una foto real tiene pocos píxeles blancos planos; las infografías y tablas tienen muchos
async function esFoto(sharp, buf) {
  const { data, info } = await sharp(buf).resize(64, 64, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let blancos = 0;
  for (let i = 0; i < data.length; i += 3) if (data[i] > 235 && data[i + 1] > 235 && data[i + 2] > 235) blancos++;
  const { width, height } = await sharp(buf).metadata();
  return blancos / (info.width * info.height) < 0.18 && width >= 500 && height >= 280;
}
const CAPA = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0.2" stop-color="#0e1512" stop-opacity="0.05"/><stop offset="1" stop-color="#0e1512" stop-opacity="0.96"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="60" y="60" width="250" height="44" rx="22" fill="#f5b700"/>
  <text x="185" y="90" text-anchor="middle" font-family="DejaVu Sans, Arial" font-weight="700" font-size="22" fill="#0e1512">PL 117 de 2026</text>
  <rect x="60" y="420" width="12" height="150" fill="#f5b700"/>
  <text x="96" y="478" font-family="DejaVu Sans, Arial" font-weight="700" font-size="60" fill="#ffffff">Formalización Minera al Día</text>
  <text x="96" y="530" font-family="DejaVu Sans, Arial" font-size="29" fill="#ffd34d">Del rebusque al título: la ruta de 3 fases para el pequeño minero</text>
  <text x="96" y="572" font-family="DejaVu Sans, Arial" font-size="22" fill="#cfd6e6">Seguimiento ciudadano · Vibras Positivas HM</text>
</svg>`);

// Imagen de vista previa (la que sale al compartir el enlace) con foto real de la noticia más reciente
async function portada(items) {
  let sharp;
  try { sharp = (await import('sharp')).default; } catch { console.log('sin sharp, no se rehace portada'); return; }
  let meta = {};
  try { meta = JSON.parse(await readFile('data/portada.json', 'utf8')); } catch {}
  const candidatas = items.filter(i => /^https?:/.test(i.imagen || '') && !/infograf|grafic|logo|banner/i.test(i.imagen)).slice(0, 12);
  for (const c of candidatas) {
    if (meta.imagen === c.imagen) return; // ya está al día
    try {
      const buf = Buffer.from(await (await traer(c.imagen, 15000)).arrayBuffer());
      if (!(await esFoto(sharp, buf))) { console.log('descarto (parece gráfico):', c.imagen); continue; }
      await sharp(buf).resize(1200, 630, { fit: 'cover', position: 'attention' }).composite([{ input: CAPA }]).jpeg({ quality: 84 }).toFile('portada.jpg');
      await writeFile('data/portada.json', JSON.stringify({ imagen: c.imagen, fuente: c.fuente, url: c.url, fecha: new Date().toISOString() }, null, 1));
      console.log('portada nueva desde', c.fuente);
      return;
    } catch (e) { console.log('portada falló con', c.imagen, e.message); }
  }
}

main().catch(e => { console.error(e); process.exit(1); });
