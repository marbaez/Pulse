# Pulso

Pulso is a web app for music practice. The metronome is the first tool. Open it from the launcher and select **Pulso** in the top bar to return home.

## Features

- Set the metronome to 30–300 BPM with the number field, slider, or tap tempo.
- Choose a time signature and subdivisions such as eighth notes, triplets, and sixteenth notes.
- Practise downstrokes and upstrokes with a click, accent, or rest on each step. Save a custom pattern per time signature and subdivision in your browser.
- Choose an optional three- or four-beat count-in. The session timer starts after the count-in and runs for up to five minutes in 15-second steps. Set it to zero for an unlimited session.
- Choose one of three click sounds, adjust the volume, or enable drum backing.
- Switch between Spanish and English with **ES / EN** in the top bar.

## Run locally

Open [index.html](index.html) in a modern browser. To serve the app at a stable local URL, run this command from the repository root with Python 3.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Visit `http://127.0.0.1:8000/`, open **Metronome**, and select **Start** to enable audio. The app uses `localStorage` for patterns and language preferences when the browser allows it. Links between screens also carry `?lang=en` or `?lang=es`.

## Technology and structure

Pulso is a static app built with HTML, CSS, and plain JavaScript. It requires no application server, package installation, or build step. DM Sans and Geist load from Google Fonts, with system fonts as fallbacks.

| File | Purpose |
| --- | --- |
| [index.html](index.html) | Launcher and app grid for current and future tools. |
| [metronome.html](metronome.html) | Metronome interface, timer, pattern editor, and audio engine. |
| [navigation.css](navigation.css) | Shared styles for the top bar and language selector. |
| [i18n.js](i18n.js) | English and Spanish interface text, language switching, and navigation preferences. |

The metronome uses the Web Audio API clock to schedule clicks and synthesize the kick, snare, and hi-hat. Playback highlights in the compact pattern and editor follow the same clock.

To add a tool, create its page, add a card to the launcher, and reuse the top bar and language selector. Add its English and Spanish interface strings to `i18n.js`.

## Manual checks

1. Open the metronome from the launcher and switch between **ES** and **EN**. Select **Pulso** and check that the chosen language carries over.
2. Set a tempo, time signature, and subdivision. Save a custom pattern with clicks, accents, and rests. Reload the page, choose the same time signature and subdivision, and select **Custom** to recover it.
3. Start a 15-second session with a count-in. Check that the timer starts after the count-in, that the highlights follow the beat, and that playback stops at zero.
4. Try **Unlimited** mode, drum backing, and the volume control.

## Push to GitHub

Create an empty GitHub repository and copy its URL. Replace `REPOSITORY_URL` below and run these commands from the repository root.

```sh
git remote add origin REPOSITORY_URL
git push -u origin main
git push origin v0.1.0
```
