# Deploy Checklist

Use this folder as the GitHub Pages publishing folder.

## Before Upload

- Confirm `index.html` opens through a local server.
- Confirm `node test.js` passes.
- Keep the `vendor/` folder with the app.
- Keep `.nojekyll` in the repository root.

## GitHub Pages

1. Create a public repository.
2. Upload all files from this folder to the repository root.
3. Go to `Settings` -> `Pages`.
4. Choose `Deploy from a branch`.
5. Pick `main` and `/root`.
6. Save.

GitHub will show the public URL after the deployment finishes.

## Optional Domain

After the default GitHub Pages URL works, add a custom domain in `Settings` -> `Pages`. Enable HTTPS when GitHub offers the option.
