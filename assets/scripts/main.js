jQuery(document).ready(function() {
    loadAndApplySettings();
    loadAudioButtons();
});

jQuery(window).resize(function () {
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
    jQuery.getJSON("assets/settings/sounds.json", function(sounds) {
        var source = jQuery("#tpl-buttons").html();
        var template = Handlebars.compile(source);
        var context = {"sounds": sounds}
        var soundboard = template(context);
        
        jQuery("#soundboard").html(soundboard);
        
        handleAudioButtonClicks();
        centerTheBoard();
        openTheCurtain();
    });
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
