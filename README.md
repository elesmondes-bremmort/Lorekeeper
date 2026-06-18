# Lorekeeper

Lorekeeper is a lightweight, system-agnostic campaign knowledge base and journal for Foundry VTT.

It stores its own world-scoped data and does not depend on Actors, Items, Journal Entries, Scenes, or a game system. Version 0.1.0 is an experimental MVP intended to validate the core workflow before heavier storage or collaboration features are introduced.

## V1 Features

- Pop-out Lorekeeper application with Codex and Journal tabs.
- System-agnostic Codex entries for clues, locations, characters, monsters, and objects.
- GM-only fields and player-safe public fields.
- Basic read permissions with default and per-user access.
- Shared and private comments on visible entries.
- Shared campaign journal and per-player private journals.
- Internal entry links using `[[entry:ID]]` with click navigation, Ctrl-click pop-out, and hover preview.
- Floating launcher, persistent integrated window, and experimental detached browser window.
- Image path references through Foundry file paths without duplicating image data.
- English and French localization.

## Installation

Development manifest URL:

```text
https://raw.githubusercontent.com/elesmondes-bremmort/Lorekeeper/main/module.json
```

Foundry installs from `module.json` and downloads the current `main` archive for development installs. Do not switch this to `releases/latest/download` until a GitHub Release exists with both `module.json` and `lorekeeper.zip` attached.

## Manual Installation

1. Download the release zip.
2. Extract it into your Foundry `Data/modules/lorekeeper` folder.
3. Make sure `module.json` is at the root of that folder.
4. Restart Foundry or refresh the setup screen.
5. Enable Lorekeeper in your world.

## Build package

```bash
npm install
npm run package
```

The package command creates `dist/lorekeeper.zip` with `module.json` directly at the root of the archive for Foundry VTT and The Forge installation.

## Compatibility

- Foundry VTT v13 minimum.
- Verified for Foundry VTT v13.
- System-agnostic.
- Designed to be compatible with The Forge module installation flow.

## Data Philosophy

Lorekeeper V1 stores data in a hidden world setting. This keeps the module small and avoids native document dependencies while leaving a clear path to migrate later to custom Documents if the project needs them.

Images are stored only as Foundry file paths such as `worlds/my-world/assets/zaban.webp` or `modules/lorekeeper/assets/default.webp`. Lorekeeper never stores images as base64, and displays a lightweight placeholder when a path is missing.

## Experimental Notice

Version 0.1.0 is experimental. Back up your world before using it in an active campaign.
