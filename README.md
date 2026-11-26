# Formalización Minera al Día

App ciudadana (PWA) de **Vibras Positivas HM** que le hace seguimiento al **Proyecto de Ley 117 de 2026 Cámara**: «por la cual se establece un procedimiento para la formalización gradual de la minería de subsistencia y de pequeña escala, se crea el Programa Nacional de Asistencia Técnica, Jurídica y Social…».

- **Hoy**: se actualiza cada vez que se entra, con búsqueda en vivo al abrir y botón Actualizar.
- **En qué va**: los 9 pasos del trámite. Hoy espera el primer debate en la Comisión Quinta de la Cámara.
- **La ruta de 3 fases** (PITE → PPT → LAFD), lo que cambia para el minero y un capítulo del Bajo Cauca.
- **Derecho de petición** a las 8 entidades de una sola vez (correo, Gmail o copiar).
- Español e inglés.

Archivos
- `data/ley.json`: trámite, fases, cifras, línea de tiempo y autoridades. Se edita a mano y siempre lleva la fuente.
- `data/noticias.json` y `data/videos.json`: los llena el robot.
- `.github/workflows/robot.yml`: el robot corre cada 30 minutos. Trae noticias, fotos reales (og:image), videos de YouTube y rehace la imagen de vista previa `portada.jpg`.
- `img/`: fotos reales de noticias de minería en Antioquia. Los créditos están en `img/creditos.json`.

Fuentes: ficha del proyecto en camara.gov.co y Gacetas del Congreso 1072 y 1479 de 2026.

URL: https://formalizacion-minera-al-dia.netlify.app
