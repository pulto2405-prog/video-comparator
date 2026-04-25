# Video-Comparator

A professional, standalone side-by-side video comparison tool. Built with React, TypeScript, and Electron for high-performance video analysis.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Linux%20|%20Windows-lightgrey.svg)

## Overview

**Video-Comparator** is designed for editors, researchers, and quality assurance professionals who need to compare two video files with frame-accurate precision. Whether you are comparing render settings, different codecs, or original vs. edited footage, this tool provides the synchronization you need.

## Key Features

- **Side-by-Side Analysis:** View two videos simultaneously in a responsive grid.
- **Synchronized Playback:** Control both videos with a single set of controls. When the Master (Video 1) plays, the Slave (Video 2) follows.
- **Frame-Accurate Seeking:** Scrub through the timeline to find specific differences between frames.
- **Independent Volume Control:** Adjust or mute audio for each video separately to compare sound quality.
- **Playback Speed Control:** Slow down footage (0.25x, 0.5x) to catch details that are missed at normal speed.
- **Cross-Platform Standalone:** Packaged as an AppImage for Linux (x64 and ARM64) and executable for Windows.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (installed with Node.js)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/pulto2405-prog/video-comparator.git
   cd video-comparator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Run in Development Mode
To start the application locally:
```bash
npm start
```

### Build Standalone Application
To generate a portable AppImage for Linux:

**For x64 (Standard PCs):**
```bash
npm run build:linux
```

**For ARM64 (Raspberry Pi, Pine64, etc.):**
```bash
npm run build:arm64
```

The artifacts will be generated in the `dist-app/` directory.

## Technical Stack

- **Frontend:** React 19, TypeScript 6, Vite 8
- **Desktop Wrapper:** Electron 30
- **Packaging:** Electron-Builder

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---
Developed with ❤️ by Pulto
