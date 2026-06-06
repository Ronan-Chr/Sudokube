// ════════════════════════════════════════════════════════════════
// 3D SUDOKU — CORE GAME LOGIC
//
// The cube is a size×size×size grid of cells: grid[x][y][z]
// Each cell belongs to 3 interlocking sudoku grids simultaneously:
//
//   YZ plane (fix x): the size×size slice seen from the left/right
//   XZ plane (fix y): the size×size slice seen from front/back
//   XY plane (fix z): the size×size slice seen from top/bottom
//
// Values per cell: 1 through (size²)  — e.g. easy=3 → values 1–9
//
// CONFIGS:
//   easy:   3×3×3  cube, 9  cells per face, values 1–9
// ════════════════════════════════════════════════════════════════

const CONFIGS = {
  easy:   { size: 3, values: 9  },   // 3×3×3,  face is 3×3  = 9  cells → 1–9
};

// ── Grid creation ─────────────────────────────────────────────

function createGrid(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () =>
      Array(size).fill(0)));
}

// ── Core constraint check ─────────────────────────────────────
//
// For cell (x,y,z) with value val, check all three axis-planes:
//   YZ plane (same x): no other grid[x][y2][z2] == val
//   XZ plane (same y): no other grid[x2][y][z2] == val
//   XY plane (same z): no other grid[x2][y2][z] == val

function isValidPlacement(grid, x, y, z, val, config) {
  const { size } = config;

  // YZ plane — fix x, scan all y2,z2
  for (let y2 = 0; y2 < size; y2++) {
    for (let z2 = 0; z2 < size; z2++) {
      if ((y2 !== y || z2 !== z) && grid[x][y2][z2] === val) return false;
    }
  }

  // XZ plane — fix y, scan all x2,z2
  for (let x2 = 0; x2 < size; x2++) {
    for (let z2 = 0; z2 < size; z2++) {
      if ((x2 !== x || z2 !== z) && grid[x2][y][z2] === val) return false;
    }
  }

  // XY plane — fix z, scan all x2,y2
  for (let x2 = 0; x2 < size; x2++) {
    for (let y2 = 0; y2 < size; y2++) {
      if ((x2 !== x || y2 !== y) && grid[x2][y2][z] === val) return false;
    }
  }

  return true;
}

// ── Full grid validation ──────────────────────────────────────

function isValid(grid, config) {
  const { size } = config;
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        const val = grid[x][y][z];
        if (!val) continue;
        grid[x][y][z] = 0;
        const ok = isValidPlacement(grid, x, y, z, val, config);
        grid[x][y][z] = val;
        if (!ok) return false;
      }
    }
  }
  return true;
}

// ── Shuffle helper ────────────────────────────────────────────

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── Grid fill (backtracking) ──────────────────────────────────

function fillGrid(grid, config) {
  const { size, values } = config;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        if (grid[x][y][z] === 0) {
          // shuffle values 1..values (e.g. 1–9 for easy)
          const candidates = shuffle(Array.from({ length: values }, (_, i) => i + 1));

          for (const val of candidates) {
            if (isValidPlacement(grid, x, y, z, val, config)) {
              grid[x][y][z] = val;
              if (fillGrid(grid, config)) return true;
              grid[x][y][z] = 0;
            }
          }

          return false; // no value worked — backtrack
        }
      }
    }
  }

  return true; // all cells filled
}

function generateGrid(config) {
  const grid = createGrid(config.size);
  fillGrid(grid, config);
  return grid;
}

// ── Solver ────────────────────────────────────────────────────

function fillSolver(grid, config) {
  const { size, values } = config;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        if (grid[x][y][z] === 0) {
          for (let val = 1; val <= values; val++) {
            if (isValidPlacement(grid, x, y, z, val, config)) {
              grid[x][y][z] = val;
              if (fillSolver(grid, config)) return true;
              grid[x][y][z] = 0;
            }
          }
          return false;
        }
      }
    }
  }

  return true;
}

function solvePuzzle(grid, config) {
  const copy = grid.map(x => x.map(y => [...y]));
  const solved = fillSolver(copy, config);
  return solved ? copy : null; // null = unsolvable
}

// ── Puzzle generation (remove cells, keep unique solution) ────

function countSolutions(grid, config, count) {
  const { size, values } = config;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        if (grid[x][y][z] === 0) {
          for (let val = 1; val <= values; val++) {
            if (isValidPlacement(grid, x, y, z, val, config)) {
              grid[x][y][z] = val;
              count = countSolutions(grid, config, count);
              grid[x][y][z] = 0;
              if (count > 1) return count; // early exit
            }
          }
          return count;
        }
      }
    }
  }

  return count + 1;
}

function hasUniqueSolution(grid, config) {
  const copy = grid.map(x => x.map(y => [...y]));
  return countSolutions(copy, config, 0) === 1;
}

function makePuzzle(grid, config) {
  const { size } = config;
  const puzzle = grid.map(x => x.map(y => [...y]));

  const cells = [];
  for (let x = 0; x < size; x++)
    for (let y = 0; y < size; y++)
      for (let z = 0; z < size; z++)
        cells.push([x, y, z]);

  shuffle(cells);

  for (const [x, y, z] of cells) {
    const backup = puzzle[x][y][z];
    puzzle[x][y][z] = 0;
    if (!hasUniqueSolution(puzzle, config)) {
      puzzle[x][y][z] = backup; // restore — removing this broke uniqueness
    }
  }

  return puzzle;
}

export { CONFIGS, createGrid, isValid, isValidPlacement, generateGrid, solvePuzzle, makePuzzle };
