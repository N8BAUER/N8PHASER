N8.Preloader = function(game) {

	this.preloadBar = null;
	this.titleText = null;
	this.ready = false;

};

N8.Preloader.prototype = {


	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+150, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.sprite(this.world.centerX, this.world.centerY, 'titleimage');
		this.titleText.anchor.setTo(0.5, 0.5);


		this.load.image('titlescreen', 'background/pressAny.jpg');
		this.load.bitmapFont('eightbitwonder', 'font/font.png', 'font/font.fnt');

	},

	create: function (game) {
		this.preloadBar.cropEnabled = false;
		this.state.start('StartMenu')


	},

	update: function (){
		this.ready = true;

	}

};
