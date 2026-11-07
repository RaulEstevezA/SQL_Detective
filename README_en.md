# SQL Detective

<p align="center">
  <img src="./public/sql-detective-logo.png" alt="SQL Detective logo" width="160">
</p>

An interactive crime novel for learning SQL. Every case is a chapter of one story, and every step of the story is a real query, executed in your browser on SQLite.

**Play:** [raulesteveza.github.io/games/SQL_Detective](https://raulesteveza.github.io/games/SQL_Detective/)

## The story

Puerto Ceniza, November 1987. It has been raining for eleven days. You are the new analyst of the Records Bureau, two floors below the police headquarters, at the desk of Inés Bosch, “transferred” eleven months ago. Warehouses are burning in the Old Quarter, the case files about them are disappearing, and someone has been leaving you notes inside the data.

## Campaign

| Chapter | Cases | SQL |
|---|---:|---|
| 1. Basement Two | 5 | `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `LIKE`, `DISTINCT`, `BETWEEN`, `IN`, `JOIN`, `GROUP BY` |
| 2. Pier Three | 5 | `LEFT JOIN`, `IS NULL`, `HAVING`, multiple joins, `AVG`, subqueries |
| 3. The Glass Gallery | 5 | `CASE`, self joins, CTEs, `strftime`, `EXCEPT`, `UNION` |
| 4. Altered Records | 5 | `TRIM`, `UPPER`, `REPLACE`, `COALESCE`, `sqlite_master`, `LAG`, `ROW_NUMBER`, range joins |
| 5. The Last Signal | 4 | `WITH RECURSIVE`, `SUM OVER`, `julianday`, everything together |

The story is linear: closing a case opens the next one, and closed cases can be reopened.

## How to play

```text
Read the scene  →  Read the lead  →  Write a query  →  Clue in the notebook  →  Next lead
```

- Each case has several leads. A result that does not answer one is explained: a missing column, a wrong number of rows, the wrong order.
- Extra columns do not matter, and neither does the order of the rows unless the lead asks for it.
- Harder cases hide the evidence among ordinary rows, and later ones offer no hints at all. One of them has no list of tables: you will have to ask the database itself.
- Dossiers end with an accusation, and the last case with a decision that selects one of three endings.
- Hints cost 1 point of credibility and a wrong accusation costs 5. That never blocks you; it sets your rank at the end.

The terminal is read-only: it accepts one `SELECT` or `WITH` query at a time, plus the `.tables` command. The SQL handbook is always available from the menu and from each case.

## Architecture

Plain ES modules without a framework or a bundler, organised in layers. The dependencies point inwards: `ui` and `platform` depend on `core`, and `core` depends on nothing.

| Folder | Responsibility |
|---|---|
| `src/core/` | Game rules without a browser: SQL execution, result checks, progress, unlocking, scoring. Tested in Node |
| `src/content/` | The story and every text, as data. Adding a case means no changes in the rules |
| `src/platform/` | Adapters of the browser: saved game, language, loading of the SQL engine |
| `src/ui/` | Rendering: `screens/` in a registry in `app.js`, and `components/` |
| `src/main.js` | Composition root: creates the browser dependencies and starts the game |

The patterns are named in the header of each module: a registry of screens (`ui/app.js`), chapters (`content/campaign.js`), endings (`content/endings.js`) and terminal commands (`core/meta-commands.js`), and pure transitions over the saved game (`core/progress.js`). The format of a mission is documented in `content/campaign.js`, and `tests/solutions.js` holds the canonical query of every lead.

## Development

```bash
npm install
npm run dev        # http://localhost:4173
npm run check      # lint, tests and build
npm run solutions  # writes a local answer sheet in local-data/
```

Illustrations live in `public/art/` and are declared in `src/content/art.js`. The main menu and the locked chapters use a drawn skyline instead.

Progress is saved in `localStorage` under `sqldetective.progress`, with a format version. The language is inherited from the website through `lang`.

## Developer

**Raul Estevez**

- [Personal Website](https://raulesteveza.github.io/)
- [LinkedIn Profile](https://www.linkedin.com/in/raulesteveza/)

Suggestions and bug reports: [contact.raulesteveza@gmail.com](mailto:contact.raulesteveza@gmail.com)

## License

[MIT](./LICENSE)
