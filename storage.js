// ════════════════════════════════════════════════════════════════
// STORAGE MODULE — abstracted puzzle history
//
// Currently backed by localStorage.
// To swap for a real backend (Supabase, Firebase, etc.):
//   - Replace the functions below with API calls
//   - Keep the same exported interface — nothing else needs to change
// ════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'sudokube_history';

function _load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function _save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('[Storage] Could not save:', e);
  }
}

const Storage = {
  // Mark a puzzle as played (call when user starts or completes)
  markPlayed(difficulty, puzzleId) {
    const data = _load();
    if (!data[difficulty]) data[difficulty] = {};
    data[difficulty][puzzleId] = { playedAt: Date.now() };
    _save(data);
  },

  // Mark a puzzle as completed
  markCompleted(difficulty, puzzleId) {
    const data = _load();
    if (!data[difficulty]) data[difficulty] = {};
    data[difficulty][puzzleId] = {
      ...data[difficulty][puzzleId],
      completedAt: Date.now(),
      completed: true,
    };
    _save(data);
  },

  // Get set of played puzzle IDs for a difficulty
  getPlayedIds(difficulty) {
    const data = _load();
    return new Set(Object.keys(data[difficulty] || {}).map(Number));
  },

  // Get set of completed puzzle IDs
  getCompletedIds(difficulty) {
    const data = _load();
    const diff = data[difficulty] || {};
    return new Set(
      Object.entries(diff)
        .filter(([, v]) => v.completed)
        .map(([k]) => Number(k))
    );
  },

  // Get total stats
  getStats(difficulty) {
    const data = _load();
    const diff = data[difficulty] || {};
    const entries = Object.values(diff);
    return {
      played: entries.length,
      completed: entries.filter(e => e.completed).length,
    };
  },

  // Clear history for a difficulty (or all)
  clear(difficulty = null) {
    if (difficulty) {
      const data = _load();
      delete data[difficulty];
      _save(data);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  },
};

export default Storage;
