// Run ONCE on your own computer to create story.mp3 for the website.
//   1. npm install
//   2. set your key:   Windows (PowerShell):  $env:ELEVENLABS_API_KEY="your_key"
//                      Mac/Linux:             export ELEVENLABS_API_KEY="your_key"
//   3. node generate-audio.mjs
// Never put your API key inside index.html — the site is public.

import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { createWriteStream } from "node:fs";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const elevenlabs = new ElevenLabsClient(); // reads ELEVENLABS_API_KEY

const audio = await elevenlabs.textToSpeech.convert("NOpBlnGInO9m6vDvFkFC", {
  text: "In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the “burn it all down” kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.",
  modelId: "eleven_v4",
  languageCode: "en",
  outputFormat: "mp3_44100_128",
});

// The SDK returns a web stream — save it as story.mp3
await pipeline(Readable.fromWeb(audio), createWriteStream("story.mp3"));
console.log("Saved story.mp3 ✔");
