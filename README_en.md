# SQL Detective

<p align="center">
  <img src="./public/sql-detective-logo.png" alt="SQL Detective logo" width="160">
</p>

An educational browser game for learning SQL by solving mysteries with fictional databases. Each investigation provides a story, an objective and evidence that must be discovered through read-only queries.

**Play:** [raulesteveza.github.io/games/SQL_Detective](https://raulesteveza.github.io/games/SQL_Detective/)

**Español:** [README_es.md](./README_es.md)

## Features

- 15 complete cases in English and Spanish.
- Built-in tutorial and progressive unlocking.
- Full case stories separated from objectives to avoid spoilers.
- Accessible difficulty scale from 0 to 5 stars.
- Queries executed locally with SQLite and WebAssembly.
- Optional clues, educational errors and solution explanations.
- Three multi-stage dossiers with an evidence notebook and final accusation.
- Browser-based progress with a reset option.
- Built-in SQL guide with `.tables` for case exploration.
- Responsive design, keyboard navigation and visible focus.
- No backend, user accounts or mandatory external services.

## Campaign

The campaign is divided into three sections:

| Section | Cases | Content |
|---|---:|---|
| Tutorial | 3 | `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `JOIN`, `COUNT` and `GROUP BY` |
| Investigations | 9 | `LIKE`, `IN`, `BETWEEN`, `NULL`, multiple joins, aggregates, subqueries, `CASE`, CTEs and self-joins |
| Dossiers | 3 | Multi-stage investigation, cross-source evidence, window functions and accusations |

The three tutorial cases must be completed in order. Until then, the investigations section stays collapsed and displays a lock. Completing the tutorial unlocks all twelve investigations, which can then be played freely and in any order.

Four- and five-star cases provide neither optional clues nor example queries. The final dossier contains nine investigative leads, ten tables, ambiguous evidence and two responsible people who must be established through independent sources.

## How to play

1. Read the case summary and open the full story when you need more context.
2. Inspect the available tables and columns. In the final dossier, you must discover them from the editor.
3. Write a SQL query and run it with the button or `Ctrl/Cmd + Enter`.
4. Compare results, discard coincidences and record new evidence.
5. In dossiers, complete each lead to update the detective notebook.
6. Submit the final accusation once all evidence has been collected.

The SQL Guide explains every statement used by the game. It also supports:

```sql
.tables
```

to list the current case tables, and:

```sql
SELECT * FROM table_name LIMIT 5;
```

to inspect a small sample of their columns and rows.

## Security and privacy

- All records are fictional and loaded into a fresh in-memory SQLite database.
- Queries run exclusively inside the browser tab.
- No data, query or progress is sent to a server.
- Only read-only queries beginning with `SELECT` or `WITH` are accepted.
- Writes, schema changes and multiple statements are blocked.
- `.tables` is a safe meta-command implemented by the game itself.
- Progress and the selected language are stored only in the browser.

## Accessibility and compatibility

- Adaptive interface for desktop, tablet and mobile.
- Keyboard-operable controls.
- Visible focus and a skip link to the game.
- Labels for the editor, tabs, difficulty, dialogs and forms.
- Locked states communicated visually and with ARIA attributes.
- Compatible with modern browsers supporting ES modules, WebAssembly, `dialog` and `localStorage`.

## Technology

- Semantic HTML5.
- Custom CSS.
- JavaScript through ES modules.
- [sql.js](https://github.com/sql-js/sql.js) for SQLite compiled to WebAssembly.

## Developer

**Raul Estevez** · [Personal website](https://raulesteveza.github.io/) · [LinkedIn](https://www.linkedin.com/in/raulesteveza/)

Suggestions and bug reports: [contact.raulesteveza@gmail.com](mailto:contact.raulesteveza@gmail.com)

## License

Distributed under the [MIT license](./LICENSE).
