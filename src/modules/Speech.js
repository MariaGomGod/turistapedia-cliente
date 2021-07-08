
const synth = window.speechSynthesis;
const speech = new SpeechSynthesisUtterance();
speech.rate = 0.8;
speech.lang = "es";

const startSpeaking = text => {
    const volume = localStorage.getItem("volume");
    speech.text = text;
    speech.volume = volume;
    if (!synth.speaking && (speech.volume !== "0")) {
        synth.speak(speech);
    }
}

const stopSpeaking = () => {
    synth.cancel();
}

module.exports = {startSpeaking, stopSpeaking};
