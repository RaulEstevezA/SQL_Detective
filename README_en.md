# SQL Detective

SQL Detective is a bilingual browser game for learning SQL through fictional investigations. Each case provides a story, an objective and local tables. The player writes a read-only query, inspects its result and unlocks an explanation after finding the required evidence.

## Campaign

The campaign contains 15 progressively unlocked cases:

- 3 tutorial cases covering `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `JOIN` and grouping.
- Built-in bilingual SQL guide with syntax and explanations for the statements used in the game.
- A bilingual full story for every case, separated from the objective and without revealing the solution.
- 9 guided investigations covering `LIKE`, `IN`, `BETWEEN`, null values, `LEFT JOIN`, `HAVING`, subqueries, multiple joins, `CASE`, CTEs and self-joins.
- 3 open dossiers split into investigative leads: each query uncovers evidence, updates the notebook and culminates in an accusation outside the SQL editor. The final dossier spans nine leads, ten tables, ambiguous evidence and two responsible people.

The three tutorial cases unlock in order. Completing the tutorial opens all twelve investigations at once, which can then be played in any order.

Optional clues, educational errors and solution explanations are included. Progress is stored in `localStorage` under `sqldetective.progress` and can be reset from the interface.

Every case has an accessible difficulty rating from zero to five stars. Zero-star cases introduce the interface; five-star cases are reserved for the most open-ended investigations.

Four- and five-star cases provide neither optional clues nor an example query.

## Architecture

- Static HTML, CSS and JavaScript modules.
- SQLite compiled to WebAssembly through `sql.js`, packaged with the game and restricted to read-only queries.
- Case definitions separated in `src/data/cases.js`.
- Staged dossiers defined in `src/data/dossier-investigations.js`.
- Browser-independent domain rules in `src/features/` and isolated presentation modules in `src/ui/`.
- English and Spanish strings in `src/locales/translations.js`.
- Automated engine tests using the Node.js test runner.

Each case receives a fresh in-memory SQLite database. Nothing is uploaded or persisted beyond game progress.
Mandatory SOLID rules for future extensions are documented in [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Development

Requires Node.js 22 or later. Install the build dependency once with `npm install`.

```bash
npm run dev       # http://localhost:4173
npm test          # engine tests
npm run build     # static output in dist/
npm run check     # tests and build
```

## Deployment

`.github/workflows/deploy-web.yml` tests and builds the game, then copies `dist/` to `games/SQL_Detective/` in the personal website repository. Add `PORTFOLIO_DEPLOY_TOKEN` as an Actions secret with write access to that repository before the first deployment.

All asset paths are relative, so the build also works from any static subdirectory.

## Adding a case

Add a case object with translated story text, table rows, hints, expected evidence and a solution to `src/data/cases.js`. Add engine tests when the case introduces new SQL syntax.

## Design reference

This project follows the local `personal_web_style` design and UX reference. It uses its dark palette, tokens, component hierarchy, responsive breakpoints, common header and accessibility rules.

## Developer

**Raul Estevez** · [Personal Website](https://raulesteveza.github.io/) · [LinkedIn Profile](https://www.linkedin.com/in/raulesteveza/)

Suggestions and bug reports: [contact.raulesteveza@gmail.com](mailto:contact.raulesteveza@gmail.com)

## License

[MIT](./LICENSE)
