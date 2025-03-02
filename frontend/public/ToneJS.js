// A more advanced Tone.js test
// Make sure Tone is installed from npm (?)
//import * as Tone from 'tone';

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
    //console.log(sixteenths);
    //console.log(duration);
    let durationInSixteenths = 0;

    if (duration === "1n") {
        durationInSixteenths = 4 * beatsPerMeasure;
    } else if (duration === "2n.") {
        durationInSixteenths = 3 * beatsPerMeasure;
    } else if (duration === "2n") {
        durationInSixteenths = 2 * beatsPerMeasure;
    } else if (duration === "4n") {
        durationInSixteenths = 4;
    } else if (duration === "8n") {
        durationInSixteenths = 2;
    } else if (duration === "16n") {
        durationInSixteenths = 1;
    }

    //console.log(durationInSixteenths);
    // 1:3:0 -> 1:3:19 -> 1:7:3
    sixteenths += durationInSixteenths;
    //console.log(sixteenths);

    while (sixteenths >= sixteenthsPerBeat) {
        sixteenths -= sixteenthsPerBeat;
        beats += 1;
    }
    while (beats >= beatsPerMeasure) {
        beats -= beatsPerMeasure;
        measures += 1;
    }
    //console.log(sixteenths);
    sixteenths += 1;

    const timeToStop = `${measures}:${beats}:${sixteenths}`;
    console.log(timeToStop);
    return timeToStop;
}

async function playMusic() {

    sequence = convertVtoT(window.vexNotes);

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

    // Start the transport and the part
    const transport = Tone.getTransport(); // Can be removed.
    
    transport.bpm.value = 120; //tempoSlider.value; // Set the tempo
    part.start(0);
    part.loop = 0;
    transport.start();

    const lastNoteTime = stopTime(sequence);
    sequence.append([lastNoteTime, null, "4n"]);
    //console.log(sequence);
    transport.scheduleOnce((lnt) => {
        console.log(lnt)
        transport.stop(lnt);
        console.log("Transport stopped after last note.");
    }, lastNoteTime);

    //console.log(sequence);
    //console.log(window.vexNotes);

}

function pauseMusic() {
    Tone.getTransport().pause();
    //console.log('State is:', Tone.getContext().state);
}

// const vexSequence = [
//     {key: "c/4", duration: "q"},  // Play C4 for a quarter note at time 0
//     {key: "e/4", duration: "8"},  // Play E4 for an eighth note at time 0:1
//     {key: "g/4", duration: "16"}, // Play G4 for a sixteenth note at time 0:2
//     {key: "b/4", duration: "h"}, // Play B4 for a half note at time 0:3
//     {key: "c/3", duration: "w"}
// ];

//console.log(vexSequence);


function convertVtoT(vArray, timeSignature = "4/4") { // Add rests and shi...
    const noteDurations = {
        "w": "1n",
        "hd": "2n.",
        "h": "2n",
        "q": "4n",
        "8": "8n",
        "16": "16n"
    };

    const restDurations = {
        "wr": "1n",
        "hdr": "2n.",
        "hr": "2n",
        "qr": "4n",
        "8r": "8n",
        "16r": "16n"
    };


    let tArray = [];
    let currentTime = [0, 0, 0]; // measures:beats:sixteenths
    //console.log(vArray);
    vArray.forEach(note => {
        // Convert key
        let key = note.key.replace("/", "").toUpperCase();

        // Convert duration
        let duration = "";
        if(note.duration.endsWith("r")) {
            duration = restDurations[note.duration];
            key = null;
            //console.log("Rest Was Detected");
        } else {            
            duration = noteDurations[note.duration];
        }
        

        // Add note to tArray
        tArray.push([`${currentTime[0]}:${currentTime[1]}:${currentTime[2]}`, key, duration]);

        // Update time
        let beatsPerMeasure = parseInt(timeSignature.split("/")[0]);
        let sixteenthsPerBeat = 4; // 4 sixteenths in a beat

        let durationInSixteenths = {
            "1n": 4 * beatsPerMeasure,
            "2n.": 3 * beatsPerMeasure,
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
    //console.log(tArray);
    return tArray;
}

// const vexToToneArr = convertVtoT(vexSequence, "4/4");
// console.log(vexToToneArr);
let sequence = convertVtoT(window.vexNotes);
/*
const oldSequence = [
    [0, "C4", "4n"],      // Play C4 for a quarter note at time 0
    ["0:1", "E4", "8n"],  // Play E4 for an eighth note at time 0:1
    ["0:2", "G4", "16n"], // Play G4 for a sixteenth note at time 0:2
    ["0:3", "B4", "2n"],  // Play B4 for a half note at time 0:3
    ["1:3", "C3", "1n"]   // Play C3 for a whole note at time 1:3
];*/

document.getElementById('play-button').addEventListener('click', playMusic);
document.getElementById('pause-button').addEventListener('click', pauseMusic);