// Import Tone.js
import * as Tone from 'tone';

// Create a simple synth and connect it to the main output
const synth = new Tone.Synth().toDestination();

// Function to play a sound
function playSound(note, duration) {
    synth.triggerAttackRelease(note, duration);
}

const transport = Tone.getTransport(); // Issue here is that transport is deprecated
transport.bpm.value = 120; // Set the tempo to 120 BPM

// Bars:Beats:Sixteenths. This is from the official site.
// Difficult way to implement
// const part = new Tone.Part(((time, note) => {
//     // the notes given as the second element in the array
//     // will be passed in as the second argument
//     synth.triggerAttackRelease(note, "8n", time);
// }), [[0, "C3"], ["0:2", "C4"], ["0:3:2", "G4"]]);

const part = new Tone.Part((time, value) => {
    // Use the 'note' and 'duration' properties from the object
    synth.triggerAttackRelease(value.note, value.duration, time);
}, [
    [0, { note: "C4", duration: "4n" }],       // C4 for a quarter note
    ["0:1", { note: "E4", duration: "8n" }],   // E4 for an eighth note
    ["0:2", { note: "G4", duration: "16n" }],  // G4 for a sixteenth note
    ["0:3", { note: "B4", duration: "2n" }]    // B4 for a half note
]);

// part.loop = 1;       // Number of loops (1 loop in this case)
// part.loopEnd = "1m";

// Create a button to trigger the part
const buttonHard = document.createElement('button');
buttonHard.textContent = 'Play Notes';
buttonHard.onclick = async () => {
    await Tone.start(); // Ensure AudioContext is started
    transport.start(); // Start the transport (plays the part)
    part.start(0); // Schedule the part to play from 0
};

// Append the button to the document
document.body.appendChild(buttonHard);

// Example usage: Play a C4 note for one second
//playSound('C4', '1s');

// Set up a button to trigger the sound
const buttonE = document.createElement('button');
buttonE.textContent = 'Play An E';
buttonE.onclick = () => playSound('E4', '0.5s');

// const stupidSong = document.createElement('button');
// stupidSong.textContent = 'Play this stupid song';
// stupidSong.onclick = () => playSounds(stupidNotes, stupidDurations);

// document.body.appendChild(stupidSong);
document.body.appendChild(buttonE);