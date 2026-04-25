# Video Comparator

Ein professionelles Standalone-Tool zum direkten Vergleich von zwei Video-Dateien. Ideal für Video-Editoren, Forscher oder zum Vergleichen von Render-Ergebnissen.

## Features
- **Side-by-Side Vergleich:** Zwei Videos parallel in einem Fenster.
- **Synchronisierte Wiedergabe:** Wenn du Video 1 startest oder stoppst, folgt Video 2 automatisch.
- **Frame-genaues Scrubbing:** Die Timeline steuert beide Videos absolut synchron.
- **Speed Control:** Verlangsame beide Videos (0.25x, 0.5x), um Details besser zu erkennen.
- **Standalone:** Läuft als AppImage unter Linux (Dank Electron).

## Installation (Entwicklung)
1. Repository klonen
2. `npm install`
3. `npm run dev` für die Web-Vorschau
4. `npm start` um die Electron-App zu starten

## Build (Standalone App erstellen)
Um ein AppImage für Linux zu erstellen:
```bash
npm run build:linux
```
Die fertige Datei liegt danach im Ordner `dist-app/`.

## Technologie
- **Frontend:** React + TypeScript + Vite
- **Desktop-Wrapper:** Electron
- **Styling:** CSS3 (Responsive Grid)

## Lizenz
MIT
