# Manual Tests

## Installation

- Install the module from a local folder.
- Verify that Foundry detects the module.
- Enable the module in a world.
- Verify that no console error appears on load.

## Manifest / Forge

- Verify that `module.json` is valid.
- Verify that `manifest` points to `releases/latest/download/module.json`.
- Verify that `download` points to `releases/latest/download/lorekeeper.zip`.
- Verify that the zip contains `module.json` at the root.

## Test ZIP

- Run `npm run package`.
- Verify that `dist/lorekeeper.zip` exists.
- Open the zip.
- Verify that `module.json` is directly at the root.
- Verify that there is no parent folder named `Lorekeeper-main/`.

## Test manifest

- Verify that `module.json` contains:
  - `manifest` pointing to `releases/latest/download/module.json`.
  - `download` pointing to `releases/latest/download/lorekeeper.zip`.

## Test release

- Create a tag named `v0.1.0`.
- Push the tag.
- Verify that GitHub Actions creates a release.
- Verify that the release contains:
  - `module.json`.
  - `lorekeeper.zip`.

## Test Foundry / Forge

- Install the module with `https://github.com/elesmondes-bremmort/Lorekeeper/releases/latest/download/module.json`.
- Verify that installation succeeds.
- Enable the module in a world.
- Verify that there is no blocking console error.

## GM Codex

- Open Lorekeeper.
- Create a clue entry.
- Add a GM title.
- Add a player title.
- Add an image by path.
- Add a GM description.
- Add a player description.
- Add tags.
- Save.
- Reopen the entry.
- Verify that data persists after F5.

## Permissions

- Create an unshared entry.
- Log in as a player.
- Verify that the entry is invisible.
- Grant that player access.
- Verify that the entry becomes visible.
- Remove access.
- Verify that the entry disappears.

## Player Display Safety

- Log in as a player.
- Verify that the player never sees:
  - GM title.
  - GM description.
  - GM notes.
  - GM folder structure.

## Images

- Link an existing image.
- Verify that the image displays.
- Verify that the file is not duplicated.
- Change the path to a missing image.
- Verify that a placeholder is displayed.

## Shared Journal

- Create a session entry in the shared journal.
- Edit the content as a player.
- Verify that another player sees the change after save.
- Verify that the GM sees the shared journal.

## Private Journal

- Create a private note as Player A.
- Verify that Player B does not see it.
- Verify that the GM can consult it.
- Verify that the note persists after F5.

## Internal Links

- Create an entry named `Zaban`.
- Create another entry containing `[[entry:ZABAN_ENTRY_ID]]`.
- Verify that the link is rendered as clickable.
- Simple click: verify that the current window navigates to Zaban.
- Ctrl-click: verify that a new pop-out window opens.
- Hover: verify that image, title, and type preview appears.

## Performance

- Verify that no request or socket is sent on every keystroke.
- Verify that search does not trigger a server call.
- Verify that comments are saved with debounce or by save button.
- Verify that images are not all loaded when the module opens.
