// ════════════════════════════════════════════════════════════════
// 3D SUDOKU — PUZZLE LOADER
//
// Usage:
//   import EASY   from './easy-puzzles.js';
//   import Loader from './puzzle-loader.js';
//   Loader.register('easy', EASY);
//
//   Loader.get('easy', 333)        // raw entry (do not mutate)
//   Loader.getClone('easy', 333)   // deep clone, safe for game state
//   Loader.getRandom('easy')       // random puzzle, cloned
//   Loader.getSolution('easy', 1)  // answer key for puzzle #1
//   Loader.getNext('easy', 333)    // puzzle #334
//   Loader.getPrev('easy', 333)    // puzzle #332
// ════════════════════════════════════════════════════════════════

const _dbs = {};

const PuzzleLoader = {

  register(difficulty, puzzleArray) {
    const byId = new Map(puzzleArray.map(p => [p.id, p]));
    _dbs[difficulty] = { byId, list: puzzleArray };
  },

  get(difficulty, id) {
    return _dbs[difficulty]?.byId.get(id) ?? null;
  },

  getClone(difficulty, id) {
    const e = this.get(difficulty, id);
    if (!e) return null;
    return {
      id:         e.id,
      seed:       e.seed,
      difficulty,
      clues:      e.clues,
      puzzle:     e.p.map(x => x.map(y => [...y])),    // [x][y][z], 0 = empty
      solution:   e.s.map(x => x.map(y => [...y])),    // [x][y][z], 1-9
    };
  },

  getRandom(difficulty) {
    const db = _dbs[difficulty];
    if (!db) return null;
    const e = db.list[Math.floor(Math.random() * db.list.length)];
    return this.getClone(difficulty, e.id);
  },

  getSolution(difficulty, id) {
    const e = this.get(difficulty, id);
    return e ? e.s.map(x => x.map(y => [...y])) : null;
  },

  getNext(difficulty, currentId) {
    const nextId = currentId >= 500 ? 1 : currentId + 1;
    return this.getClone(difficulty, nextId);
  },

  getPrev(difficulty, currentId) {
    const prevId = currentId <= 1 ? 500 : currentId - 1;
    return this.getClone(difficulty, prevId);
  },

  getStats(difficulty) {
    const db = _dbs[difficulty];
    if (!db) return null;
    return { difficulty, total: db.list.length, registered: true };
  },
};

export default PuzzleLoader;
