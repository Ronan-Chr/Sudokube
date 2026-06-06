# Sudokube

Sudokube is a browser-based 3D Sudoku puzzle game. It runs entirely in the browser as a static site.

The Three.js runtime files used by the game are bundled locally in `vendor/` so the published site does not depend on CDN-hosted game scripts.

## Play Locally

Because the app uses JavaScript modules, run it from a small local server:

```bash
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

## Publish With GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder, not the folder itself.
3. In GitHub, open `Settings` -> `Pages`.
4. Set the source to your main branch and root folder.
5. Save, then open the GitHub Pages URL after it finishes deploying.

## Privacy

No account, server, analytics, or personal data collection is used. Puzzle progress is stored locally in the player's browser.

## Development Check

Run the puzzle logic tests with:

```bash
node test.js
```
