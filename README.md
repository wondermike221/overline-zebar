# overline-zebar

A fully-featured custom widget for [zebar](https://github.com/glzr-io/zebar).

![Screenshot of overline-zebar in use with GlazeWM, with Zen Browser underneath](https://github.com/user-attachments/assets/333feb9c-225d-4be9-84db-cbdc7010e698)

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

### Option 1: Download the Pre-built Release

This is the easiest and fastest way to get overline-zebar up and running. Choose this option if you want to use the widget with its default configuration.

_This uses Flow Launcher as the default launcher application. See the [Configuration](#configuration) section below to learn how to change the launcher application._

1. Go to the [Releases page](https://github.com/mushfikurr/overline-zebar/releases) on GitHub
2. Download the latest `overline-zebar.zip` file
3. Extract the zip file to your Zebar widget directory:
   ```
   C:\Users\<username>\.glzr\zebar\
   ```
   This should create a folder named `overline-zebar` in your Zebar widget directory.
4. Enable the widget by expanding the "Widget configs" option, selecting "overline-zebar > default", and clicking "Enable". You can also enable the widget to startup the same way.
5. Position the widget dimensions and position by right clicking the Zebar system tray icon and selecting "Open Settings".
6. Save your configuration by clicking "Save" in the Zebar settings window

## Configuration

You can customize various aspects of overline-zebar by editing the `config.json` file. This file allows you to change settings without modifying the source code.

### Configuration File Location

- **For pre-built version users**: Navigate to:

  ```
  C:\Users\<username>\.glzr\zebar\overline-zebar\dist\public\
  ```

- **For developers building from source**: Navigate to:
  ```
  public/
  ```

### Creating or Editing the Configuration File

1. The pre-built version includes a `config.json` file, while the source code includes a `release-config.json` file which serves as a template for the built version. If you're building from source, modify `config.json` in the `public/` directory.

2. Add your desired configuration options to the file. Here's an example with all available options:

   ```json
   {
     "FLOW_LAUNCHER_PATH": "C:\\Program Files\\YourLauncher\\YourLauncher.exe",
     "USE_AUTOTILING": true,
     "AUTOTILING_WEBSOCKET_URI": "ws://localhost:6123"
   }
   ```

   Make sure to use double backslashes (`\\`) in any file paths.

3. Save the file and restart Zebar for the changes to take effect

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

1. Clone the repository to your local machine:

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

### Configuration Options

These configuration options allow you to customize key aspects of the widget's functionality without modifying the source code directly. 

- **`FLOW_LAUNCHER_PATH`**: Path to an `.exe` file executed when clicking the search icon

  - Default: `C:\Users\username\AppData\Local\FlowLauncher\Flow.Launcher.exe`
  - Example custom value: `C:\Program Files\Launchers\MyCustomLauncher.exe`
  - Set this if you use a different launcher application or if Flow Launcher is installed in a non-standard location

- **`USE_AUTOTILING`**: Controls the auto-tiling functionality

  - Default: `false`
  - Set to `true` to enable automatic tiling direction switching
  - When enabled, new windows will automatically switch tiling directions based on the size of the focused window
  - This creates a more efficient use of screen space for different window sizes

- **`AUTOTILING_WEBSOCKET_URI`**: WebSocket URI for auto-tiling functionality
  - Default: `ws://localhost:6123`
  - Change this if you're running the WebSocket server on a different port or machine
  - Only relevant if `USE_AUTOTILING` is set to `true`

**Note:** All configuration options have sensible defaults. You only need to modify the `config.json` file if you want to override these defaults.

---

## Customization (Option 2 ONLY)

Customisation requires building the widget from source. If you're using the pre-built release, you can skip this section.

### Fonts

Fonts are defined in [`src/styles/fonts.css`](src/styles/fonts.css).

- Use system fonts directly.
- Or, download fonts to the `public/` folder and reference them in `fonts.css`.
- [Font reference](https://developer.mozilla.org/en-US/docs/Web/CSS/font).

### Colors

- Edit [`tailwind.config.js`](tailwind.config.js) to customize colors.

---

## Development & Hot Reload

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
