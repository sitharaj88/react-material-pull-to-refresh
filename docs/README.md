# React Pull to Refresh Documentation

This directory contains the GitHub Pages documentation for the React Pull to Refresh library.

## Files

- `index.html` - Main documentation page with features, installation, usage, and API reference
- `demo.html` - Live demo page (currently points to a placeholder URL)

## Deployment

The documentation is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the main branch.

## Local Development

To view the documentation locally:

1. Start a local server in this directory:
   ```bash
   cd docs
   python -m http.server 8000
   ```

2. Open `http://localhost:8000` in your browser

## Customization

- Update `index.html` to modify the documentation content
- Update `demo.html` to change the demo URL when deployed
- Modify the GitHub Actions workflow in `.github/workflows/deploy.yml` for deployment settings