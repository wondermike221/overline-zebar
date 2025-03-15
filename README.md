# overline-zebar
A fully-featured custom widget for [zebar](https://github.com/glzr-io/zebar).

Features:
- Media overview & controls:
  - Play/pause:
    - Click to play/pause or:
      - Shift + click to go to previous track.
      - Ctrl + click to go to next track.
- Workspace display:
  - Click to focus workspace or:
    - Scroll to switch workspace.
- Search and tiling direction buttons.
- Volume control:
  - Click to open slider or:
    - Scroll to change volume.
    - Shift + click to toggle mute.
- Current window display:
  - Click to reveal window controls, hovering will show what the control does.

## Setup for use
- Clone the repostiory `git clone https://github.com/msy-dev/overline-zebar.git`
- Create an .env file in the root folder with the following content:

```
VITE_FLOW_LAUNCHER_PATH=
VITE_USE_AUTOTILING=
```

- `VITE_FLOW_LAUNCHER_PATH` can be any .exe file to execute when clicking the search icon on the top left, it does not have to be Flow Launcher.
- `VITE_USE_AUTOTILING` can be set to true or false, if set to true, new windows will automatically switch between tiling directions based on the tiling size of the focused window.

### Using with zebar

- Copy the folder to the zebar widget folder i.e. `(C:\Users\<username>\.glzr\zebar\)`
- Run `npm install`
- Run `npm run build` (exit it if you are not making live changes)
- Usable widget will be in `dist/` folder
- Point your .json to the `dist/index.html` file (the default should be ok)

## Changing colours

- Edit tailwind.config.js

## Change font

Fonts are defined in `src/styles/fonts.css`, you can use system fonts directly or download the fonts to the public/ folder, referencing them in the `src/styles/fonts.css` file.
[fonts reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font)

## Hot reload for development

- Run npm run build
- Edit code and it will restart zebar on code save (make sure the widget is selected in zebar)
- Enable auto-save on text editor to help with this
