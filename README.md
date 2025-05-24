# overline-zebar

A fully-featured custom widget for [zebar](https://github.com/glzr-io/zebar).

![Screenshot of overline-zebar in use with GlazeWM, Zen Browser underneath](https://github.com/user-attachments/assets/333feb9c-225d-4be9-84db-cbdc7010e698)

## Features

- **Media Controls**
  - Click to **play/pause**.
  - Shift + Click to **go to the previous track**.
  - Ctrl + Click to **go to the next track**.
- **Workspace Display**
  - Click to **focus on a workspace**.
  - Scroll to **switch between workspaces**.
- **System Tray**
  - Interact with left + right click
- **Search & Tiling Direction Controls**
- **Volume Control**
  - Click to **open volume slider**.
  - Scroll to **adjust volume**.
  - Shift + Click to **toggle mute**.
- **Current Window Display**
  - Click to **reveal window controls**.
  - Hover over controls to see their function.

---

## Installation

**For releases older than Zebar v3, please refer to [this branch](https://github.com/mushfikurr/overline-zebar/tree/old/zebar-v2).**

Please note if you have local branches that are from the older branch, the layout has changed:
```
main -> old/zebar-v2
migrate/zebar-v3 -> main
```

### Option 1: The Zebar Marketplace
  1. Right-click the Zebar tray icon, and click Browse Widgets.
  2. Search for "overline-zebar"
  3. Click "Install"
  4. Continue to [configuration](#Configuration) section

### Option 2: Build from Source

Choose this option if you want to:

- Customize the widget's functionality beyond what's possible with the pre-built version
- Modify the source code to add new features or change existing ones
- Contribute to the development of overline-zebar
- Use the latest development version with unreleased features

Prerequisites:

- [Node.js](https://nodejs.org/) (v16 or newer)
- [Git](https://git-scm.com/)

Detailed steps:

1. Clone the repository to your local machine, in the .glzr directory (C:/Users/<USER>/.glzr/zebar for Windows):

```sh
   git clone https://github.com/mushfikurr/overline-zebar.git
   cd overline-zebar
```

2. Install all required dependencies:

```sh
   npm install
```

   This will install React, Vite, TailwindCSS, and all other dependencies needed for development.

3. See the [Configuration](#configuration) section below for details on how to customize the widget by editing the `public/config.json` file.

4. Build the project for production:
```sh
   npm run build
```
   This creates a `dist` folder containing the compiled widget ready for use.

---
## Configuration

You can customize various aspects of overline-zebar by editing the `config.json` file. This file allows you to change settings without modifying the source code.

### General Configuration

For general Zebar widget configuration:
- Right click Zebar tray icon
- Find Widget Packs > overline-zebar > Pack Settings
RRECOMMENDED**: Adapt the width of the Zebar to your gap & screen resolution. 

### overline-zebar Configuration

- **For pre-built version users**: Navigate to:

```
C:\Users\<username>\.glzr\zebar\overline-zebar\dist\public\
```

- **For developers building from source**: Navigate to:
```
  public/
```

#### Configuration Values

```json
"FLOW_LAUNCHER_PATH": "C:\\Users\\msy\\AppData\\Local\\FlowLauncher\\Flow.Launcher.exe",
"USE_AUTOTILING": true,
"AUTOTILING_WEBSOCKET_URI": "ws://localhost:6123",
"MEDIA_MAX_WIDTH": "300"
```

`FLOW_LAUNCHER_PATH` - `string`: .exe path for the "search button" to open. This can be for any launcher (i.e. Powertoys Run)
`USE_AUTOTILING` - `boolean`: Defaults to `true`. This changes the tiling direction every time a window reaches half of it's size.
`AUTOTILING_WEBSOCKET_URI` - `string`: Defaults to `ws://localhost:6123`. This is where Zebar listens for events from GlazeWM.
`MEDIA_MAX_WIDTH` - `string`: Defaults to `400`. This is the maximum width of the Media widget (the currently playing widget) measured in pixels. Recommended to be >100.

### Fonts (Development Only)

Fonts are defined in [`src/styles/fonts.css`](src/styles/fonts.css).

- Use system fonts directly.
- Or, download fonts to the `public/` folder and reference them in `fonts.css`.
- By default it targets monospaced fonts. This can be changed in `App.tsx`.
- [Font reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font).


### Colors (Development Only)

- Edit [`tailwind.config.js`](tailwind.config.js) and [`src/styles/theme.css`] to customize colors.

---

## See Live Changes to Zebar (Development Only)

Follow the steps to build the project from source.

1. Start the build process (with hot reloading):
   ```sh
   npm run build:watch
   ```
2. Edit code — Zebar will automatically restart on save (if the widget is selected in Zebar).
3. Enable auto-save in your text editor for faster iteration.

---

### Contributions

Pull requests are welcome! If you find any issues or have feature suggestions, feel free to open an issue on GitHub.

