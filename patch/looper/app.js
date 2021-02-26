function sequencer(){
    const kick = new Tone.Player('./samples/kick-808.wav').toMaster();
    const clap = new Tone.Player('./samples/clap-808.wav').toMaster();
    let index = 0;

    Tone.Transport.scheduleRepeat(repeat, "8n");
    Tone.Transport.start();

    function repeat() {
        let step = index % 8;
        console.log(step);
        let kickInputs = document.querySelector(
            `.kick input:nth-child(${step + 1})`
        );
        let clapInputs = document.querySelector(
            `.clap input:nth-child(${step + 1})`
        );
        if(kickInputs.checked) {
            kick.start();
        }
        if(clapInputs.checked) {
            clap.start();
        }
        index++;
    }
}

sequencer();