var _AlarmTime = 5;
var _Time = 0;
var _CanRun = false;
var _MusicId = "relax";
var audio;

var _ButtonStorage = {
    "Start": '<button type="button" class="btn btn-outline-success btn-lg" onclick="Start()">Start</button>',
    "Pause": '<button type="button" class="btn btn-outline-danger btn-lg" onclick="Pause()">Pause</button>',
    "Restart": '<button type="button" class="btn btn-outline-warning btn-lg" onclick="Restart()">Restart</button>'
};

var _MusicStorage = {
    "arp": './Music/Arp.mp3',
    "bass": './Music/Bass.mp3',
    "relax": './Music/Relax.mp3',
    "scarry": './Music/Scarry.mp3',
    "titanium": './Music/Titanium.mp3'
};

function setup() {
    GEBI("Button1").innerHTML = _ButtonStorage["Start"];
    GEBI("Button2").innerHTML = _ButtonStorage["Restart"];
    
    // Non editable input hide
    GEBI("NonMinIn").style.display = "none";
    GEBI("NonSecIn").style.display = "none";

    document.getElementById("flexRadioDefault3").checked = true;
    Main();
}
setup();

// Timer script
function Main() {
    setInterval(() => {
        if (_CanRun) {
            _Time++;
        }
        if ((_AlarmTime == _Time) && !(_AlarmTime == 0)) {
            MusicHandler("Start");
        }
    }, 1000);
    setInterval(() => {
        if(isInt(_Time)){
            UpdateDisplay()
        }
        
        
    }, 10);
}

function UpdateDisplay() {
    let _minutes = Math.floor(_Time / 60);
    let _seconds = _Time - _minutes * 60;
    GEBI("Clock").innerHTML = _minutes + ":" + _seconds;
}

function Start() {
    _CanRun = true;
    GEBI("Button1").innerHTML = _ButtonStorage["Pause"];
    HideSettings("Hide");
    GetTime();
}

function Pause() {
    _CanRun = false;
    GEBI("Button1").innerHTML = _ButtonStorage["Start"];
    MusicHandler("Stop");
    HideSettings("Show");
    GetTime();
}

function Restart() {
    _CanRun = false;
    _Time = 0;
    Pause();
    GetTime();
}

function GEBI(_ID) {
    return document.getElementById(_ID);
}

// Alarm handler
function MusicHandler(_StopOrStart = "") {
    if (_StopOrStart == "Start") {
        // Check for no audio or if audio ended and make new audio, then play the audio
        if (!audio || audio.ended) {
            audio = new Audio(_MusicStorage[_MusicId]);
            audio.loop = true;
        }
        audio.play()
            .then(() => {
                console.log("Music Started");
                _CanRun = false;
                _Time = _Time + 0.1
                GEBI("Clock").innerHTML = "Done";

                
            })
            .catch((error) => {
                console.error("Failed to start music:", error);
            });
    } else if (_StopOrStart == "Stop" && audio) {
        audio.pause();
        console.log("Music Stopped");
    } else if (_StopOrStart === "Clear") {
        audio = "";
    }
}

// Changes the alarm audio
function MusicChange(MusicId) {
    _MusicId = MusicId;
    console.info("Changed Music to " + _MusicId);
    MusicHandler("Clear");
}

// Sets input to the alarm time
function GetTime() { 
    let _sec = GEBI("SecIn").value;
    let _min = GEBI("MinIn").value;

    _AlarmTime = (_min * 60) + _sec;

}

//Hides and shows settings
function HideSettings(HideShow) { 

    if(HideShow == "Show"){
        GEBI("MusicSelect").style.display = "block";

        // Set non editable display
        GEBI("NonMinIn").value = GEBI("MinIn").value;
        GEBI("NonSecIn").value = GEBI("SecIn").value;
        
        // Show non editable input
        GEBI("NonMinIn").style.display = "none";
        GEBI("NonSecIn").style.display = "none";

        // Show editable input
        GEBI("MinIn").style.display = "block";
        GEBI("SecIn").style.display = "block";
        GEBI("Input").style.display = "flex";

    }
    else if(HideShow == "Hide"){
        GEBI("MusicSelect").style.display = "none";

        // Set non editable display
        GEBI("NonMinIn").value = GEBI("MinIn").value;
        GEBI("NonSecIn").value = GEBI("SecIn").value;

        // Show Non editable input
        GEBI("NonMinIn").style.display = "block";
        GEBI("NonSecIn").style.display = "block";

         // Hide Editable input
         GEBI("MinIn").style.display = "none";
         GEBI("SecIn").style.display = "none";
         GEBI("Input").style.display = "none";

         

    }
 }

 //Checks for int
 function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

