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
		//preload bar & background images
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+250, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.sprite(this.world.centerX, this.world.centerY, 'titleimage');
		this.titleText.scale.setTo(.4, .4)
		this.titleText.anchor.setTo(0.5, 0.5);
		this.load.image('mountain', 'background/NinjaMountain.jpg');

		//images for map
		this.load.image('tree', 'background/tree.png');
		this.load.image('sign', 'background/sign.png');
		this.load.image('treePlat', 'background/treePlat.png')
		this.load.image('bentBranch', 'background/platLog.png')
		this.load.image('curvedUpBranch', 'background/curvedUpBranch.png')
		this.load.image('leftCloud', 'background/leftCloud.png')
		this.load.image('cloud', 'background/cloud.png')
		this.load.image('rightCloud', 'background/rightCloud.png')
		this.load.image('blueStar', 'background/blueStar.png')
		this.load.image('purpleStar', 'background/purpleStar.png')
		this.load.image('glow', 'background/glowForm.png')
		this.load.image('container', 'background/container.png')
		this.load.image('refresh', 'background/refresh.png')

		//audio
		this.load.audio('themeSong', 'soundeffects/TheLastEncounter.mp3');
		this.load.audio('teleport', 'soundeffects/teleport.wav');
		this.load.audio('winner', 'soundeffects/FFVII.mp3');
		this.load.image('unmute', 'background/unmute.png');
		this.load.image('mute', 'background/mute.png');



		//spirtes to add to game
		this.load.spritesheet('ninjaRun', 'Sprites/SpriteSheets/run-Sheet.png', 36, 26)
		this.load.spritesheet('ninjaSlash', 'Sprites/SpriteSheets/slash-Sheet.png', 42, 26)
		this.load.spritesheet('ninjaDeath', 'Sprites/SpriteSheets/death-Sheet.png', 35, 26)
		this.load.spritesheet('finalBoss', 'Sprites/SpriteSheets/boss.png', 105, 110)



		this.load.image('titlescreen', 'background/pressAny.jpg');
		this.load.bitmapFont('eightbitwonder', 'font/font.png', 'font/font.fnt');

	},

	create: function (game) {
		this.preloadBar.cropEnabled = false;
			this.state.start('StartMenu');




	},

	update: function (){
		this.ready = true;

	}

};
