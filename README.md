# Sudokube

Sudokube is a browser-based 3D Sudoku puzzle game. It runs entirely in the browser as a static site. The idea is a sudoku board with a z axis making a 3x3x3 cube similar to a Rubik's cube and has 1 through 9 appearing 1 time on each unique axis and having no overlap between them. Its human solvable and harder then you'd think. 

The Three.js runtime files used by the game are bundled locally in `vendor/` so the published site does not depend on CDN-hosted game scripts.
## Tech Stack

<table>
<tr>
<td width="25%" valign="top"><strong>Current Tech Stack</strong></td>
<td width="75%">
Front End- JS, HTML/CSS and Three.js for cubes<br> 
  Back End- None (Static)<br>
  Database- Local Storage<br>
  Testing- node test.js<br>
  Deployment- Github Pages<br>
  AI- Used for Animations
</td>
</tr>
</table>

<table>
<tr>
<td width="25%" valign="top"><strong>Planned Tech Stack</strong></td>
<td width="75%">
Front End- JS, HTML/CSS and Three.js for cubes<br> 
  Back End- Node.js and Express API<br>
  Database- PostgreSQL<br>
  Testing- node test.js<br>
  Deployment- Docker + GitHub Actions + Google Cloud<br>
  AI- Continued Use for animations and chatbot assistance for major edge case bugs I cant find any help with
</td>
</tr>
</table>


## Live Demo

Link- https://ronan-chr.github.io/Sudokube/

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
## Screens

### Home Screen

Spinning Cube with a play button which brings you to the select screen.
![Sudokube spinning cube](docs\sudokube.gif)

### Select Puzzle Screen

Theres a random puzzle of ones you havent played one that lets you play ones youve already completed or played and then choose specific which has a slider for 1-500 puzzles.
![Select Screen](docs\select-puzzle-screen.png)

### Play Screen

Theres a cube you can click cells and enter a number either through your keyboard or clicked and then using the small entry calculator bottom right. There is also a cheat sheet key top left of the screen.
![Playing Screen](docs\play-screen.png)

