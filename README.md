# 🎵 Cute Music Player

A cute and simple MP3 player built with Electron, React, and Vite. Perfect for gifting to your partner or friends! 💝

![Cute Music Player Interface](https://github.com/user-attachments/assets/3991d528-291c-417f-9a71-541e17ce593d)

## ✨ Features

- 🎶 Play local MP3 files
- 📺 Built-in YouTube to MP3 converter
- 💖 Cute and minimal interface
- 🎨 Clean, modern design
- 🔁 Sequential playback mode
- ⏯️ Full playback controls
- 🖥️ Cross-platform desktop application (Electron)

## 📸 Screenshots

![Main Interface](https://github.com/user-attachments/assets/409a7789-9279-430e-aa29-f4575c5193e5)

![Player Controls](https://github.com/user-attachments/assets/19355839-479f-49e1-8222-71b7571b0301)

![Song Selection](https://github.com/user-attachments/assets/07a8b170-2fbe-4dc8-9758-4162491d64da)

![Upload Feature](https://github.com/user-attachments/assets/6da0586d-4ede-4f8a-8f74-410aeba069c3)

![YouTube Converter](https://github.com/user-attachments/assets/e4a8621b-e29b-451a-befb-32f5381c5359)

![Delete Songs](https://github.com/user-attachments/assets/ad55e2c4-7852-4427-9f4d-fd71a1caa727)

![Settings](https://github.com/user-attachments/assets/60c41b1f-a7f7-490e-81e5-441ddb7e0191)

![Additional Features](https://github.com/user-attachments/assets/6f3a9201-2461-47cc-8e7d-69369d2b16ce)

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
2. Open `src/utility.js` (or the appropriate file in the build folder)
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
├── electron-dist/    # Built application output
└── index.html        # HTML entry point
```

## 🎨 Components

- `SongSelection.jsx` - Song selection and playlist management
- `ManualPlay.jsx` - Manual playback controls
- `UploadSong.jsx` - Upload local MP3 files
- `Ytb2MP3.jsx` - YouTube to MP3 converter interface
- `PauseButton.jsx` - Playback control button
- `CloseButton.jsx` - Window close button
- `DeleteButton.jsx` - Delete song button

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
