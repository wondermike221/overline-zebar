# Overline-Zebar

A fully-featured custom widget for [zebar](https://github.com/glzr-io/zebar).

## Features

- **Media Controls**
  - Click to **play/pause**.
  - Shift + Click to **go to the previous track**.
  - Ctrl + Click to **go to the next track**.
- **Workspace Display**
  - Click to **focus on a workspace**.
  - Scroll to **switch between workspaces**.
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

### 1. Clone the Repository

```sh
git clone https://github.com/mushfikurr/overline-zebar.git
```

### 2. Environment Variables (Optional)

You can customize behavior by creating a `.env` file in the root directory with these variables:

```sh
VITE_FLOW_LAUNCHER_PATH=
VITE_USE_AUTOTILING=
VITE_AUTOTILING_WEBSOCKET_URI=
```

- **`VITE_FLOW_LAUNCHER_PATH`**: Path to an `.exe` file executed when clicking the search icon (default: `C:\Program Files\FlowLauncher\Flow.Launcher.exe`).
- **`VITE_USE_AUTOTILING`**: Set to `true` or `false` (default: `false`).
  - If `true`, new windows will automatically switch tiling directions based on the size of the focused window.
- **`VITE_AUTOTILING_WEBSOCKET_URI`**: WebSocket URI for auto-tiling functionality (default: `ws://localhost:6123`).

**Note:** All environment variables have sensible defaults, so the `.env` file is optional.

---

## Usage with Zebar

1. Copy the project folder to the Zebar widget directory:
   ```
   C:\Users\<username>\.glzr\zebar\
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the project:
   ```sh
   npm run build
   ```
4. Locate the built widget in the `dist/` folder.
5. Configure Zebar to use `dist/index.html` in its `.json` settings file.

---

## Customization

### Fonts

Fonts are defined in [`src/styles/fonts.css`](src/styles/fonts.css).

- Use system fonts directly.
- Or, download fonts to the `public/` folder and reference them in `fonts.css`.
- [Font reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font).

### Colors

- Edit [`tailwind.config.js`](tailwind.config.js) to customize colors.

---

## Development & Hot Reload

1. Start the build process:
   ```sh
   npm run build:watch
   ```
2. Edit code — Zebar will automatically restart on save (if the widget is selected in Zebar).
3. Enable auto-save in your text editor for faster iteration.

---

### Contributions

Pull requests are welcome! If you find any issues or have feature suggestions, feel free to open an issue on GitHub.
