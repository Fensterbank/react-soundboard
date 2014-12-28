HTML5 Soundboard
================

A damn small soundboard based on pure HTML5 (and some JavaScript)

Setup
-----

1. Upload the files
2. Place sound files (preferably .ogg files) in the /assets/sounds/-directory
3. Modify /assets/settings/sounds.json to contain all your sounds
4. Modify /assets/settings/general.json to match your favorite colors
5. You can download, modify and upload sound configuration files (saved in browser storage) without affecting the default server config file
5. Have fun clicking around

sounds.json
-----------

That file is basically just a json file containing an array of sounds. It should look like that:

```json
[
    {
        "title": "My awesome sound",
        "file": "sound.ogg"
    },
    {
        "title": "Another sound",
        "file": "foo.ogg"
    }
]
```

settings.json
-------------

That file is json, too. Use it to change the colors of the soundboard.

```json
{
    "colors":
    {
        "background": "#615A55",
        "button": "#DEDEDE",
        "playing": "#EA2C46"
    }
}
```

Bug? Feature idea?
------------------

Feel free to fork, I'd be glad to merge a pull request. ;-)

Notes
-------

I am using Handlebars and normalize.css. Note that that stuff is not licensed under the DWTFYWTADBUPL.
