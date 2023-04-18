const body = document.querySelector('body');

// add all audio files used in the gameAudioContext here
const allAudioFilePaths = [
    '/audio/dsdshtgn.wav',
    '/audio/voice_sans.mp3'
];

// custom error class
class Error {
    constructor(message) {
        this.message = message;
        this.name = 'Error';
    };
};

// custom audio error class
class AudioError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AudioError';
    };
};

// when catching custom errors, call this function to log it
const logError = function(error) {
    console.error(`${error.name}: ${error.message}`);
}

// audio context class declaration
class AudioContextClass {
    constructor() {
        this.context = new AudioContext();
        this.gainNode = this.context.createGain();
        this.audioBuffers = [];
    };

    initializeMultipleAudioFiles(audioFilePaths) {
        audioFilePaths.forEach(audioFile => {
            this.initializeAudioFile(audioFile);
        });
    };

    // initializes an audioBuffer (url = sound file path)
    async initializeAudioFile(url) {
        // create & decode audioBuffer
        const audioBuffer = await fetch(url)
            .then(res => res.arrayBuffer())
            .then(ArrayBuffer => this.context.decodeAudioData(ArrayBuffer));
        
        // store the audioBuffer in the audioBuffers array
        this.audioBuffers.push({
            audioBuffer,
            url
        });
    }

    // finds an audioBuffer with a matching url
    getCorrespondingAudioBuffer(url) {
        // search through audioBuffers
        for (let i = 0; i < this.audioBuffers.length; i++) {
            // get current audioBuffer
            const currentAudioBuffer = this.audioBuffers[i];

            // if the url of the audioBuffer matches the url we are searchign for, return the audioBuffer
            if (currentAudioBuffer.url === url) {
                return currentAudioBuffer;
            }
        }

        // if missing bufferSource, throw custom error
        throw new AudioError(`Couldn't find a bufferSource matching the url: ${url}`);
    };

    // create new bufferSource, fetch corresponding audioBuffer, attach the audioBuffer to the bufferSource, and play the sound
    playAudio(url) {
        // create a new bufferSource:
        const bufferSource = this.context.createBufferSource();

        // fetch corresponding buffer
        const audioBuffer = this.getCorrespondingAudioBuffer(url);

        // attach audioBuffer to the bufferSource:
        bufferSource.buffer = audioBuffer.audioBuffer;

        // connect, set audio of, and start buffer
        bufferSource
            .connect(this.gainNode)
            .connect(this.context.destination);
        
        this.gainNode.gain.setValueAtTime(0.05, this.context.currentTime);
        bufferSource.start();
    };
};

// create an audio context for the game
const gameAudioContext = new AudioContextClass();

// initialize all sound files used - add audio sources used in the array at the top of the file
gameAudioContext.initializeMultipleAudioFiles(allAudioFilePaths);

// play the sound that was initialized
body.addEventListener('click', () => gameAudioContext.playAudio('/audio/dsdshtgn.wav'));