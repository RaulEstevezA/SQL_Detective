# SQL Detective

SQL Detective es un juego bilingüe para navegador que enseña SQL mediante investigaciones ficticias. Cada caso incluye una historia, un objetivo y tablas locales. El jugador escribe una consulta de solo lectura, examina el resultado y desbloquea una explicación al encontrar las pruebas requeridas.

## Campaña

La campaña contiene 15 casos que se desbloquean progresivamente:

- 3 tutoriales sobre `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `JOIN` y agrupaciones.
- Guía SQL bilingüe integrada con sintaxis y explicaciones de las sentencias utilizadas en el juego.
- 9 investigaciones guiadas sobre `LIKE`, `IN`, `BETWEEN`, valores nulos, `LEFT JOIN`, `HAVING`, subconsultas, varios joins, `CASE`, CTE y self-joins.
- 3 expedientes abiertos que combinan varias tablas y culminan con una investigación mediante funciones de ventana.

Los tres tutoriales se desbloquean en orden. Al completar el tutorial se abren las doce investigaciones a la vez y se pueden jugar en cualquier orden.

Incluye pistas opcionales, errores didácticos y explicaciones de las soluciones. El progreso se guarda en `localStorage` con la clave `sqldetective.progress` y se puede reiniciar desde la interfaz.

Cada caso tiene una dificultad accesible de cero a cinco estrellas. Los casos de cero estrellas presentan la interfaz; las cinco estrellas quedan reservadas para las investigaciones más abiertas.

Los casos de cuatro y cinco estrellas no ofrecen pistas opcionales ni consulta de ejemplo.

## Arquitectura

- HTML, CSS y módulos JavaScript estáticos.
- SQLite compilado a WebAssembly mediante `sql.js`, empaquetado con el juego y limitado a consultas de lectura.
- Casos separados en `src/data/cases.js`.
- Textos en inglés y español en `src/locales/translations.js`.
- Pruebas automáticas del motor con el test runner de Node.js.

Cada caso recibe una base SQLite nueva en memoria. Nada se sube ni se conserva, salvo el progreso del juego.

## Desarrollo

Requiere Node.js 22 o posterior. Instala la dependencia de compilación una vez con `npm install`.

```bash
npm run dev       # http://localhost:4173
npm test          # pruebas del motor
npm run build     # salida estática en dist/
npm run check     # pruebas y compilación
```

## Despliegue

`.github/workflows/deploy-web.yml` prueba y compila el juego y copia `dist/` a `games/SQL_Detective/` en el repositorio de la web personal. Antes del primer despliegue hay que añadir `PORTFOLIO_DEPLOY_TOKEN` como secreto de Actions con escritura en ese repositorio.

Todas las rutas de recursos son relativas, por lo que el build funciona desde cualquier subdirectorio estático.

## Añadir un caso

Añade a `src/data/cases.js` un objeto con historia traducida, filas de las tablas, pistas, pruebas esperadas y solución. Añade pruebas del motor cuando el caso introduzca nueva sintaxis SQL.

## Referencia de diseño

Este proyecto sigue la referencia local `personal_web_style`: paleta oscura, tokens, jerarquía de componentes, breakpoints, cabecera común y requisitos de accesibilidad.

## Desarrollador

**Raul Estevez** · [Web personal](https://raulesteveza.github.io/) · [LinkedIn](https://www.linkedin.com/in/raulesteveza/)

Sugerencias y errores: [contact.raulesteveza@gmail.com](mailto:contact.raulesteveza@gmail.com)

## Licencia

[MIT](./LICENSE)
