# Architecture

SQL Detective follows SOLID as a required design constraint. The goal is practical separation of responsibilities without adding a framework to a static application.

## Module boundaries

- `src/data/` contains declarative cases and investigation content. Adding a case should not require changing the SQL engine or view modules.
- `src/features/` contains framework-independent game rules. Feature functions must not access the DOM or browser storage.
- `src/ui/` renders one interface concern per module and receives its data and callbacks explicitly.
- `src/lib/` contains focused infrastructure adapters and reusable utilities.
- `src/app.js` is the composition root: it owns application state, injects dependencies and coordinates modules.

## Rules for future changes

1. A module has one reason to change.
2. Extend cases through data before adding conditional logic to the controller.
3. Keep domain rules independent from browser APIs so they can be tested directly.
4. Pass collaborators as parameters where interchangeable implementations or tests benefit from it.
5. Prefer small, specific exports over broad utility objects.
6. Add regression tests whenever a feature changes progression, validation or stored state.
