# Project Scripts

This directory contains utility scripts for the Podman.io website.

## Available Scripts

### `generate-meetings-index.js`
This script automatically compiles the metadata (titles, human-readable dates, recording links, and Cabal flags) from the meeting note markdown files under `static/data/meetings/notes/` and outputs a type-safe index file with dynamic imports.

#### How to run:
```bash
node scripts/generate-meetings-index.js
```

---

## Adding New Meeting Notes Dynamically

To add a new community or cabal meeting note to the site:
1. Create a new folder under `static/data/meetings/notes/` named after the date of the meeting in `YYYY-MM-DD` format (e.g., `2026-08-04`).
2. Inside that folder, create an `index.md` file containing the meeting notes.
3. Ensure the markdown file contains:
   - A main H1 title (e.g. `# Podman Community Meeting Notes` or `# Podman Community Cabal Notes`).
   - A H2 header for the date (e.g. `## August 4, 2026 11:00 a.m. Eastern`).
   - A line with the recording link (e.g. `Video [Recording](https://youtube.com/...)` or `BlueJeans [Recording](...)`).
4. Run the generator script to compile the metadata:
   ```bash
   node scripts/generate-meetings-index.js
   ```
   This will automatically regenerate `static/data/meetings/notes/index.ts` to include the new meeting notes.

---
