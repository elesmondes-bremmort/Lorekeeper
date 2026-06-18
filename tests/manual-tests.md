# Manual Tests

## Installation

- Install the module from a local folder.
- Verify that Foundry detects the module.
- Enable the module in a world.
- Verify that no console error appears on load.

## Translations

- Verify that the interface no longer displays raw `LOREKEEPER.*` keys.
- Test the interface in French.
- Test the interface in English if possible.

## UI

- Verify that the interface is more readable.
- Verify the empty states.
- Verify the Codex and Journal tabs.

## Launcher

- Verify that the floating Lorekeeper button appears.
- Verify that it is above the Sound System launcher.
- Verify that the book icon is visible.
- Click it and verify that Lorekeeper opens.
- Click it again and verify that no duplicate window is created.
- Verify that the existing window is brought to the front.

## Window

- Verify that the window is movable.
- Verify that the window is resizable.
- Verify that the window is a pop-out application.

## Window Persistence

- Move Lorekeeper.
- Resize Lorekeeper.
- Close Lorekeeper.
- Reopen Lorekeeper.
- Verify that size and position are preserved.

## Refresh Persistence

- Move Lorekeeper.
- Press F5.
- Open Lorekeeper.
- Verify that the position is preserved.

## Second Screen

- Move Lorekeeper to a secondary screen.
- Press F5.
- Open Lorekeeper.
- Verify that it returns exactly to its last position.

## Multi-User Window State

- Configure the window position as GM.
- Configure a different window position as a player.
- Verify that each user keeps their own window settings.

## Integrated Window Restore

- Open Lorekeeper.
- Move the window.
- Resize the window.
- Refresh Foundry.
- Verify that Lorekeeper reopens if it was open.
- Verify that position and size are restored without recentering.

## Detached Browser Window

- Click `Open in detached window`.
- Verify that a real browser window opens.
- Move that window to a secondary screen.
- Verify that the Codex is readable.
- Verify that the Journal is editable.
- Save a note.
- Verify that the data is visible in the integrated window.
- Close the detached window.
- Verify that no blocking console error appears.

## Popup Blocked

- Test with popups blocked.
- Verify that a clear notification appears.

## Detached Performance

- Verify that there is no server call on every keystroke.
- Verify that there is no polling loop.
- Verify that saves are debounced or explicitly triggered.

## Manifest / Forge

- Verify that `module.json` is valid.
- Verify that `manifest` points to `raw.githubusercontent.com/elesmondes-bremmort/Lorekeeper/main/module.json`.
- Verify that `download` points to `archive/refs/heads/main.zip`.
- Verify that release URLs are not used until release assets exist.

## Test ZIP

- Run `npm run package`.
- Verify that `dist/lorekeeper.zip` exists.
- Open the zip.
- Verify that `module.json` is directly at the root.
- Verify that there is no parent folder named `Lorekeeper-main/`.

## Test manifest

- Verify that `module.json` contains:
  - `manifest` pointing to `raw.githubusercontent.com/elesmondes-bremmort/Lorekeeper/main/module.json`.
  - `download` pointing to `archive/refs/heads/main.zip`.

## Test release

- Create a tag named `v0.1.0`.
- Push the tag.
- Verify that GitHub Actions creates a release.
- Verify that the release contains:
  - `module.json`.
  - `lorekeeper.zip`.

## Test Foundry / Forge

- Install the module with `https://raw.githubusercontent.com/elesmondes-bremmort/Lorekeeper/main/module.json`.
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
