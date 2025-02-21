// A more advanced Tone.js test
// Make sure Tone is installed from npm (?)
import * as Tone from 'tone';

// Create a synth and connect it to the main output
const synth = new Tone.Synth().toDestination();

// Function to create and play a Tone.Part
function playSequence(sequence) {
    // Convert the input sequence into a format that Tone.Part understands
    const partData = sequence.map(([time, note, duration]) => [time, { note, duration }]);

    // Create a Tone.Part
    const part = new Tone.Part((time, value) => {
        synth.triggerAttackRelease(value.note, value.duration, time);
    }, partData);

    // Configure the part
    // part.loop = 1;       // Number of loops (optional)
    // part.loopEnd = "1m"; // Duration of the loop (optional)

    // Start the transport and the part
    const transport = Tone.getTransport();
    // const context = Tone.getContext();
    // if (context.state !== "running") {
    //     context.resume();
    // }
    transport.bpm.value = tempoSlider.value; // Set the tempo
    part.start(0);
    transport.start();
}

// Example sequence: [time, note, duration]
const exampleSequence = [
    [0, "C4", "4n"],  // Play C4 for a quarter note at time 0
    ["0:1", "E4", "8n"],  // Play E4 for an eighth note at time 0:1
    ["0:2", "G4", "16n"], // Play G4 for a sixteenth note at time 0:2
    ["0:3", "B4", "2n"]   // Play B4 for a half note at time 0:3
];

// Create a button to trigger the sequence
const playButton = document.createElement('button');
playButton.textContent = 'Play Music Dumbo';
playButton.onclick = async () => {
    await Tone.start(); // Ensure AudioContext is started
    playSequence(exampleSequence);
};

// Append the button to the document
document.body.appendChild(playButton);

// Pause button
const pauseButton = document.createElement('button');
pauseButton.textContent = 'Pause Music';
pauseButton.onclick = () => {
    Tone.getTransport().pause();
    console.log('State is:', Tone.getContext().state);
}

document.body.appendChild(pauseButton);

const resumeButton = document.createElement('button');
resumeButton.textContent = 'Resume Music';
resumeButton.onclick = () => {
    Tone.getTransport().start();
    console.log('State is:', Tone.getContext().state);
}

document.body.appendChild(resumeButton);

// Tempo slider
const tempoSlider = document.createElement('input');
const currentTempo = document.createElement('span');
tempoSlider.type = 'range';
tempoSlider.min = 60;
tempoSlider.max = 180;
tempoSlider.value = 120;
currentTempo.textContent = tempoSlider.value;
tempoSlider.oninput = () => {
    Tone.getTransport().bpm.value = parseInt(tempoSlider.value);
    currentTempo.textContent = Tone.getTransport().bpm.value;
}
document.body.appendChild(tempoSlider);
document.body.appendChild(currentTempo);

