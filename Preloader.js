
N8.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.titleimage = null;
	this.titleText = null;

	this.ready = false;

};

N8.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar

		this.titleimage = this.add.sprite(400, 200, 'titleimage');
		this.preloadBar = this.add.sprite(400, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		this.load.setPreloadSprite(this.preloadBar);
		this.load.setPreloadSprite(this.titleimage);

		//	Here we load the rest of the assets our game needs.
		//	You can find all of these assets in the Phaser Examples repository

	},

	create: function () {

		this.state.start('MainMenu');

	}

};
