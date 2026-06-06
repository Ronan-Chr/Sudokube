import { CONFIGS, createGrid, isValid, isValidPlacement, generateGrid, solvePuzzle, makePuzzle } from './sudoku3d.js';

const config = CONFIGS.easy; // 3×3×3, values 1–9

function check(label, result, expected) {
  const pass = result === expected;
  console.log(`${pass ? '✅' : '❌'} ${label}`);
  if (!pass) console.error(`   expected ${expected}, got ${result}`);
}

// ── Test 1: empty grid is valid ───────────────────────────────
const empty = createGrid(config.size);
check('empty grid is valid', isValid(empty, config), true);

// ── Test 2: value 5 in one cell, no conflict ──────────────────
const oneVal = createGrid(config.size);
oneVal[0][0][0] = 5;
check('single value is valid', isValid(oneVal, config), true);

// ── Test 3: same value twice in the same YZ plane (same x) ───
// grid[0][0][0] and grid[0][1][1] share x=0, so both are in the YZ plane for x=0
const yzDupe = createGrid(config.size);
yzDupe[0][0][0] = 3;
yzDupe[0][1][1] = 3; // same YZ plane (x=0) — conflict
check('duplicate in YZ plane (same x) is invalid', isValid(yzDupe, config), false);

// ── Test 4: same value twice in the same XZ plane (same y) ───
const xzDupe = createGrid(config.size);
xzDupe[0][0][0] = 7;
xzDupe[1][0][2] = 7; // same XZ plane (y=0) — conflict
check('duplicate in XZ plane (same y) is invalid', isValid(xzDupe, config), false);

// ── Test 5: same value twice in the same XY plane (same z) ───
const xyDupe = createGrid(config.size);
xyDupe[0][0][0] = 4;
xyDupe[2][1][0] = 4; // same XY plane (z=0) — conflict
check('duplicate in XY plane (same z) is invalid', isValid(xyDupe, config), false);

// ── Test 6: same value, no shared plane — no conflict ─────────
// [0][0][0] and [1][1][1] share no single fixed axis → different YZ, XZ, and XY planes
const noConflict = createGrid(config.size);
noConflict[0][0][0] = 9;
noConflict[1][1][1] = 9;
check('same value in different planes is valid', isValid(noConflict, config), true);

// ── Test 7: generated easy grid is valid ──────────────────────
const easyGrid = generateGrid(CONFIGS.easy);
check('generated 3×3×3 grid is valid', isValid(easyGrid, CONFIGS.easy), true);

// ── Test 8: grid is fully filled (no zeros) ───────────────────
const hasZeros = easyGrid.flat(2).includes(0);
check('generated grid has no empty cells', hasZeros, false);

// ── Test 9: every value is in range 1–9 ──────────────────────
const allInRange = easyGrid.flat(2).every(v => v >= 1 && v <= 9);
check('all values are in range 1–9', allInRange, true);

// ── Test 10: each axis-plane contains 1–9 exactly once ───────
function planesValid(grid, size) {
  for (let x = 0; x < size; x++) {
    const yz = []; for (let y=0;y<size;y++) for (let z=0;z<size;z++) yz.push(grid[x][y][z]);
    if (yz.sort((a,b)=>a-b).join() !== '1,2,3,4,5,6,7,8,9') return false;
  }
  for (let y = 0; y < size; y++) {
    const xz = []; for (let x=0;x<size;x++) for (let z=0;z<size;z++) xz.push(grid[x][y][z]);
    if (xz.sort((a,b)=>a-b).join() !== '1,2,3,4,5,6,7,8,9') return false;
  }
  for (let z = 0; z < size; z++) {
    const xy = []; for (let x=0;x<size;x++) for (let y=0;y<size;y++) xy.push(grid[x][y][z]);
    if (xy.sort((a,b)=>a-b).join() !== '1,2,3,4,5,6,7,8,9') return false;
  }
  return true;
}
check('all 9 axis-planes contain 1–9 exactly once', planesValid(easyGrid, CONFIGS.easy.size), true);

// ── Test 11: solver solves a puzzle ───────────────────────────
const fullGrid = generateGrid(CONFIGS.easy);
const puzzle   = makePuzzle(fullGrid, CONFIGS.easy);
const solution = solvePuzzle(puzzle, CONFIGS.easy);
check('solver returns a valid solution', isValid(solution, CONFIGS.easy), true);
check('solution planes are all valid',   planesValid(solution, CONFIGS.easy.size), true);

// ── Test 12: puzzle has empty cells ───────────────────────────
check('puzzle has empty cells to fill', puzzle.flat(2).includes(0), true);

// ── Test 13: solution matches original full grid ──────────────
const matches = fullGrid.flat(2).every((val, i) => val === solution.flat(2)[i]);
check('solution matches original grid', matches, true);
