# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This is a **VChart Dashboard** — a client-side-only React + TypeScript SPA built with Vite. It renders five chart types (Circle Packing, Waterfall, Rose, Sankey, Treemap) in a draggable/resizable grid layout using `react-grid-layout` and `@visactor/vchart`. There is no backend or database.

### Development commands

Standard commands are in `package.json`:

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (Vite, serves at `http://localhost:5173/VChart-/`) |
| Lint | `npm run lint` (ESLint 9) |
| Build | `npm run build` (runs `tsc -b && vite build`) |
| Preview | `npm run preview` |

### Notes

- The Vite config sets `base: '/VChart-/'` for GitHub Pages deployment. The dev server URL includes this base path: `http://localhost:5173/VChart-/`.
- Path alias `@/` maps to `src/` (configured in `tsconfig.app.json` and `vite.config.ts`).
- The repo has pre-existing ESLint errors (5 `@typescript-eslint/no-explicit-any` violations in `src/chart-configs/`). These are known and do not block the build.
- No automated test framework is configured (no `test` script in `package.json`).
- To expose the dev server on all interfaces (useful in cloud environments), use `npm run dev -- --host 0.0.0.0`.
