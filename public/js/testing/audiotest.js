const body = document.querySelector('body');

const playAudio = async url => {
    const context = new AudioContext();
    const gainNode = context.createGain();
    const source = context.createBufferSource();
    const audioBuffer = await fetch(url)
        .then(res => res.arrayBuffer())
        .then(ArrayBuffer => context.decodeAudioData(ArrayBuffer));
    
    source.buffer = audioBuffer;
    source
        .connect(gainNode)
        .connect(context.destination);
    gainNode.gain.setValueAtTime(0.05, context.currentTime);
    source.start();
}

body.addEventListener('click', () => playAudio('/audio/dsdshtgn.wav'));