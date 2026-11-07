# SQL Detective

<p align="center">
  <img src="./public/sql-detective-logo.png" alt="Logo de SQL Detective" width="160">
</p>

Una novela negra interactiva para aprender SQL. Cada caso es un capítulo de una misma historia y cada paso de la historia es una consulta real, ejecutada en tu navegador sobre SQLite.

**Jugar:** [raulesteveza.github.io/games/SQL_Detective](https://raulesteveza.github.io/games/SQL_Detective/)

## La historia

Puerto Ceniza, noviembre de 1987. Lleva once días lloviendo. Eres quien acaba de llegar al Archivo Central, dos plantas por debajo de la Jefatura, a la mesa de Inés Bosch, "trasladada" hace once meses. Arden almacenes en el Barrio Viejo, sus expedientes desaparecen, y alguien te está dejando notas dentro de los datos.

## Campaña

| Capítulo | Casos | SQL |
|---|---:|---|
| 1. Sótano Dos | 5 | `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `LIKE`, `DISTINCT`, `BETWEEN`, `IN`, `JOIN`, `GROUP BY` |
| 2. Muelle Tres | 5 | `LEFT JOIN`, `IS NULL`, `HAVING`, varios joins, `AVG`, subconsultas |
| 3. La Galería de Cristal | 5 | `CASE`, self joins, CTE, `strftime`, `EXCEPT`, `UNION` |
| 4. Registros alterados | 5 | `TRIM`, `UPPER`, `REPLACE`, `COALESCE`, `sqlite_master`, `LAG`, `ROW_NUMBER`, joins por rangos |
| 5. La última señal | 4 | `WITH RECURSIVE`, `SUM OVER`, `julianday`, todo a la vez |

La historia es lineal: al cerrar un caso se abre el siguiente, y los casos cerrados se pueden reabrir.

## Cómo se juega

```text
Leer la escena  →  Leer la pista  →  Escribir una consulta  →  Indicio en el cuaderno  →  Siguiente pista
```

- Cada caso tiene varias pistas. Si un resultado no responde a una, el juego explica por qué: falta una columna, sobran filas, el orden no es el pedido.
- Las columnas de más no importan, y el orden de las filas tampoco, salvo que la pista lo pida.
- Los casos difíciles esconden las pruebas entre filas corrientes, y los últimos no ofrecen ayuda. Uno de ellos no tiene lista de tablas: tendrás que preguntarle a la propia base de datos.
- Los expedientes terminan con una acusación, y el último caso con una decisión que elige uno de los tres finales.
- Pedir ayuda cuesta 1 punto de credibilidad y una acusación falsa, 5. Nunca te bloquea; solo decide tu rango final.

El terminal es de solo lectura: acepta una consulta `SELECT` o `WITH` cada vez, además del comando `.tables`. El manual de SQL está siempre disponible desde el menú y desde cada caso.

## Arquitectura

Módulos ES sin framework ni empaquetador, organizados por capas. Las dependencias apuntan hacia dentro: `ui` y `platform` dependen de `core`, y `core` no depende de nada.

| Carpeta | Responsabilidad |
|---|---|
| `src/core/` | Reglas del juego sin navegador: ejecución de SQL, comprobación de resultados, progreso, desbloqueo, puntuación. Se prueban en Node |
| `src/content/` | La historia y todos los textos, como datos. Añadir un caso no cambia las reglas |
| `src/platform/` | Adaptadores del navegador: partida guardada, idioma, carga del motor SQL |
| `src/ui/` | Dibujo: `screens/` en un registro en `app.js`, y `components/` |
| `src/main.js` | Raíz de composición: crea las dependencias del navegador y arranca el juego |

Los patrones se nombran en la cabecera de cada módulo: registros de pantallas (`ui/app.js`), capítulos (`content/campaign.js`), finales (`content/endings.js`) y comandos del terminal (`core/meta-commands.js`), y transiciones puras sobre la partida (`core/progress.js`). El formato de una misión está en `content/campaign.js`, y `tests/solutions.js` guarda la consulta canónica de cada pista.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:4173
npm run check      # lint, tests y build
npm run solutions  # escribe una hoja de respuestas local en local-data/
```

Las ilustraciones están en `public/art/` y se declaran en `src/content/art.js`. El menú principal y los capítulos bloqueados usan una ciudad dibujada.

El progreso se guarda en `localStorage` con la clave `sqldetective.progress`, con versión del formato. El idioma se hereda de la web mediante `lang`.

## Desarrollador

**Raul Estevez**

- [Web personal](https://raulesteveza.github.io/)
- [Perfil de LinkedIn](https://www.linkedin.com/in/raulesteveza/)

Sugerencias y errores: [contact.raulesteveza@gmail.com](mailto:contact.raulesteveza@gmail.com)

## Licencia

[MIT](./LICENSE)
