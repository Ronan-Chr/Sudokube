# 3D Sudoku — Puzzle Database Schema

## File Structure
```
3D-Sudoku/
├── easy-puzzles.js     ← 500 × 3×3×3  (this release)
├── medium-puzzles.js   ← 500 × 6×6×6  (next)
├── hard-puzzles.js     ← 500 × 9×9×9  (next)
├── puzzle-loader.js    ← unified API
├── sudoku3d.js         ← game logic (existing)
└── index.html          ← entry point (existing)
```

## Database Entry Format
Each puzzle in `*-puzzles.js` is a compact object:
```js
{
  id:    333,                // 1–500, stable puzzle number
  seed:  3735928892,         // deterministic RNG seed → same clues always
  clues: 15,                 // filled cells in the puzzle grid
  p:     [[[...]]],          // puzzle grid [x][y][z], 0 = empty
  s:     [[[...]]],          // solution grid [x][y][z]
}
```

## Grid Layout
- Axes: `grid[x][y][z]`
- Values: 1 to SIZE (3 for easy, 6 for medium, 9 for hard)
- Constraints: each value appears exactly once per x-row, y-column, z-pillar
- 3×3×3 = 27 cells total

## Seeding Guarantee
```
seed = 0xDEADBEEF + puzzle_id
```
Puzzle #333 uses seed `3735928892`. The RNG (Python `random.Random(seed)`)
drives both fill_grid and cell-removal order — so the output is
**byte-for-byte identical** on any machine. Regenerating is possible
without storing the file.

## Human-Solvability Contract
Every puzzle passes the **naked-single-only** filter:
at every step of solving, at least one empty cell has exactly one
valid candidate. No guessing or bifurcation is ever required.

## Using the Loader
```js
import EASY   from './easy-puzzles.js';
import Loader from './puzzle-loader.js';

Loader.register('easy', EASY);

// Get puzzle #333 — identical for every user
const puzzle = Loader.getClone('easy', 333);
// puzzle.puzzle[x][y][z] → 0 or 1–3
// puzzle.solution[x][y][z] → 1–3 (answer key)

// Random puzzle
const random = Loader.getRandom('easy');

// Answer key lookup
const sol = Loader.getSolution('easy', 333);
```
