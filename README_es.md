# SQL Detective

<p align="center">
  <img src="./public/sql-detective-logo.png" alt="Logo de SQL Detective" width="160">
</p>

Juego web educativo para aprender SQL resolviendo misterios con bases de datos ficticias. Cada investigación presenta una historia, un objetivo y pruebas que deben descubrirse mediante consultas de solo lectura.

**Jugar:** [raulesteveza.github.io/games/SQL_Detective](https://raulesteveza.github.io/games/SQL_Detective/)

**English:** [README_en.md](./README_en.md)

## Características

- 15 casos completos en español e inglés.
- Tutorial integrado y desbloqueo progresivo.
- Historias completas separadas de los objetivos para evitar spoilers.
- Dificultad accesible de 0 a 5 estrellas.
- Consultas ejecutadas localmente con SQLite y WebAssembly.
- Pistas opcionales, errores didácticos y explicación de las soluciones.
- Tres expedientes por etapas con libreta de pruebas y acusación final.
- Progreso guardado en el navegador y opción para reiniciarlo.
- Guía SQL integrada con `.tables` para explorar cada caso.
- Diseño responsive, navegación por teclado y foco visible.
- Sin backend, cuentas de usuario ni servicios externos obligatorios.

## Campaña

La campaña está organizada en tres bloques:

| Bloque | Casos | Contenido |
|---|---:|---|
| Tutorial | 3 | `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `JOIN`, `COUNT` y `GROUP BY` |
| Investigaciones | 9 | `LIKE`, `IN`, `BETWEEN`, `NULL`, joins múltiples, agregaciones, subconsultas, `CASE`, CTE y self-joins |
| Expedientes | 3 | Investigación por etapas, combinación de varias fuentes, funciones de ventana y acusaciones |

Los tres tutoriales deben completarse en orden. Hasta entonces, la sección de investigaciones permanece cerrada y muestra un candado. Al terminar el tutorial se desbloquean las doce investigaciones, que pueden jugarse libremente y en cualquier orden.

Los casos de cuatro y cinco estrellas no proporcionan pistas opcionales ni consultas de ejemplo. El expediente final contiene nueve líneas de investigación, diez tablas, pruebas ambiguas y dos responsables que deben demostrarse mediante fuentes independientes.

## Cómo se juega

1. Lee el resumen del caso y abre la historia completa si necesitas más contexto.
2. Examina las tablas y columnas disponibles. En el expediente final deberás descubrirlas desde el editor.
3. Escribe una consulta SQL y ejecútala con el botón correspondiente o con `Ctrl/Cmd + Enter`.
4. Compara los resultados, descarta coincidencias y registra nuevas pruebas.
5. En los expedientes, completa cada línea para actualizar la libreta del detective.
6. Formula la acusación final cuando todas las pruebas estén reunidas.

La Guía SQL explica las sentencias utilizadas. También admite:

```sql
.tables
```

para enumerar las tablas del caso actual, y:

```sql
SELECT * FROM nombre_tabla LIMIT 5;
```

para examinar una muestra de sus columnas y filas.

## Seguridad y privacidad

- Todos los datos son ficticios y se cargan en una base SQLite nueva en memoria.
- Las consultas se ejecutan únicamente en la pestaña del navegador.
- No se envían datos, consultas ni progreso a ningún servidor.
- Solo se admiten consultas de lectura iniciadas con `SELECT` o `WITH`.
- Las escrituras, los cambios de esquema y las consultas múltiples están bloqueados.
- `.tables` es un metacomando seguro implementado por el propio juego.
- El progreso y el idioma seleccionado se guardan únicamente en el navegador.

## Accesibilidad y compatibilidad

- Interfaz adaptable para ordenador, tableta y móvil.
- Controles accesibles mediante teclado.
- Foco visible y enlace para saltar directamente al juego.
- Etiquetas para el editor, pestañas, dificultad, diálogos y formularios.
- Estados bloqueados comunicados visualmente y mediante atributos ARIA.
- Compatible con navegadores modernos que admitan módulos ES, WebAssembly, `dialog` y `localStorage`.

## Tecnologías

- HTML5 semántico.
- CSS personalizado.
- JavaScript mediante módulos ES.
- [sql.js](https://github.com/sql-js/sql.js) para ejecutar SQLite en WebAssembly.

## Desarrollador

**Raul Estevez** · [Web personal](https://raulesteveza.github.io/) · [LinkedIn](https://www.linkedin.com/in/raulesteveza/)

Sugerencias y errores: [contact.raulesteveza@gmail.com](mailto:contact.raulesteveza@gmail.com)

## Licencia

Distribuido bajo la licencia [MIT](./LICENSE).
