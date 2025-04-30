/*
Synth: A basic synthesizer with customizable oscillator and envelope.
MembraneSynth: A synthesizer that simulates a drum membrane. Very Funny but impractical and annoying.
MetalSynth: A synthesizer that simulates metallic percussion.
*/

//let synth = new Tone.Synth().toDestination();

// Sounds are loaded from tonejs-instruments. The zips were downloaded off https://observablehq.com/@esperanc/tone-js-instruments. All credit to them.
const sound_map = {
    "Bass (Electric)": ["bass-electric", "E1", "E2", "E3", "E4", "G1", "G2", "G3", "G4"],
    "Bassoon": ["bassoon", "A2", "A3", "A4", "C3", "C4", "C5", "E4", "G2", "G3", "G4"],
    "Cello": ["cello", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4"],
    "Clarinet": ["clarinet", "D3", "D4", "D5", "D6", "F3", "F4", "F5"],
    "Double Bass": ["contrabass", "A2", "B3", "C2", "D2", "E2", "E3", "G1"],
    "Flute": ["flute", "A4", "A5", "A6", "C4", "C5", "C6", "C7", "E4", "E5", "E6"],
    "French Horn": ["french-horn", "A1", "A3", "C2", "C4", "D3", "D5", "F3", "F5", "G2"],
    "Guitar (Acoustic)": ["guitar-acoustic", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4"],
    "Guitar (Electric)": ["guitar-electric", "A2", "A3", "A4", "A5", "C3", "C4", "C5", "C6", "E2"],
    "Guitar (Nylon)": ["guitar-nylon", "D3", "E3", "G3", "A3", "B3", "D5", "E4", "G5", "A4", "B4"],
    "Harmonium": ["harmonium", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4"],
    "Harp": ["harp", "A4", "B3", "B5", "C3", "C5", "D4", "E3", "E5", "F4", "G3", "G5"],
    "Organ": ["organ", "A1", "A2", "A3", "A4", "C1", "C2", "C3", "C4", "C5", "C6"],
    "Piano": ["piano", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5"],
    "Saxophone": ["saxophone", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5"],
    "Trombone": ["trombone", "C3", "C4", "D3", "D4", "F2", "F3", "F4"],
    "Trumpet": ["trumpet", "A3", "A5", "C4", "C6", "D5", "F3", "F4", "F5", "G4"],
    "Tuba": ["tuba", "D3", "D4", "F1", "F2", "F3"],
    "Violin": ["violin", "A3", "A4", "A5", "A6", "C4", "C5", "C6", "E4", "E5", "E6", "G4", "G5", "G6"],
    "Xylophone": ["xylophone", "C5", "C6", "C7", "C8", "G4", "G5", "G6", "G7"]
}

/*
const instruments = ["Bass (Electric)", "Bassoon", "Cello", "Clarinet", "Double Bass", "Flute", "French Horn", "Guitar (Acoustic)", "Guitar (Electric)", "Guitar (Nylon)", "Harmonium", "Harp", "Organ", "Piano", "Saxophone", "Trombone", "Trumpet", "Tuba", "Violin", "Xylophone"];
*/


// Scrapped last second. Sorry.
//let isPlaying = false; // Flag to track if the music is playing
//let isPaused = false; // Flag to track if the music is paused
// If playing is true, it is playing.
// If paused is true, it is paused.
// If both are false, it is stopped.
// Both cannot be true.

// function waitSampler(sampler) {
//     return new Promise((resolve) => {
//         if (sampler.loaded) {
//             // If the sampler is already loaded, resolve immediately
//             resolve();
//         } else {
//             sampler.onload = () => {
//                 resolve();
//             };
//         }
//     });
// }

// let samplerLoaded = false;
// function samplerLoadCheck() {
//     samplerLoaded = true;
//     console.log("Sampler loaded!");
// }

function createToneSampler(soundMap) {
    //samplerLoaded = false;
    // Create the urls dictionary for the given notes
    const urls = {};
    soundMap.slice(1).forEach(note => {
        urls[note] = `${note}.ogg`;
    });
    //console.log("Sound Map:", soundMap.slice(1));

    // Generate the Tone.Sampler initialization code
    const sampler = new Tone.Sampler({
        urls: urls,
        baseUrl: `./sounds/${soundMap[0]}/`
    }).toDestination();

    return sampler;
}


function autoRestartTone() {
    if (Tone.getContext().state !== "running") {
        Tone.start().then(() => console.log("Tone.js restarted automatically!"));
    }
}

// Listen for state changes and restart if needed
Tone.getContext().rawContext.onstatechange = () => {
    if (Tone.getContext().rawContext.state === "suspended") {
        autoRestartTone();
    }
};


// Example sequence: [time, note, duration]

function stopTime (sequence, timeSignatureNum, timeSignatureDenom){
    let lastNote = sequence[sequence.length - 1]; // We need 0 and 2.

    const parts = lastNote[0].split(':');
    const duration = lastNote[2];

    const sixteenthsPerBeat = 16 / timeSignatureDenom;             
    const beatsPerMeasure = timeSignatureNum;

    // Parse measures, beats, and sixteenths
    var measures = parseInt(parts[0]);
    var beats = (parts.length >= 2) ? parseInt(parts[1]) : 0;
    var sixteenths = parts.length === 3 ? parseInt(parts[2]) : 0;
    //console.log(sixteenths);
    //console.log(duration);
    let durationInSixteenths = 0;

    // Pretty sure this is correct. Make sure to double check with musical people xD
    // Used to use sixteenths per beat, but that is wrong.
    if (duration === "1n") {
        durationInSixteenths = 16;
    } else if (duration === "2n.") {
        durationInSixteenths = 12;
    } else if (duration === "2n") {
        durationInSixteenths = 8;
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
    sixteenths += 0;

    const timeToStop = `${measures}:${beats}:${sixteenths}`;
    console.log(timeToStop);
    return timeToStop;
}

async function playMusic() {

    // Generate the Tone.Sampler for the given instrument and notes
    sequence = convertVtoT(window.vexNotes, window.timeSignNum, window.timeSignDenom);
    console.log(sequence);
    const transport = Tone.getTransport(); // Can be removed.

    transport.stop();
    transport.position = "0:0:0"; // Reset transport to start
    transport.cancel();

    let instrument = "Piano"; // Default instrument
    console.log("Instrument Window:", window.instrument);
    if (window.instrument != undefined) {
        instrument = window.instrument;
    } else {
        instrument = "Piano"; // Default instrument
    }
    
    let synth = createToneSampler(sound_map[instrument]);

    await new Promise((resolve) => setTimeout(resolve, 500));
    synth.volume.value = 0; // Unmute the synth. This is also needed since there was a bug where the synth would blast the speakers randomly.

    let timeSig = [4, 4]; // Default time signature
    if(window.timeSignNum == undefined || window.timeSignDenom == undefined) {
        transport.timeSignature = [4, 4]; // Default time signature
        console.log("Time Sign Undefined");
    } else {
        transport.timeSignature = [window.timeSignNum, window.timeSignDenom]; // Set time signature
        timeSig = [window.timeSignNum, window.timeSignDenom];
        console.log("Time Sign Defined");
    }
    console.log("Time Signature:", transport.timeSignature);
    
    await Tone.start(); // Ensure AudioContext is started

    // Convert the input sequence into a format that Tone.Part understands
    const partData = sequence.map(([time, note, duration]) => [time, { note, duration }]);

    // Create a Tone.Part
    const part = new Tone.Part((time, value) => {
        synth.triggerAttackRelease(value.note, value.duration, time);

        if (value.isLast) {
            part.stop();
        }
    }, partData);

    // Start the transport and the part
    if (window.tempoInt == undefined) {
        const adjustedBPM = 120 / (timeSig[1] / 4);
        transport.bpm.value = adjustedBPM; // Set the tempo
        console.log("Undef BPM:", transport.bpm.value);
    } else {
        const adjustedBPM = window.tempoInt / ( timeSig[1] / 4);
        transport.bpm.value = adjustedBPM; // Set the tempo
        // console.log("Tempo Int:", window.tempoInt);
        // console.log("Time sign:", timeSig);
        // console.log("Transport Beats per Measure. Based on quarters.", transport.timeSignature);
        // console.log("window.timeSignDenom:",  window.timeSignDenom);
        // transport.bpm.value = window.tempoInt; // Set the tempo
        // console.log("Defined BPM:", transport.bpm.value);
    }
    part.start(0);
    part.loop = 0;

    const lastNoteTime = stopTime(sequence, timeSig[0], timeSig[1] );
    console.log("Last note time:", lastNoteTime);
    sequence.push([lastNoteTime, null, "4n"]);
    console.log(sequence);

    transport.start();

    transport.schedule((lnt) => {
        // Reset transport to end
        synth.volume.value = -Infinity; // Mute the synth
        console.log("Transport stopped after last note.");
    }, lastNoteTime);

    // Change button back to play icon
    const playButton = document.getElementById('play-button');
    playButton.src = "images/play.svg";
    playButton.alt = "Play";
}

function pauseMusic() {
    Tone.getTransport().pause();
}

function resumeMusic() {
    Tone.getTransport().start();
}

function stopMusic() {

    const playButton = document.getElementById('play-button');

    Tone.getTransport().stop();
    Tone.getTransport().position = "0:0:0"; // Reset transport to start
    Tone.getTransport().cancel();
    
    playButton.src = "images/play.svg"; // Set the play button to play icon
    playButton.alt = "Play"; // Set the play button alt text to play
}

// const vexSequence = [
//     {key: "c/4", duration: "q"},  // Play C4 for a quarter note at time 0
//     {key: "e/4", duration: "8"},  // Play E4 for an eighth note at time 0:1
//     {key: "g/4", duration: "16"}, // Play G4 for a sixteenth note at time 0:2
//     {key: "b/4", duration: "h"}, // Play B4 for a half note at time 0:3
//     {key: "c/3", duration: "w"}
// ];

//console.log(vexSequence);


function convertVtoT(vArray, timeSignatureNum, timeSignatureDenom) { 
    // Left is Vex, right is Tone. 
    // This will have to be changed for time signatures. (Or not; double check sixteenths below)

    if (timeSignatureNum === undefined){
        timeSignatureNum = 4;
    }
    if (timeSignatureDenom === undefined) {
        timeSignatureDenom = 4;
    }

    const sixteenthsPerMeasure = parseInt(timeSignatureNum) * (16 / parseInt(timeSignatureDenom));

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
        console.log("Time Signature Num/Denom:", timeSignatureNum, timeSignatureDenom);
       
        // const beatsPerMeasure = parseInt(timeSignatureNum);
        // const sixteenthsPerBeat = 16 / parseInt(timeSignatureDenom); Consider doing this as integer division. The program won't work well without a power of 2.
        // 

        let durationInSixteenths = {
            "1n": 16,
            "2n.": 12,
            "2n": 8,
            "4n": 4,
            "8n": 2,
            "16n": 1
        }[duration];

        if(duration == "1n" && key == null) { 
            durationInSixteenths = sixteenthsPerMeasure; // Whole rest will always be a measure.
        }

        currentTime[2] += durationInSixteenths;

        // while (currentTime[2] >= 4) {
        //     currentTime[2] -= 4;
        //     currentTime[1] += 1;
        // } Retired quarter notes. We only do sixteenths now.

        while (currentTime[2] >= sixteenthsPerMeasure) {
            currentTime[2] -= sixteenthsPerMeasure;
            currentTime[0] += 1;
        }
    });
    //console.log(tArray);
    return tArray;
}

// const vexToToneArr = convertVtoT(vexSequence, "4/4");
// console.log(vexToToneArr);
let sequence = convertVtoT(window.vexNotes, window.timeSignNum, window.timeSignDenom);
/*
const oldSequence = [
    [0, "C4", "4n"],      // Play C4 for a quarter note at time 0
    ["0:1", "E4", "8n"],  // Play E4 for an eighth note at time 0:1
    ["0:2", "G4", "16n"], // Play G4 for a sixteenth note at time 0:2
    ["0:3", "B4", "2n"],  // Play B4 for a half note at time 0:3
    ["1:3", "C3", "1n"]   // Play C3 for a whole note at time 1:3
];*/

/*  Not enough time. Maybe someone in the future can implement this?
function togglePlayPause() {
    const playButton = document.getElementById('play-button');

    if (!isPlaying && !isPaused) {          // Nothing right now. Set to play. Icon is pause.
        playButton.src = "images/pause.svg";
        playButton.alt = "Pause";
        isPlaying = true; // Set the playing flag to true
        isPaused = false; // Set the paused flag to false
        console.log("Should Play");
        playMusic();
    } else if (isPlaying && !isPaused) {    // Playing right now. Set to pause. Icon is resume.
        playButton.src = "images/resume.png";
        playButton.alt = "Resume"; // Set the play button alt text to pause
        isPlaying = false; // Set the playing flag to true
        isPaused = true; // Set the paused flag to false
        console.log("Should Pause");
        pauseMusic();
    } else if (!isPlaying && isPaused) {    // Paused right now. Set to resume. Icon is pause.
        playButton.src = "images/pause.svg";
        playButton.alt = "Pause"; // Set the play button alt text to pause
        isPlaying = true; // Set the playing flag to true
        isPaused = false; // Set the paused flag to false
        console.log("Should Play from Resume");
        resumeMusic();
    } else {                                // Why are both true? Just set it to play again idk.
        playButton.src = "images/play.svg";
        playButton.alt = "Play";
        isPlaying = false; // Set the playing flag to true
        isPaused = false; // Set the paused flag to false
        stopMusic();
    }
}

function changeImg() {
    const playButton = document.getElementById('play-button');
    playButton.src = "images/pause.svg";
    playButton.alt = "Pause";
} */


document.getElementById('play-button').addEventListener('click', playMusic);
document.getElementById('pause-button').addEventListener('click', pauseMusic);

