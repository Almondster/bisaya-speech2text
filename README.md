<h1 align="center">Bisaya Speech-to-Text</h1>

<p align="center">
  <strong>Real-time Cebuano (Bisaya) speech-to-text, powered by cloud recognition</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-54-000020?style=flat-square&logo=expo&logoColor=white" alt="Expo SDK 54" />
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React Native 0.81" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/License-Private-red?style=flat-square" alt="License" />
</p>

<p align="center">
  Speak in Bisaya and see your words transcribed in real time.<br/>
  No English translations — just native Cebuano text output, with Filipino (Tagalog) as a fallback.
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎙️ **Real-time Transcription** | Speaks Cebuano/Bisaya and see words appear live as you talk |
| 🔤 **Interim Results** | See partial text while still speaking — updates in real time |
| 📋 **Copy to Clipboard** | One-tap copy of the entire transcribed text |
| 📤 **Share** | Share your transcript to any app via the native share sheet |
| 🗑️ **Clear Transcript** | Clear all text with a confirmation modal to prevent accidents |
| 📳 **Haptic Feedback** | Tactile vibration response when tapping the mic button |
| 🎨 **Animated UI** | Pulsing record button with ripple effects while actively listening |
| 🌐 **Smart Locale Fallback** | Tries `ceb-PH` → `ceb` → `fil-PH` → `fil` — never falls back to English |
| ☁️ **Cloud Recognition** | Uses Google cloud speech services — no language pack download required |
| 🏷️ **Language Badge** | Footer shows the currently active recognition language |
| 💬 **Custom Modals** | Minimalist animated modals instead of native OS alerts |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| <img src="https://img.shields.io/badge/-React_Native-61DAFB?style=flat-square&logo=react&logoColor=black" /> | 0.81.5 | Cross-platform mobile framework (New Architecture enabled) |
| <img src="https://img.shields.io/badge/-Expo-000020?style=flat-square&logo=expo&logoColor=white" /> | SDK 54 | Build toolchain, OTA updates, managed workflow |
| <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" /> | 5.9 | Static typing with strict mode |
| <img src="https://img.shields.io/badge/-expo--speech--recognition-4630EB?style=flat-square&logo=expo&logoColor=white" /> | 3.1.0 | Native speech-to-text engine |
| <img src="https://img.shields.io/badge/-expo--clipboard-4630EB?style=flat-square&logo=expo&logoColor=white" /> | 8.0.8 | Copy text to system clipboard |
| <img src="https://img.shields.io/badge/-expo--haptics-4630EB?style=flat-square&logo=expo&logoColor=white" /> | 15.0.8 | Tactile feedback on button presses |
| <img src="https://img.shields.io/badge/-Reanimated-6B52AE?style=flat-square&logo=react&logoColor=white" /> | 4.1.1 | Smooth 60fps animations (pulse, ripple, modal transitions) |
| <img src="https://img.shields.io/badge/-EAS_Build-000020?style=flat-square&logo=expo&logoColor=white" /> | — | Cloud builds for dev, preview & production |

---

## 📋 Prerequisites

Before you begin, make sure you have:

| Requirement | Install |
|:------------|:--------|
| **Node.js** v18+ | [nodejs.org](https://nodejs.org/) |
| **Expo CLI** | Comes with `npx expo` (no global install needed) |
| **EAS CLI** | `npm install -g eas-cli` |
| **Expo Account** | Sign up at [expo.dev](https://expo.dev) |
| **Android Device** or **Emulator** | Physical device recommended for speech recognition |

> [!NOTE]
> This app uses native modules (`expo-speech-recognition`, `expo-haptics`) and **requires a development build**. It will **not** work in Expo Go.

---

## 🚀 Getting Started

### 1️⃣ Clone & Install

```bash
git clone <your-repo-url>
cd speech2text-fresh
npm install
```

### 2️⃣ Configure EAS (first time only)

```bash
npx eas login        # Log in to your Expo account
npx eas build:configure   # Set up build profiles
```

### 3️⃣ Create a Development Build

Since the app uses native modules, you need a custom dev build — not Expo Go.

**Android:**
```bash
npx eas build --profile development --platform android
```

**iOS:**
```bash
npx eas build --profile development --platform ios
```

> After the build completes, install the `.apk` (Android) or scan the QR code (iOS) to get the dev client on your device.

### 4️⃣ Start the Dev Server

```bash
npx expo start --dev-client
```

Scan the QR code with your development build to connect.

---

## 📖 How to Use the App

### Starting a Transcription

1. **Open the app** — You'll see the "Bisaya — Speech-to-Text" header, a blank transcript area, and a large microphone button at the bottom.

2. **Tap the mic button** 🎙️ — The app requests microphone permission on first use. Grant it to proceed.

3. **Start speaking in Cebuano/Bisaya** — The mic button pulses with a ripple animation to show it's listening. Words appear in the transcript area in real time as you speak.

4. **Interim text** appears in a lighter style as the recognizer processes your speech. Once a phrase is finalized, it solidifies into the transcript.

5. **Tap the mic button again** to stop listening. The interim text clears, and only the final transcript remains.

### Managing Your Transcript

| Action | How | Details |
|:-------|:----|:--------|
| **Copy** | Tap the 📋 Copy button | Copies all transcribed text to your clipboard. A "Copied!" modal confirms the action. |
| **Share** | Tap the 📤 Share button | Opens the native share sheet — send text to Messages, Notes, email, etc. |
| **Clear** | Tap the 🗑️ Clear button | A confirmation modal asks you to verify. Tap "Clear" to erase, or "Cancel" to keep your text. |

> Actions are disabled (greyed out) when there's no transcript text.

### Understanding the UI

| Element | What It Shows |
|:--------|:-------------|
| **Header** | App title: "Bisaya — Speech-to-Text" |
| **Transcript Area** | Scrollable area showing your transcribed speech. Includes a blinking cursor when listening. |
| **Word Counter** | Appears below the transcript once you have text (e.g., "42 words") |
| **Status Indicator** | Shows "Listening…" while active, or an error message if something goes wrong |
| **Mic Button** | Large circular button — tap to toggle. Pulses red while recording. |
| **Language Badge** | Footer pill showing "🇵🇭 Cebuano" or "🇵🇭 Filipino" depending on which locale is active |

---

## 🔧 How It Works (Under the Hood)

### Speech Recognition Flow

```
┌─────────────────┐
│  User taps mic  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Request mic permission │
│  (first time only)      │
└────────┬────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│  Resolve best locale from priority list  │
│  ceb-PH → ceb → fil-PH → fil           │
└────────┬─────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Start ExpoSpeechRecognition with:   │
│  • lang: resolved locale             │
│  • interimResults: true              │
│  • continuous: true                  │
│  • requiresOnDeviceRecognition: false│
│  • addsPunctuation: true             │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────┐     ┌───────────────────┐
│  Audio sent to Google    │────▶│  Cloud processes   │
│  Cloud Speech Services   │     │  Cebuano speech    │
└──────────────────────────┘     └────────┬──────────┘
                                          │
                               ┌──────────▼──────────┐
                               │  Interim results     │
                               │  streamed back       │
                               └──────────┬──────────┘
                                          │
                               ┌──────────▼──────────┐
                               │  Final transcript    │
                               │  appended to state   │
                               └─────────────────────┘
```

### Locale Priority System

The app **never** falls back to English. It resolves the recognition language using this priority:

| Priority | Locale | Language |
|:---------|:-------|:---------|
| 1st | `ceb-PH` | Cebuano (Philippines) |
| 2nd | `ceb` | Cebuano (generic) |
| 3rd | `fil-PH` | Filipino / Tagalog (Philippines) |
| 4th | `fil` | Filipino / Tagalog (generic) |

On startup, the app queries the device's supported locales and picks the highest-priority match. If none are found on-device, it sends `ceb-PH` to Google's cloud service, which handles it server-side.

### Key Architecture Decisions

- **Cloud recognition** (`requiresOnDeviceRecognition: false`) — Cebuano language packs aren't available on most Android devices, so the app relies on Google's cloud speech API instead.
- **Custom hook pattern** — All speech logic lives in `useSpeechRecognition()`, keeping the UI components pure and testable.
- **No English fallback** — The locale priority list intentionally excludes `en-*` to guarantee Cebuano/Filipino output.

---

## 📁 Project Structure

```
speech2text-fresh/
├── 📄 App.tsx                          # Root component — layout, state wiring
├── 📄 index.ts                         # App entry point (registerRootComponent)
├── 📄 app.json                         # Expo configuration (name, icons, permissions)
├── 📄 eas.json                         # EAS Build profiles (dev, preview, production)
├── 📄 package.json                     # Dependencies & scripts
├── 📄 tsconfig.json                    # TypeScript config (strict mode)
├── 📂 assets/                          # App icon, splash screen, adaptive icon
└── 📂 src/
    ├── 📂 components/
    │   ├── 📄 ActionBar.tsx             # Copy, Share, Clear action buttons
    │   ├── 📄 MinimalModal.tsx          # Custom animated modal component
    │   ├── 📄 RecordButton.tsx          # Animated microphone button (pulse + ripple)
    │   ├── 📄 StatusIndicator.tsx       # Listening / error / ready status display
    │   └── 📄 TranscriptDisplay.tsx     # Scrollable transcript with cursor animation
    ├── 📂 constants/
    │   └── 📄 theme.ts                  # Design tokens: colors, spacing, typography
    └── 📂 hooks/
        └── 📄 useSpeechRecognition.ts   # Core speech recognition hook & locale logic
```

---

## 🏗️ Building for Distribution

The project uses [EAS Build](https://docs.expo.dev/build/introduction/) with three profiles:

| Profile | Command | Use Case |
|:--------|:--------|:---------|
| **Development** | `npx eas build --profile development --platform android` | Includes dev tools & Expo dev client for debugging |
| **Preview** | `npx eas build --profile preview --platform android` | Production-like build for internal testing |
| **Production** | `npx eas build --profile production --platform android` | Store-ready build with auto-incrementing version |

> Replace `android` with `ios` for iOS builds (requires Apple Developer credentials).

### Building for iOS

```bash
npx eas build --profile preview --platform ios
```

You'll need:
- An Apple Developer account ($99/year)
- A provisioning profile (EAS handles this automatically on first build)

---

## 🔐 Permissions

| Platform | Permission | Why |
|:---------|:-----------|:----|
| 🤖 Android | `RECORD_AUDIO` | Access the microphone to capture speech |
| 🍎 iOS | `NSMicrophoneUsageDescription` | "Bisaya Voice needs access to your microphone to convert your speech into text." |
| 🍎 iOS | `NSSpeechRecognitionUsageDescription` | "Bisaya Voice uses speech recognition to transcribe your speech into text." |

---

## 🐛 Troubleshooting

| Problem | Solution |
|:--------|:---------|
| App shows "Microphone access was denied" | Go to device Settings → Apps → Bisaya Voice → Permissions → enable Microphone |
| Transcript comes out in English | Check if your device has an internet connection — cloud recognition requires it for Cebuano |
| "Network error" during transcription | Ensure you have a stable internet connection (cloud speech requires it) |
| App crashes on launch | Make sure you're using a development build, not Expo Go |
| No sound / mic not working | Test your microphone in another app first; restart the app if needed |
| Language badge shows "Filipino" | Cebuano wasn't available in supported locales — Filipino is the automatic fallback |

---

## 📜 Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS simulator
npm run web        # Start web version (limited speech support)
```

---

## 📄 License

This is a private project. All rights reserved.

---

<p align="center">
  <sub>Built with ❤️ for the Bisaya-speaking community</sub>
</p>
