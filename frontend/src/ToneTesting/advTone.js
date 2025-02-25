// A more advanced Tone.js test
// Make sure Tone is installed from npm (?)
import * as Tone from 'tone';

// Create a synth and connect it to the main output
const synth = new Tone.Synth().toDestination();
// const clock = new Tone.Clock(time => {
//     console.log(time);
// }, 1);

function autoRestartTone() {
    if (Tone.getContext().state !== "running") {
        Tone.start().then(() => console.log("Tone.js restarted automatically!"));
    }
}

function getDuration(timeString, duration, tempo) {
    // Split the string by colon
    const parts = timeString.split(':');

    // Parse measures, beats, and sixteenths
    var measures = parseInt(parts[0]); // im not a jshead
    var beats = (parts.length >= 2) ? parseInt(parts[1]) : 0;
    var sixteenths = parts.length === 3 ? parseInt(parts[2]) : 0;

    // For now, no measure overflow.
    // Shouldn't matter, as we are just calculating total time.
    if (duration === "1n") {
        beats += 4;
    } else if (duration === "2n") {
        beats += 2;
    } else if (duration === "4n") {
        beats += 1;
    } else if (duration === "8n") {
        sixteenths += 2;
    } else if (duration === "16n") {
        sixteenths += 1;
    }

    // Currently, time signature is 4 to a measure.
    const total = measures * 4 + beats + sixteenths / 4;
    //console.log(total);
    // Calculate the total time in seconds
    const seconds = total * 60 / tempo;
    //console.log(seconds);

    return Math.ceil(seconds);
}

// Listen for state changes and restart if needed
Tone.getContext().rawContext.onstatechange = () => {
    if (Tone.getContext().rawContext.state === "suspended") {
        autoRestartTone();
    }
};

// Function to create and play a Tone.Part
// Most likely, issue is to change this function to be added to a button instead of calling functions
// function playSequence(sequence) {
//     // Convert the input sequence into a format that Tone.Part understands
//     const partData = sequence.map(([time, note, duration]) => [time, { note, duration }]);

//     // Create a Tone.Part
//     const part = new Tone.Part((time, value) => {
//         synth.triggerAttackRelease(value.note, value.duration, time);

//         if (value.isLast) {
//             part.stop();
//             console.log("Part stopped after last note.");
//         }
//     }, partData);

//     // Configure the part
//     // part.loop = 1;       // Number of loops (optional)
//     // part.loopEnd = "1m"; // Duration of the loop (optional)

//     // Start the transport and the part
//     const transport = Tone.getTransport();
//     // const context = Tone.getContext();
//     // if (context.state !== "running") {
//     //     context.resume();
//     // }
//     transport.bpm.value = tempoSlider.value; // Set the tempo
//     part.start(0);
//     transport.start();
//     //clock.start();
// }

// Example sequence: [time, note, duration]
const sequence = [
    [0, "C4", "4n"],      // Play C4 for a quarter note at time 0
    ["0:1", "E4", "8n"],  // Play E4 for an eighth note at time 0:1
    ["0:2", "G4", "16n"], // Play G4 for a sixteenth note at time 0:2
    ["0:3", "B4", "2n"],  // Play B4 for a half note at time 0:3
    ["1:3", "C3", "1n"]   // Play C3 for a whole note at time 1:3
];

// CURRENTLY, TIME SIGNATURE IS 4/4. This is gonna be a pain to change later.
function stopTime (sequence){
    let lastNote = sequence[sequence.length - 1]; // We need 0 and 2.

    const parts = lastNote[0].split(':');
    const duration = lastNote[2];

    const sixteenthsPerBeat = 4;
    const beatsPerMeasure = 4;

    // Parse measures, beats, and sixteenths
    var measures = parseInt(parts[0]);
    var beats = (parts.length >= 2) ? parseInt(parts[1]) : 0;
    var sixteenths = parts.length === 3 ? parseInt(parts[2]) : 0;

    let durationInSixteenths = {
        "1n": 4 * beatsPerMeasure,
        "2n": 2 * beatsPerMeasure,
        "4n": 4,
        "8n": 2,
        "16n": 1
    }[duration];
    // 1:3:0 -> 1:3:19 -> 1:7:3
    sixteenths += durationInSixteenths;
    while (sixteenths >= sixteenthsPerBeat) {
        sixteenths -= sixteenthsPerBeat;
        beats += 1;
    }
    while (beats >= beatsPerMeasure) {
        beats -= beatsPerMeasure;
        measures += 1;
    }

    const timeToStop = `${measures}:${beats}:${sixteenths}`;
    return timeToStop;
}

// Create a button to trigger the sequence
// const playButton = document.createElement('button');
// playButton.textContent = 'Play Music Dumbo';
// playButton.onclick = async () => {
//     await Tone.start(); // Ensure AudioContext is started
//     playSequence(exampleSequence);
// };


const playButton = document.createElement('button');
playButton.textContent = 'Play Music Dumbo';
playButton.onclick = async () => {

    Tone.getTransport().stop(); // This fixed it holy crap.
    Tone.getTransport().position = "0:0:0"; // Reset transport to start
    Tone.getTransport().cancel();

    await Tone.start(); // Ensure AudioContext is started

    // Convert the input sequence into a format that Tone.Part understands
    const partData = sequence.map(([time, note, duration]) => [time, { note, duration }]);

    // Create a Tone.Part
    const part = new Tone.Part((time, value) => {
        synth.triggerAttackRelease(value.note, value.duration, time);

        if (value.isLast) {
            part.stop();
            console.log("Part stopped after last note.");
        }
    }, partData);

    // Configure the part
    // part.loop = 1;       // Number of loops (optional)
    // part.loopEnd = "1m"; // Duration of the loop (optional)

    // Start the transport and the part
    const transport = Tone.getTransport(); // Can be removed.
    // const context = Tone.getContext();
    // if (context.state !== "running") {
    //     context.resume();
    // }
    transport.bpm.value = tempoSlider.value; // Set the tempo
    part.start(0);
    part.loop = 1;
    transport.start();

    const lastNoteTime = stopTime(sequence);
    transport.scheduleOnce((lnt) => {
        console.log(lnt)
        transport.stop(lnt);
        console.log(lnt);
        console.log("Transport stopped after last note.");
    }, lastNoteTime);
};
// Append the button to the document
document.body.appendChild(playButton);

// Pause button
const pauseButton = document.createElement('button');
pauseButton.textContent = 'Pause Music';
pauseButton.onclick = () => {
    Tone.getTransport().pause();
    //clock.pause();
    console.log('State is:', Tone.getContext().state);
}

document.body.appendChild(pauseButton);

const resumeButton = document.createElement('button');
resumeButton.textContent = 'Resume Music';
resumeButton.onclick = () => {
    //clock.start();
    Tone.getTransport().start();
    console.log('State is:', Tone.getContext().state);
}
document.body.appendChild(resumeButton);

const stopButton = document.createElement('button');
stopButton.textContent = 'Stop Music';
stopButton.onclick = () => {
    Tone.getTransport().stop();
    //clock.off();
    console.log('State is:', Tone.getContext().state);
}

document.body.appendChild(stopButton);

// Tempo slider
const tempoSlider = document.createElement('input');
const currentTempo = document.createElement('span');
tempoSlider.type = 'range';
tempoSlider.min = 60;
tempoSlider.max = 180;
tempoSlider.value = 120;
currentTempo.textContent = tempoSlider.value;
tempoSlider.oninput = () => {
    Tone.getTransport().bpm.value = Math.floor(parseInt(tempoSlider.value));
    currentTempo.textContent = Math.floor(Tone.getTransport().bpm.value);
}
document.body.appendChild(currentTempo);
document.body.appendChild(tempoSlider);

const playbackTime = document.createElement('span'); // Not correct
const playbackSlider = document.createElement('input');
const playbackDuration = document.createElement('span');
playbackTime.textContent = playbackSlider.value;
//playbackDuration.textContent = 100;

playbackSlider.type = 'range';
playbackSlider.min = 0;
const lastNote = sequence[sequence.length - 1];
playbackSlider.value = 0;

// Notes on autoupdate:
// Surely it's optimized enough, but maybe some of these shouldn't be updated until I press play.
// Namely scrubber (not a scrubber, the term for the slider shows duration).
const autoUpdate = setInterval(() => {
    playbackSlider.max = getDuration(lastNote[0], lastNote[2], tempoSlider.value);
    playbackDuration.textContent = `0:${(playbackSlider.max).padStart(2, '0')}`;
    playbackTime.textContent = `0:${Math.floor(Tone.getTransport().seconds).toString().padStart(2, '0')}`;
    playbackSlider.value = Math.floor(Tone.getTransport().seconds);
}, 100);

document.body.appendChild(playbackTime);
document.body.appendChild(playbackSlider);
document.body.appendChild(playbackDuration);

function displayArray(array) {
    const table = document.createElement('table');

    const headers = ['Time', 'Note', 'Duration'];
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

    array.forEach((rowArray, index) => {
        const row = document.createElement('tr');
        rowArray.forEach(cellData => {
            const cell = document.createElement('td'); //index === 0 ? 'th' : 'td'
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    document.body.appendChild(table);
}

displayArray(sequence);

const vexSequence = [
    {key: "c/4", duration: "q"},  // Play C4 for a quarter note at time 0
    {key: "e/4", duration: "8"},  // Play E4 for an eighth note at time 0:1
    {key: "g/4", duration: "16"}, // Play G4 for a sixteenth note at time 0:2
    {key: "b/4", duration: "h"}, // Play B4 for a half note at time 0:3
    {key: "c/3", duration: "w"}
];

// Convert sequence into VexFlow
// function toneToVex(sequence) {
// }

// function vexToTone(vexSequence, timeSign = "4/4") { // Default is 4/4
//     const durations = {
//         "w": "1n",
//         "h": "2n",
//         "q": "4n",
//         "8": "8n",
//         "16": "16n",
//     }


// }

function convertVtoT(vArray, timeSignature = "4/4") { // Add rests and shi...
    const noteDurations = {
        "w": "1n",
        "h": "2n",
        "q": "4n",
        "8": "8n",
        "16": "16n"
    };
/*
    const restDurations = {
        "wr": "1n",
        "hr": "2n",
        "qr": "4n",
        "8r": "8n",
        "16r": "16n"
    };
*/

    let tArray = [];
    let currentTime = [0, 0, 0]; // measures:beats:sixteenths

    vArray.forEach(note => {
        // Convert key
        let key = note.key.replace("/", "").toUpperCase();

        // Convert duration
        let duration = noteDurations[note.duration];

        // Add note to tArray
        tArray.push([`${currentTime[0]}:${currentTime[1]}:${currentTime[2]}`, key, duration]);

        // Update time
        let beatsPerMeasure = parseInt(timeSignature.split("/")[0]);
        let sixteenthsPerBeat = 4; // 4 sixteenths in a beat

        let durationInSixteenths = {
            "1n": 4 * beatsPerMeasure,
            "2n": 2 * beatsPerMeasure,
            "4n": 4,
            "8n": 2,
            "16n": 1
        }[duration];

        currentTime[2] += durationInSixteenths;
        while (currentTime[2] >= sixteenthsPerBeat) {
            currentTime[2] -= sixteenthsPerBeat;
            currentTime[1] += 1;
        }
        while (currentTime[1] >= beatsPerMeasure) {
            currentTime[1] -= beatsPerMeasure;
            currentTime[0] += 1;
        }
    });
    console.log(tArray);
    return tArray;
}

const vexToToneArr = convertVtoT(vexSequence, "4/4");

displayArray(vexToToneArr);