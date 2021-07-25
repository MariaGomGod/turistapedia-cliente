
const synth = window.speechSynthesis;
const speech = new SpeechSynthesisUtterance();
speech.rate = 1;
speech.lang = "es";

const startSpeaking = text => {
    stopSpeaking();
    const volume = localStorage.getItem("volume") || "1";
    speech.text = text;
    speech.volume = volume;
    if (!synth.speaking && (speech.volume.toString() !== "0")) {
        // Con esto comprobamos si la cabecera User-Agent contiene la palabra Chrome
        // Hacemos esto para poder arreglar el defecto que se explica más abajo, sólo para Chrome
        if (navigator.userAgent.indexOf('Chrome') !== -1) {
            // Hay un defecto en Chrome que hace que las locuciones largas se paren a la mitad
            // La manera de solucionarlo es programar una pausa y una continuación cada 10 segundos
            // Hacemos esto mientras dure la locución, cuando termine destruimos el objeto que representa
            // la ejecución periódica (en este caso, "interval")
            const interval = setInterval(() => {
                speechSynthesis.pause();
                speechSynthesis.resume();
                if (!speechSynthesis.speaking) {
                    clearInterval(interval);
                }
            }, 1000);
        }
        synth.speak(speech);
    }
}

const stopSpeaking = () => {
    synth.cancel();
}

module.exports = { startSpeaking, stopSpeaking };
