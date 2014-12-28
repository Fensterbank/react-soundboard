/* vim: set tw=4 sw=4: */
var state = {
    Sounds: [],
    CloseTimeout: null
};

document.addEventListener('DOMContentLoaded', function(){
    loadAndApplySettings();
    loadAudioButtons();

    handleMenuButtonClicks();
});

window.addEventListener("resize", function() {
    centerTheBoard();
});

function loadAndApplySettings() {
    getJSON("assets/settings/general.json", function(settings) {
        var source = document.querySelector("#tpl-color-styles").innerHTML;
        var template = Handlebars.compile(source);
        var context = {"colors": settings["colors"]};
        var styleRules = document.createElement('style');
        styleRules.setAttribute('type', 'text/css');
        styleRules.innerHTML = template(context);
        document.head.appendChild(styleRules);
    });
}

function loadAudioButtons() {
    function onSoundsLoaded() {
        document.getElementById('download-configuration').style.display = 'block';
        var source = document.querySelector("#tpl-buttons").innerHTML;
        var template = Handlebars.compile(source);
        var context = {"sounds": state.Sounds};
        var soundboard = template(context);

        document.querySelector("#soundboard").innerHTML = soundboard;

        handleAudioButtonClicks();
        centerTheBoard();
        openTheCurtain();
    }

    state.Sounds = JSON.parse(window.localStorage.getItem('sounds'));
    if (state.Sounds == null) {
        // If no client configuration is saved, load it from server config file
        document.getElementById('download-configuration').style.display = 'none';
        getJSON("assets/settings/sounds.json", function(sounds) {
            state.Sounds = sounds;
            onSoundsLoaded();
        });
    }
    else
        onSoundsLoaded();
}

function handleMenuButtonClicks() {
    document.querySelector('#download-configuration').addEventListener('click', downloadConfiguration);
    document.querySelector('#upload-configuration').addEventListener('click', uploadConfiguration);
}

function handleAudioButtonClicks() {
    function buttonOnClick() {
        var isPlaying = this.classList.contains("playing");
        var audioElement = this.querySelector("audio");

        if (!isPlaying) {
            audioElement.play();
        } else {
            audioElement.pause();
            audioElement.currentTime = 0.0;
        }
    }

    var audioNodes = document.querySelectorAll('audio');
    for (var i = 0; i < audioNodes.length; i++) {
        var elem = audioNodes[i];
        elem.addEventListener('playing', function(){
            this.parentElement.classList.add("playing");
        }, false);

        elem.addEventListener('pause', function(){
            this.parentElement.classList.remove("playing");
        }, false);

        elem.addEventListener('ended', function(){
            this.parentElement.classList.remove("playing");
        }, false);
    }

    [].forEach.call(document.querySelectorAll('.button'), function (el) {
        el.addEventListener('click', buttonOnClick, false);
    });
}

function centerTheBoard() {
    var sb = document.querySelector("#soundboard");

    var numBoxes = document.querySelectorAll(".button").length;
    var screenRes = document.body.clientWidth / document.body.clientHeight;

    var x = 1, y = 1;

    /**
     * this super-hyper-high-performance loop is developed
     * and powered by @SWW13
     * may the source be with him.
     */
    while ((x*y) < numBoxes) {
        var solRes = x / y;

        if (solRes < screenRes) {
            x++;
        } else {
            y++;
        }
    }

    var boxDimension = document.querySelector(".button").offsetWidth + 30;

    sb.style.width = (boxDimension * x);
    sb.style.height = (boxDimension * y);

    sb.style.marginLeft = ("-" + sb.offsetWidth/2 + "px");
    sb.style.marginTop = ("-" + sb.offsetHeight/2 + "px");
}

function openTheCurtain() {
    // Fade Out and Fade In with CSS transitions
    var el = document.getElementById('loader');
    el.classList.remove('show');
    el.classList.add('hide');
    window.setTimeout(function () {
        el = document.getElementById('soundboard');
        el.classList.remove('hide');
        el.classList.add('show');
    }, 200);
}

function downloadConfiguration() {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.Sounds)));
    a.setAttribute('download', 'sounds.json');

    // Append link to body to make click event work
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
}

function uploadConfiguration() {
    if (state.CloseTimeout != null) {
        window.clearTimeout(state.CloseTimeout);
        state.CloseTimeout = null;
    }

    var d = document.getElementById('upload-configuration-content');
    d.innerHTML = '';

    var fileUpload = document.createElement('input');
    fileUpload.setAttribute('type', 'file');
    fileUpload.addEventListener('change', handleUploadFileSelect, false);
    d.appendChild(fileUpload);
    d.style.display = 'block';
}

function uploadedFileIsValid(fileContent) {
    try {
        var sounds = JSON.parse(fileContent);
        if (Array.isArray(sounds) && sounds.length > 0) {
            sounds.forEach(function (sound) {
                if (!sound.hasOwnProperty('title')
                    || !sound.hasOwnProperty('sound'))
                return false;
            });
            return true;
        }
    } catch (e) {}
    return false;
}

function handleUploadFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var file = files[0];

    if (file != null) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var fileContent = reader.result;

            var d = document.getElementById('upload-configuration-content');
            if (uploadedFileIsValid(fileContent)) {
                window.localStorage.setItem('sounds', fileContent);
                loadAudioButtons();
                d.innerHTML = '<span class="success">Configuration loaded!</span>';
            } else {
                d.innerHTML = '<span class="error">Uploaded file invalid!</span>';
            }
            state.CloseTimeout = window.setTimeout(function () {
                d.innerHTML = '';
                d.style.display = 'none';
                state.CloseTimeout = null;
            }, 5000);
        };
        reader.readAsText(file, 'UTF-8');
    }
}

function getJSON(url, onSuccess, onError) {
    request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (this.response != null) {
            var data = JSON.parse(this.response);
            if (onSuccess) onSuccess(data);
        }
    };

    request.onerror = function() {
        if (onError) onError(this);
    };

    request.send();
}

