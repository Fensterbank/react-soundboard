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
    jQuery.getJSON("assets/settings/general.json", function(settings) {  
        var source = jQuery("#tpl-color-styles").html();
        var template = Handlebars.compile(source);
        var context = {"colors": settings["colors"]}
        var styleRules = template(context);

        jQuery("head").append(styleRules);
    });
}

function loadAudioButtons() {
    state.Sounds = JSON.parse(window.localStorage.getItem('sounds'));
    if (state.Sounds == null)
        document.getElementById('download-configuration').style.display = 'none';
    else
        document.getElementById('download-configuration').style.display = 'block';

    var source = jQuery("#tpl-buttons").html();
    var template = Handlebars.compile(source);
    var context = {"sounds": state.Sounds};
    var soundboard = template(context);

    jQuery("#soundboard").html(soundboard);

    handleAudioButtonClicks();
    centerTheBoard();
    openTheCurtain();
}

function handleMenuButtonClicks() {
    jQuery('#download-configuration').on('click', downloadConfiguration);
    jQuery('#upload-configuration').on('click', uploadConfiguration);
}

function handleAudioButtonClicks() {
    jQuery("audio").each(function (i, elem) {
        elem.addEventListener('playing', function(){
            jQuery(this).parent().addClass("playing");
        }, false);

        elem.addEventListener('pause', function(){
            jQuery(this).parent().removeClass("playing");
        }, false);

        elem.addEventListener('ended', function(){
            jQuery(this).parent().removeClass("playing");
        }, false);
    });

    jQuery(".button").click(function () {
        var isPlaying = jQuery(this).hasClass("playing");
        var audioElement = jQuery(this).find("audio").get(0);

        if (!isPlaying) {
            audioElement.play();
        } else {
            audioElement.pause();
            audioElement.currentTime = 0.0;
        }
    });
}

function centerTheBoard() {
    var sb = jQuery("#soundboard");

    var numBoxes = jQuery(".button").length;
    var screenRes = jQuery(document).width() / jQuery(document).height();

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

    var boxDimension = jQuery(".button").first().width() + 30;

    sb.width(boxDimension * x);
    sb.height(boxDimension * y);

    sb.css("margin-left", "-" + sb.width()/2 + "px");
    sb.css("margin-top", "-" + sb.height()/2 + "px");
}

function openTheCurtain() {
    var fadeDuration = 200;

    jQuery("#loader").fadeOut(fadeDuration, function() {
        jQuery("#soundboard").fadeIn(fadeDuration);
    });
}

function downloadConfiguration() {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.Sounds)));
    a.setAttribute('download', 'sounds.json');

    // Append link to body for firefox
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

