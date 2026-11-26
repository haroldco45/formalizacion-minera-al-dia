/* Formalización Minera al Día — PL 117 de 2026 Cámara — Vibras Positivas HM */
'use strict';
const URL_APP = 'https://formalizacion-minera-al-dia.netlify.app/';
const TZ = 'America/Bogota';
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const FOTOS_BASE = ['img/foto11.jpg', 'img/foto8.jpg', 'img/foto1.jpg', 'img/foto6.jpg', 'img/foto2.jpg'];

/* ---------- Idioma ---------- */
const T = {
  es: {
    nav_hoy:'Hoy', nav_tramite:'En qué va', nav_fases:'Las 3 fases', nav_peticion:'Petición', actualizar:'Actualizar',
    hero_pildora:'Proyecto de Ley 117 de 2026 Cámara · seguimiento ciudadano',
    hero_titulo:'Del rebusque al título minero',
    hero_sub:'Un proyecto de ley quiere que el pequeño minero se formalice por etapas, sin cumplirlo todo de una vez. Aquí seguimos en qué va, qué le cambia al minero y qué pasa en el Bajo Cauca.',
    hero_pie:'Fotos reales de la minería en Antioquia, tomadas de las noticias del día.',
    hoy_t:'Hoy', hoy_i:'Lo último sobre formalización minera y pequeña minería en Colombia. Se actualiza cada vez que usted entra y el robot trae noticias nuevas cada 30 minutos.',
    buscar_ph:'Buscar en vivo: barequeros, mercurio, Comisión Quinta…', buscar:'Buscar',
    tr_t:'¿En qué va el proyecto?',
    tr_intro:'Va en {n} de {t} pasos. Hoy espera el primer debate en la Comisión Quinta de la Cámara.',
    tr_nota:'Un proyecto de ley necesita 4 debates: dos en la Cámara y dos en el Senado. Según el artículo 162 de la Constitución, ningún proyecto puede tramitarse en más de dos legislaturas. En el Senado hay otro proyecto con el mismo título, el PL 109 de 2026, y el Gobierno radicó su propia Ley Minera.',
    aqui:'Aquí va', pendiente:'Pendiente',
    fa_t:'La ruta de 3 fases', fa_i:'Así quedaría el camino del pequeño minero, según la ponencia para primer debate.', fase:'Fase',
    qn_t:'¿Quién puede acogerse?',
    cb_t:'Lo que cambia para el minero', cb_i:'Lo más importante del proyecto, en palabras sencillas.',
    bc_t:'¿Y el Bajo Cauca?', bc_ojo:'Ver Ojo a la Minería · Bajo Cauca',
    li_t:'Cómo llegamos hasta aquí', fuente:'Fuente',
    qu_t:'¿Quién responde?', qu_i:'Las entidades que deciden el futuro del proyecto o que lo pondrían en marcha. A todas les llega la petición de abajo.',
    vi_t:'Videos reales', vi_i:'Foros, audiencias y reportajes sobre la pequeña minería y su formalización. El robot busca videos nuevos cada 30 minutos.',
    pr_t:'Lo que queremos saber',
    pe_t:'Derecho de petición: que nos digan qué pasó con el proyecto',
    pe_i:'Llene sus datos y envíe una sola petición a todas las entidades a la vez. La ley les da 15 días hábiles para responder (artículo 23 de la Constitución y Ley 1755 de 2015). Si una entidad no es la competente, debe pasarla a la que sí.',
    pe_nombre:'Nombre completo', pe_cc:'Cédula', pe_ciudad:'Ciudad', pe_correo:'Su correo para la respuesta', pe_tel:'Celular (opcional)', pe_soy:'Usted es',
    soy_ciud:'Ciudadano(a) interesado(a)', soy_min:'Pequeño(a) minero(a)', soy_bar:'Barequero(a) o minero(a) de subsistencia', soy_com:'Comerciante o habitante de zona minera',
    pe_dest:'Se envía a', pe_enviar:'Enviar a todas las entidades', pe_gmail:'Abrir en Gmail', pe_copiar:'Copiar texto',
    pe_nota:'La app no guarda sus datos: el correo sale desde su propia cuenta. Revise los correos de las entidades antes de enviar; pueden cambiar.',
    fu_t:'Todas las noticias', ver_mas:'Ver más',
    pie_txt:'App ciudadana independiente. No es del Congreso, del Gobierno ni de ningún partido. Los datos vienen de la Cámara, las Gacetas del Congreso y medios de comunicación, siempre con su fuente. Las fotos de apoyo son de noticias de El Colombiano, Infobae, Minuto30, El Heraldo, Blu Radio, 360 Radio, Alerta y El Universal.',
    compartir:'Compartir por WhatsApp',
    hoy_ultimas:'Hoy no hay notas nuevas todavía. Estas son las últimas:', robot:'Robot: última búsqueda {h} (hora Colombia)',
    busc_cargando:'Buscando en vivo en los medios…', busc_ok:'{n} noticias en vivo encontradas', busc_nada:'La búsqueda en vivo no respondió. Mostramos lo que trajo el robot.',
    sin_noticias:'El robot está trayendo las primeras noticias. Toque «Actualizar» en un momento.',
    nueva:'NUEVA', hace_min:'hace {n} min', hace_h:'hace {n} h', hace_d:'hace {n} d',
    sin_videos:'El robot todavía no trae videos. Se llenan solos en la próxima búsqueda.', buscar_yt:'Ver videos en YouTube',
    copiado:'Texto copiado',
    compartir_txt:'Del rebusque al título minero: así va el proyecto de ley que formalizaría por etapas al pequeño minero (PL 117 de 2026). Noticias que se actualizan solas y derecho de petición:'
  },
  en: {
    nav_hoy:'Today', nav_tramite:'Status', nav_fases:'3 phases', nav_peticion:'Petition', actualizar:'Refresh',
    hero_pildora:'Bill 117 of 2026 (House) · citizen watch',
    hero_titulo:'From scraping by to a mining title',
    hero_sub:'A bill in Colombia\'s Congress would let small-scale miners formalize step by step, instead of meeting every requirement at once. We track where it stands, what changes for miners and what it means for Bajo Cauca.',
    hero_pie:'Real photos of mining in Antioquia, taken from the day\'s news.',
    hoy_t:'Today', hoy_i:'The latest on mining formalization and small-scale mining in Colombia. It refreshes every time you open the app, and the robot brings new stories every 30 minutes.',
    buscar_ph:'Live search: barequeros, mercury, Fifth Committee…', buscar:'Search',
    tr_t:'Where does the bill stand?',
    tr_intro:'It is at step {n} of {t}. It now awaits its first debate in the House Fifth Committee.',
    tr_nota:'A bill needs 4 debates: two in the House and two in the Senate. Under Article 162 of the Constitution, no bill can be processed over more than two legislative terms. The Senate has a bill with the same title (Bill 109 of 2026), and the government filed its own Mining Law.',
    aqui:'We are here', pendiente:'Pending',
    fa_t:'The 3-phase route', fa_i:'This is how the small-scale miner\'s path would look, according to the first-debate report.', fase:'Phase',
    qn_t:'Who is eligible?',
    cb_t:'What changes for miners', cb_i:'The key points of the bill, in plain words.',
    bc_t:'What about Bajo Cauca?', bc_ojo:'See Ojo a la Minería · Bajo Cauca',
    li_t:'How we got here', fuente:'Source',
    qu_t:'Who answers?', qu_i:'The agencies that decide the bill\'s future or would put it into practice. All of them get the petition below.',
    vi_t:'Real videos', vi_i:'Forums, hearings and reports on small-scale mining and its formalization. The robot looks for new videos every 30 minutes.',
    pr_t:'What we want to know',
    pe_t:'Right of petition: tell us what happened to the bill',
    pe_i:'Fill in your details and send one petition to every agency at once. By law they have 15 business days to answer (Article 23 of the Constitution, Law 1755 of 2015). If an agency is not competent, it must forward it.',
    pe_nombre:'Full name', pe_cc:'ID number (cédula)', pe_ciudad:'City', pe_correo:'Your email for the reply', pe_tel:'Mobile (optional)', pe_soy:'You are',
    soy_ciud:'An interested citizen', soy_min:'A small-scale miner', soy_bar:'A barequero or subsistence miner', soy_com:'A merchant or resident of a mining area',
    pe_dest:'Sent to', pe_enviar:'Send to all agencies', pe_gmail:'Open in Gmail', pe_copiar:'Copy text',
    pe_nota:'The app does not store your data: the email goes out from your own account. Check the agency addresses before sending; they may change. The petition itself is in Spanish, as Colombian agencies require.',
    fu_t:'All news', ver_mas:'Show more',
    pie_txt:'Independent citizen app. Not affiliated with Congress, the government or any party. Data comes from the House, the Congressional Gazette and news media, always with its source. Supporting photos are from news stories by El Colombiano, Infobae, Minuto30, El Heraldo, Blu Radio, 360 Radio, Alerta and El Universal.',
    compartir:'Share on WhatsApp',
    hoy_ultimas:'No new stories today yet. Here are the latest:', robot:'Robot: last search {h} (Colombia time)',
    busc_cargando:'Searching live across the media…', busc_ok:'{n} live stories found', busc_nada:'Live search did not respond. Showing what the robot found.',
    sin_noticias:'The robot is fetching the first stories. Tap "Refresh" in a moment.',
    nueva:'NEW', hace_min:'{n} min ago', hace_h:'{n} h ago', hace_d:'{n} d ago',
    sin_videos:'The robot has not brought videos yet. They fill in on the next search.', buscar_yt:'See videos on YouTube',
    copiado:'Text copied',
    compartir_txt:'From scraping by to a mining title: where Colombia\'s bill to formalize small-scale miners step by step stands (Bill 117 of 2026). Auto-updating news and a right-of-petition tool:'
  }
};
let LANG = 'es';
try { LANG = localStorage.getItem('fm_lang') || (navigator.language || 'es').slice(0, 2); } catch {}
if (!T[LANG]) LANG = 'es';
const t = (k, v = {}) => (T[LANG][k] ?? T.es[k] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x]);
const Tx = (o, es = 'es', en = 'en') => (LANG === 'en' && o[en]) ? o[en] : o[es];
const num = (n, dec = 0) => Number(n).toLocaleString(LANG === 'en' ? 'en-US' : 'es-CO', { minimumFractionDigits: dec, maximumFractionDigits: dec });

function aplicarIdioma() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh));
  $('#btnLang').textContent = LANG === 'es' ? 'EN' : 'ES';
}

/* ---------- Fechas en hora de Colombia ---------- */
const fmtDia = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
const diaCO = d => fmtDia.format(new Date(d));
const hoyCO = () => diaCO(Date.now());
function fechaLarga(d, conHora) {
  return new Intl.DateTimeFormat(LANG === 'es' ? 'es-CO' : 'en-US', { timeZone: TZ, day: 'numeric', month: 'short', year: conHora ? undefined : 'numeric', hour: conHora ? 'numeric' : undefined, minute: conHora ? '2-digit' : undefined }).format(new Date(d));
}
const fechaCorta = f => new Intl.DateTimeFormat(LANG === 'es' ? 'es-CO' : 'en-US', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(f + 'T12:00:00Z'));
function hace(d) {
  const m = Math.max(1, Math.round((Date.now() - new Date(d)) / 60000));
  if (m < 60) return t('hace_min', { n: m });
  if (m < 1440) return t('hace_h', { n: Math.round(m / 60) });
  return t('hace_d', { n: Math.round(m / 1440) });
}

/* ---------- Datos ---------- */
let D = { ley: null, noticias: { items: [] }, videos: { items: [] } };
let enVivo = [];
async function cargarJSON(ruta) {
  const r = await fetch(`${ruta}?t=${Date.now()}`, { cache: 'no-store' });
  if (!r.ok) throw new Error(ruta);
  return r.json();
}
async function cargarTodo() {
  const [a, n, v] = await Promise.allSettled([cargarJSON('data/ley.json'), cargarJSON('data/noticias.json'), cargarJSON('data/videos.json')]);
  if (a.status === 'fulfilled') D.ley = a.value;
  if (n.status === 'fulfilled') D.noticias = n.value;
  if (v.status === 'fulfilled') D.videos = v.value;
}

/* ---------- Búsqueda en vivo (Google News + Bing por proxies) ---------- */
const MINERO = /miner|minas?\b|oro\b|mercurio|barequ/i;
const TEMA = /formaliz|peque[ñn][ao]s? miner|subsistencia|barequ|ley minera|proyecto de ley|informal|artesanal|tradicional|ventanilla|reserva especial|mercurio|t[ií]tulo|comisi[óo]n quinta|agencia nacional de miner/i;
const FUERA = /reinfo|per[uú]\b|peruan|bolivia|ecuador|chile|venezuela|argentin|m[eé]xic/i;
const PROXIES = [
  u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  u => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(u)}`
];
async function traerProxy(u) {
  for (const p of PROXIES) {
    try {
      const r = await fetch(p(u), { signal: AbortSignal.timeout(9000) });
      if (r.ok) { const txt = await r.text(); if (txt.includes('<item')) return txt; }
    } catch {}
  }
  throw new Error('proxies');
}
function parsearRSS(xml, bing) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  return [...doc.querySelectorAll('item')].map(it => {
    let titulo = it.querySelector('title')?.textContent?.trim() || '';
    let url = it.querySelector('link')?.textContent?.trim() || '';
    let fuente = it.querySelector('source')?.textContent?.trim() || '';
    if (bing) { try { url = new URL(url).searchParams.get('url') || url; } catch {} }
    else if (titulo.includes(' - ')) { const i = titulo.lastIndexOf(' - '); fuente = fuente || titulo.slice(i + 3); titulo = titulo.slice(0, i); }
    const f = new Date(it.querySelector('pubDate')?.textContent || Date.now());
    let foto = '';
    const media = [...it.getElementsByTagName('*')].find(e => /content|thumbnail|Image/i.test(e.localName) && (e.getAttribute('url') || /^https?:/.test(e.textContent)));
    if (media) foto = media.getAttribute('url') || media.textContent;
    if (/bing\.com\/th/.test(foto)) foto = '';
    if (!fuente) { try { fuente = new URL(url).hostname.replace(/^www\./, ''); } catch {} }
    return { titulo, url, fuente, fecha: isNaN(f) ? new Date().toISOString() : f.toISOString(), imagen: foto, vivo: true };
  }).filter(x => x.titulo && x.url);
}
async function buscarEnVivo(q) {
  const qq = q ? (MINERO.test(q) ? `${q} Colombia` : `minería ${q}`) : '"formalización minera" OR "pequeña minería" Colombia';
  const g = `https://news.google.com/rss/search?q=${encodeURIComponent(qq + ' when:30d')}&hl=es-419&gl=CO&ceid=CO:es-419`;
  const b = `https://www.bing.com/news/search?q=${encodeURIComponent(qq)}&format=rss&setlang=es-CO&cc=CO&qft=sortbydate%3d%221%22`;
  const res = await Promise.allSettled([traerProxy(g).then(x => parsearRSS(x, false)), traerProxy(b).then(x => parsearRSS(x, true))]);
  const out = res.flatMap(r => r.status === 'fulfilled' ? r.value : []).filter(x => !FUERA.test(x.titulo));
  return q ? out : out.filter(x => MINERO.test(x.titulo) && TEMA.test(x.titulo));
}
const claveT = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '').slice(0, 80);
function mezclar(...listas) {
  const m = new Map();
  for (const l of listas) for (const it of l) {
    const k = claveT(it.titulo);
    const prev = m.get(k);
    if (!prev) m.set(k, it); else if (!prev.imagen && it.imagen) prev.imagen = it.imagen;
  }
  return [...m.values()].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}
const todas = () => mezclar(enVivo, D.noticias.items);

/* ---------- Tarjetas ---------- */
let fotoRelleno = 0;
function tarjeta(n, grande) {
  const nueva = Date.now() - new Date(n.fecha) < 6 * 3600e3;
  const sello = `<span class="tj-hace ${nueva ? 'nueva' : ''}">${nueva ? t('nueva') + ' · ' : ''}${hace(n.fecha)}</span>`;
  const img = n.imagen || FOTOS_BASE[(fotoRelleno++) % FOTOS_BASE.length];
  const foto = `<div class="tj-foto ${n.imagen ? '' : 'relleno'}" style="background-image:url('${esc(img)}')">${sello}</div>`;
  return `<a class="tj rv ${grande ? 'grande' : ''}" href="${esc(n.url)}" target="_blank" rel="noopener">${foto}<div class="tj-cuerpo"><span class="tj-fuente">${esc(n.fuente)}</span><h3>${esc(n.titulo)}</h3></div></a>`;
}

/* ---------- Hero ---------- */
function pintarHero() {
  const deNoticias = todas().filter(n => /^https?:/.test(n.imagen || '')).slice(0, 4).map(n => n.imagen);
  const fotos = [...deNoticias, ...FOTOS_BASE].slice(0, 7);
  const cont = $('#heroFotos');
  const firma = fotos.join('|');
  if (cont.dataset.f !== firma) {
    cont.dataset.f = firma;
    cont.innerHTML = fotos.map((f, i) => `<div class="${i === 0 ? 'on' : ''}" style="background-image:url('${esc(f)}')"></div>`).join('');
  }
  $('#heroPie').textContent = t('hero_pie');
  if (!D.ley) return;
  $('#marcador').innerHTML = D.ley.cifras.map(c => `<div>
      <span class="m-num"><b class="cuenta" data-fin="${c.num}" data-dec="${c.dec || 0}">0</b>${esc(c.suf || '')}</span>
      <span class="m-etq">${esc(Tx(c))}</span>
      <a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.fuente)}</a></div>`).join('');
}
function animarCuentas() {
  document.querySelectorAll('.cuenta').forEach(el => {
    const fin = +el.dataset.fin || 0, dec = +el.dataset.dec || 0, ini = performance.now(), dur = 1800;
    const paso = ahora => {
      const p = Math.min(1, (ahora - ini) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = num(dec ? fin * e : Math.round(fin * e), dec);
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  });
}
let rotador;
function rotarHero() {
  clearInterval(rotador);
  rotador = setInterval(() => {
    const fs = [...document.querySelectorAll('#heroFotos div')];
    if (fs.length < 2) return;
    const i = Math.max(0, fs.findIndex(f => f.classList.contains('on')));
    fs[i].classList.remove('on'); fs[(i + 1) % fs.length].classList.add('on');
  }, 6000);
}
function pintarCinta() {
  const items = todas().slice(0, 14);
  if (!items.length) { $('#cinta').innerHTML = ''; return; }
  const html = items.map(n => `<a href="${esc(n.url)}" target="_blank" rel="noopener"><b>${esc(n.fuente)}</b>${esc(n.titulo)}</a>`).join('');
  $('#cinta').innerHTML = html + html;
}

/* ---------- Hoy ---------- */
const RAPIDAS = ['proyecto de ley 117', 'formalización minera', 'pequeña minería', 'barequeros', 'mercurio', 'Bajo Cauca', 'Comisión Quinta', 'Ley Minera'];
function pintarRapidas() {
  $('#rapidas').innerHTML = RAPIDAS.map(r => `<button data-q="${esc(r)}">${esc(r)}</button>`).join('');
}
function pintarHoy() {
  const lista0 = todas();
  let lista = lista0.filter(n => diaCO(n.fecha) === hoyCO());
  let pre = '';
  if (lista.length < 3) { pre = `<p class="intro" style="grid-column:1/-1;margin:0">${lista0.length ? t('hoy_ultimas') : t('sin_noticias')}</p>`; lista = lista0.slice(0, 7); }
  $('#hoyFecha').textContent = fechaLarga(Date.now(), true);
  fotoRelleno = 0;
  $('#hoyLista').innerHTML = pre + lista.slice(0, 9).map((n, i) => tarjeta(n, i === 0)).join('');
  revelar();
}

/* ---------- Trámite ---------- */
function pintarTramite() {
  if (!D.ley) return;
  const ps = D.ley.tramite, hechos = ps.filter(p => p.hecho).length;
  $('#trIntro').textContent = t('tr_intro', { n: hechos + 1, t: ps.length });
  $('#trBarra').dataset.w = ((hechos + 0.5) / ps.length * 100).toFixed(1);
  $('#pasos').innerHTML = ps.map((p, i) => `<li class="paso-l rv ${p.hecho ? 'hecho' : ''} ${p.actual ? 'actual' : ''}">
      <span class="paso-n">${i + 1}</span>
      <div><b>${esc(Tx(p))}</b><small>${p.f ? fechaCorta(p.f) : (p.actual ? t('aqui') : t('pendiente'))}</small></div></li>`).join('');
}

/* ---------- Fases ---------- */
function pintarFases() {
  if (!D.ley) return;
  $('#listaFases').innerHTML = D.ley.fases.map(f => `<article class="fase rv">
      <div class="fase-foto" style="background-image:url('${esc(f.foto)}')"><span class="fase-n">${t('fase')} ${f.n}</span><span class="fase-sigla">${esc(f.sigla)}</span></div>
      <div class="fase-in"><span class="fase-dur">${esc(Tx(f, 'es_dur', 'en_dur'))}</span><h3>${esc(Tx(f, 'es_t', 'en_t'))}</h3><p>${esc(Tx(f))}</p></div></article>`).join('');
  $('#quienTxt').textContent = Tx(D.ley, 'quien_es', 'quien_en');
  $('#puntos').innerHTML = D.ley.puntos.map(p => `<article class="punto rv"><div class="punto-foto" style="background-image:url('${esc(p.foto)}')"></div><div class="punto-in"><h3>${esc(Tx(p, 'es_t', 'en_t'))}</h3><p>${esc(Tx(p))}</p></div></article>`).join('');
}

/* ---------- Bajo Cauca ---------- */
function pintarBajoCauca() {
  if (!D.ley) return;
  const b = D.ley.bajo_cauca;
  $('#bcTexto').textContent = Tx(b);
  $('#bcFuente').innerHTML = `${t('fuente')}: <a href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.fuente)}</a>`;
  $('#bcDatos').innerHTML = b.datos.map(d => `<div class="bc-dato rv"><b><span class="cuenta" data-fin="${d.num}" data-dec="${d.dec || 0}">0</span>${esc(d.suf || '')}</b><span>${esc(Tx(d))}</span></div>`).join('');
}

/* ---------- Línea de tiempo, autoridades y preguntas ---------- */
function pintarLinea() {
  if (!D.ley) return;
  $('#lineaT').innerHTML = D.ley.linea.map(x => `<li class="rv"><time>${fechaCorta(x.f)}</time><p>${esc(Tx(x))}</p><a href="${esc(x.url)}" target="_blank" rel="noopener">${t('fuente')}</a></li>`).join('');
}
function pintarAutoridades() {
  if (!D.ley) return;
  $('#autoridades').innerHTML = D.ley.autoridades.map(a => `<div class="reg rv"><h3>${esc(a.q)}</h3><div class="who">${esc(a.who)}</div><p>${esc(Tx(a))}</p></div>`).join('');
  $('#listaPreguntas').innerHTML = D.ley.preguntas.map(p => `<div class="pg rv"><h3>${esc(Tx(p))}</h3></div>`).join('');
}

/* ---------- Videos ---------- */
function pintarVideos() {
  const vs = D.videos.items || [];
  if (!vs.length) {
    $('#reproductor').innerHTML = `<a class="btn-prim" href="https://www.youtube.com/results?search_query=${encodeURIComponent('formalización minera Colombia')}" target="_blank" rel="noopener">${t('buscar_yt')}</a>`;
    $('#listaVideos').innerHTML = `<p class="intro">${t('sin_videos')}</p>`;
    return;
  }
  const poner = id => {
    $('#reproductor').innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    document.querySelectorAll('.vd').forEach(v => v.classList.toggle('on', v.dataset.id === id));
  };
  $('#listaVideos').innerHTML = vs.slice(0, 12).map(v => `<button class="vd" data-id="${esc(v.id)}"><img src="https://i.ytimg.com/vi/${esc(v.id)}/mqdefault.jpg" alt="" loading="lazy"><div>${esc(v.titulo)}<small>${esc(v.canal)}${v.hace ? ' · ' + esc(v.hace) : ''}</small></div></button>`).join('');
  $('#listaVideos').onclick = e => { const b = e.target.closest('.vd'); if (b) poner(b.dataset.id); };
  if (!$('#reproductor iframe')) poner(vs[0].id);
}

/* ---------- Derecho de petición ---------- */
const ENTIDADES = [
  ['Comisión Quinta — Cámara de Representantes', 'comision.quinta@camara.gov.co'],
  ['Comisión Quinta — Senado de la República', 'comision.quinta@senado.gov.co'],
  ['Ministerio de Minas y Energía', 'menergia@minenergia.gov.co'],
  ['Agencia Nacional de Minería (ANM)', 'contactenos@anm.gov.co'],
  ['Ministerio de Ambiente y Desarrollo Sostenible', 'servicioalciudadano@minambiente.gov.co'],
  ['Secretaría de Minas de Antioquia', 'minas@antioquia.gov.co'],
  ['Corantioquia', 'corantioquia@corantioquia.gov.co'],
  ['Procuraduría General de la Nación', 'quejas@procuraduria.gov.co']
];
const ASUNTO = 'Derecho de petición — Proyecto de Ley 117 de 2026 Cámara (formalización gradual de la pequeña minería)';
const SOY = {
  soy_ciud: 'ciudadano(a) interesado(a) en el tema',
  soy_min: 'pequeño(a) minero(a) interesado(a) en formalizarme',
  soy_bar: 'barequero(a) o minero(a) de subsistencia',
  soy_com: 'comerciante o habitante de una zona minera'
};
const datosForm = () => Object.fromEntries(new FormData($('#formPet')));
function pintarSelSoy() {
  const sel = $('#selSoy'), v = sel.value;
  sel.innerHTML = Object.keys(SOY).map(k => `<option value="${k}">${esc(t(k))}</option>`).join('');
  sel.value = v || 'soy_ciud';
}
function textoPeticion() {
  const f = datosForm();
  const soy = SOY[f.soy] || SOY.soy_ciud;
  const hoy = new Intl.DateTimeFormat('es-CO', { timeZone: TZ, day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  return `${f.ciudad || '[Ciudad]'}, ${hoy}

Señores
Comisión Quinta Constitucional Permanente de la Cámara de Representantes; Comisión Quinta Constitucional Permanente del Senado de la República; Ministerio de Minas y Energía; Agencia Nacional de Minería; Ministerio de Ambiente y Desarrollo Sostenible; Secretaría de Minas de la Gobernación de Antioquia; Corantioquia; Procuraduría General de la Nación.

Asunto: Derecho de petición de información sobre el Proyecto de Ley 117 de 2026 Cámara, «por la cual se establece un procedimiento para la formalización gradual de la minería de subsistencia y de pequeña escala, se crea el Programa Nacional de Asistencia Técnica, Jurídica y Social para apoyar dichos procesos y se dictan otras disposiciones».

Yo, ${f.nombre || '[Nombre completo]'}, identificado(a) con cédula de ciudadanía ${f.cc || '[Cédula]'}, ${soy}, en ejercicio del derecho fundamental de petición del artículo 23 de la Constitución Política y de la Ley 1755 de 2015, respetuosamente solicito la siguiente información, cada entidad dentro de su competencia:

1. Estado actual del trámite del Proyecto de Ley 117 de 2026 Cámara, cuya ponencia positiva para primer debate fue publicada en la Gaceta del Congreso 1479 de 2026, y fecha prevista para su discusión y votación en la Comisión Quinta de la Cámara.

2. Si el proyecto se acumulará o se tramitará en conjunto con el Proyecto de Ley 109 de 2026 Senado, que tiene el mismo título, o con el proyecto de Ley Minera radicado por el Gobierno nacional en julio de 2026.

3. Concepto del Ministerio de Minas y Energía, de la Agencia Nacional de Minería, del Ministerio de Ambiente y del Ministerio de Hacienda sobre el proyecto, incluido el análisis de impacto fiscal del artículo 7 de la Ley 819 de 2003, y costo estimado de la Ventanilla Única para la Formalización Minera.

4. Número de solicitudes de formalización minera (áreas de reserva especial, subcontratos de formalización, devolución de áreas y procesos de la Ley 2250 de 2022) que hoy están en trámite en Antioquia y en los municipios del Bajo Cauca (Caucasia, Cáceres, El Bagre, Zaragoza, Nechí y Tarazá), cuántas se han resuelto desde 2022 y cuál es el tiempo promedio de respuesta.

5. Si los municipios del Bajo Cauca antioqueño estarían entre las zonas priorizadas por extracción ilícita o alta presencia de minería informal con corte al 30 de junio de 2026, y con qué criterios se definirían.

6. Qué apoyo técnico y económico recibirían los pequeños mineros para eliminar por completo el uso del mercurio, que el proyecto exige desde el primer permiso, y qué plantas de beneficio autorizadas existen hoy en el Bajo Cauca.

7. Qué recursos tendría la Gobernación de Antioquia para ejecutar el Programa Nacional de Asistencia Técnica, Jurídica y Social, y cómo participaría Corantioquia en la Licencia Ambiental para la Formalización Diferencial.

8. Qué medidas de protección se prevén para los pequeños mineros frente a la extorsión y las amenazas de los grupos armados ilegales durante el proceso de formalización.

Si alguna entidad no es competente para responder alguno de los puntos, le solicito darle traslado a la entidad competente e informarme, según el artículo 21 de la Ley 1755 de 2015.

Recibiré respuesta en el correo electrónico ${f.correo || '[correo]'}${f.tel ? ' y en el celular ' + f.tel : ''}.

Atentamente,

${f.nombre || '[Nombre completo]'}
C.C. ${f.cc || '[Cédula]'}
${f.ciudad || '[Ciudad]'}`;
}
function pintarPeticion() {
  pintarSelSoy();
  $('#destinos').innerHTML = ENTIDADES.map(([n, c]) => `<li>${esc(n)} — <span>${esc(c)}</span></li>`).join('');
  $('#petTexto').textContent = textoPeticion();
}

/* ---------- Todas las noticias ---------- */
let cuantas = 20;
function pintarTodas() {
  const ts = todas();
  $('#todas').innerHTML = ts.slice(0, cuantas).map(n => `<a class="lf" href="${esc(n.url)}" target="_blank" rel="noopener"><time>${fechaLarga(n.fecha)}</time><div><span>${esc(n.fuente)}</span><b>${esc(n.titulo)}</b></div></a>`).join('');
  $('#btnMas').style.display = ts.length > cuantas ? '' : 'none';
  const h = D.noticias.actualizado;
  $('#robotHora').textContent = h ? t('robot', { h: fechaLarga(h, true) }) : '';
}

/* ---------- Animaciones al bajar ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('ya');
  e.target.querySelectorAll('[data-w]').forEach(i => i.style.width = i.dataset.w + '%');
  io.unobserve(e.target);
}), { threshold: .12 }) : null;
function revelar() {
  document.querySelectorAll('.rv:not(.ya), .tramite-barra:not(.ya)').forEach(el => {
    if (io) io.observe(el);
    else { el.classList.add('ya'); el.querySelectorAll('[data-w]').forEach(i => i.style.width = i.dataset.w + '%'); }
  });
}

function pintarTodo() {
  aplicarIdioma(); pintarHero(); pintarCinta(); pintarRapidas(); pintarHoy(); pintarTramite(); pintarFases();
  pintarBajoCauca(); pintarLinea(); pintarAutoridades(); pintarVideos(); pintarPeticion(); pintarTodas(); revelar();
}

async function vivo(q) {
  const est = $('#estadoBusq');
  est.textContent = t('busc_cargando');
  try {
    const r = await buscarEnVivo(q);
    if (!r.length) throw new Error('vacio');
    est.textContent = t('busc_ok', { n: r.length });
    if (q) {
      fotoRelleno = 0;
      $('#hoyLista').innerHTML = mezclar(r).slice(0, 12).map((n, i) => tarjeta(n, i === 0)).join('');
      revelar();
    } else { enVivo = mezclar(enVivo, r); pintarHoy(); pintarCinta(); pintarHero(); pintarTodas(); revelar(); }
  } catch { est.textContent = t('busc_nada'); }
}
function buscarDesde(q) {
  $('#q').value = q;
  $('#hoy').scrollIntoView({ behavior: 'smooth' });
  vivo(q);
}
async function actualizar() {
  const b = $('#btnActualizar');
  b.classList.add('cargando');
  await cargarTodo();
  pintarTodo(); animarCuentas();
  await vivo($('#q').value.trim());
  b.classList.remove('cargando');
}

/* ---------- Arranque ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  aplicarIdioma();
  await cargarTodo();
  pintarTodo(); animarCuentas(); rotarHero();
  vivo('');  // búsqueda en vivo al abrir
  $('#btnActualizar').onclick = actualizar;
  $('#btnLang').onclick = () => { LANG = LANG === 'es' ? 'en' : 'es'; try { localStorage.setItem('fm_lang', LANG); } catch {} pintarTodo(); animarCuentas(); };
  $('#btnBuscar').onclick = () => vivo($('#q').value.trim());
  $('#q').addEventListener('keydown', e => { if (e.key === 'Enter') vivo($('#q').value.trim()); });
  $('#rapidas').addEventListener('click', e => { const b = e.target.closest('button'); if (b) buscarDesde(b.dataset.q); });
  $('#btnMas').onclick = () => { cuantas += 20; pintarTodas(); };
  $('#formPet').addEventListener('input', () => $('#petTexto').textContent = textoPeticion());
  $('#formPet').addEventListener('change', () => $('#petTexto').textContent = textoPeticion());
  $('#formPet').addEventListener('submit', e => {
    e.preventDefault();
    const to = ENTIDADES.map(x => x[1]).join(',');
    location.href = `mailto:${to}?subject=${encodeURIComponent(ASUNTO)}&body=${encodeURIComponent(textoPeticion())}`;
  });
  $('#btnGmail').onclick = () => {
    if (!$('#formPet').reportValidity()) return;
    const to = ENTIDADES.map(x => x[1]).join(',');
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(ASUNTO)}&body=${encodeURIComponent(textoPeticion())}`, '_blank');
  };
  $('#btnCopiar').onclick = async () => {
    try { await navigator.clipboard.writeText(textoPeticion()); $('#btnCopiar').textContent = t('copiado'); setTimeout(() => $('#btnCopiar').textContent = t('pe_copiar'), 2000); } catch {}
  };
  $('#btnCompartir').onclick = () => window.open(`https://wa.me/?text=${encodeURIComponent(t('compartir_txt') + ' ' + URL_APP)}`, '_blank');
  // Se refresca sola mientras está abierta y al volver a la app
  setInterval(actualizar, 10 * 60 * 1000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') actualizar(); });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});
