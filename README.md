# 🎵 Cute Music Player

A cute and simple MP3 player built with Electron, React, and Vite. Perfect for gifting to your partner or friends! 💝

<img width="765" height="813" alt="Cute Music Player Interface" src="https://github.com/user-attachments/assets/3991d528-291c-417f-9a71-541e17ce593d" />

## ✨ Features

- 🎶 Play local MP3 files
- 📺 Built-in YouTube to MP3 converter
- 💖 Cute and minimal interface
- 🎨 Clean, modern design
- 🖥️ Cross-platform desktop application (Electron)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd cute_music_player
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the application in development mode:
```bash
npm run dev
```

### Building

To build the Windows application:
```bash
npm run electron:build
```

The built application will be available in the `electron-dist` folder in the root of the project.

## 🎵 YouTube to MP3 Converter Setup

The app includes a built-in YouTube to MP3 converter. To use this feature:

1. Get your API keys from [RapidAPI - YouTube MP3](https://rapidapi.com/ytjar/api/youtube-mp36)
2. Open [src/utility.js](src/utility.js)
3. Replace `API_KEY` and `HOSTING_KEY` with your own credentials

**Credits:** Special thanks to [ytjar](https://rapidapi.com/ytjar) for creating the YouTube MP3 API.

## 📁 Project Structure

```
cute_music_player/
├── electron/          # Electron main process files
│   ├── main.js       # Main Electron process
│   └── preload.js    # Preload scripts
├── src/              # React source files
│   ├── components/   # React components
│   ├── assets/       # Images and static files
│   └── App.jsx       # Main app component
└── index.html        # HTML entry point
```

## 🎨 Components

- [`SongSelection.jsx`](src/components/SongSelection.jsx) - Song selection and playlist management
- [`ManualPlay.jsx`](src/components/ManualPlay.jsx) - Manual playback controls
- [`UploadSong.jsx`](src/components/UploadSong.jsx) - Upload local MP3 files
- [`Ytb2MP3.jsx`](src/components/Ytb2MP3.jsx) - YouTube to MP3 converter interface
- [`PauseButton.jsx`](src/components/PauseButton.jsx) - Playback control button
- [`CloseButton.jsx`](src/components/CloseButton.jsx) - Window close button
- [`DeleteButton.jsx`](src/components/DeleteButton.jsx) - Delete song button

## 💡 Inspiration

This project was inspired by a TikTok video showing a cute gift idea for a girlfriend, and later inspired the more professional [Retrosica](https://github.com/retrosica) project.

## 🛠️ Built With

- [Electron](https://www.electronjs.org/) - Desktop application framework
- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool and dev server

## 📝 License

This project is open source and available under the MIT License.

## 💖 Made with Love

Perfect for creating a personalized music player gift! 🎁
