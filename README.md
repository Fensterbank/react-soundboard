HTML5 Soundboard
================

A damn small soundboard based on some React code.

Note: I've recently rewritten the app in React for a quick demo and I've
dropped some features I do no longer need. Check the `old` branch as well.

Setup
-----

1. Download the [latest build](https://github.com/denschub/html5soundboard/releases) and upload the `dist` folder content.
2. Place sound files (preferably .ogg files) in the `assets/sounds/`-directory.
3. Copy `assets/config.json.example` to `assets/config.json` and adjust to your needs.

Build
-----

* `npm start` will launch a development server that listens to `localhost:3000`.
* `npm run package` generates a new production package inside the `dist` directory.

Bug? Feature idea?
------------------

Feel free to fork, I'd be glad to merge a pull request. ;)
