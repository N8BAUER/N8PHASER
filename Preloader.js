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
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY , 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.sprite(this.world.centerX, this.world.centerY + this.game.height/3, 'titleimage');
		this.scaleSprite(this.titleText, this.game.width, this.game.height / 3, 50, 1);
		this.titleText.anchor.setTo(0.5);
		this.load.image('mountain', 'background/NinjaMountain.jpg');

		//loading images for StartMenu
			this.load.image('titlescreen', 'background/pressAny.jpg');
			this.load.image('buttonStart', 'background/buttonStart.png');
			this.load.image('arrowDown', 'background/arrowDown.png');
			this.load.image('arrowUp', 'background/arrowUp.png')
			this.load.image('arrowLeft', 'background/arrowLeft.png')
			this.load.image('arrowRight', 'background/arrowRight.png')


		//images for map
		this.load.image('tree', 'background/tree.png');
		this.load.image('sign', 'background/sign.png');
		this.load.image('bossSign', 'background/bossSign.png')
		this.load.image('treePlat', 'background/treePlat.png')
		this.load.image('bentBranch', 'background/platLog.png')
		this.load.image('curvedUpBranch', 'background/curvedUpBranch.png')
		this.load.image('cloud', 'background/cloud.png')
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





	},

	scaleSprite: function (sprite, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier) {
		var scale = this.getSpriteScale(sprite._frame.width, sprite._frame.height, availableSpaceWidth, availableSpaceHeight, padding);
		sprite.scale.x = scale * scaleMultiplier;
		sprite.scale.y = scale * scaleMultiplier;
	},
	getSpriteScale: function (spriteWidth, spriteHeight, availableSpaceWidth, availableSpaceHeight, minPadding) {
		var ratio = 1;
		var currentDevicePixelRatio = window.devicePixelRatio;
		// Sprite needs to fit in either width or height
		var widthRatio = (spriteWidth * currentDevicePixelRatio + 2 * minPadding) / availableSpaceWidth;
		var heightRatio = (spriteHeight * currentDevicePixelRatio + 2 * minPadding) / availableSpaceHeight;
		if(widthRatio > 1 || heightRatio > 1){
			ratio = 1 / Math.max(widthRatio, heightRatio);
		}
		return ratio * currentDevicePixelRatio;
	},

	resize: function (width, height) {

		console.log("resize")

		this.scaleSprite(this.titleText, width, height / 3, 50, 1);
		this.titleText.x = this.world.centerX;
		this.titleText.y = this.world.centerY - height / 3;

		this.scaleSprite(this.preloadBar, width, height / 3, 50, 1);
		this.preloadBar.x = this.world.centerX;
		this.preloadBar.y = this.world.centerY ;

	},

	create: function (game) {

		//don't belive I need this line of code. Test after making responsive
		// this.preloadBar.cropEnabled = false;
			this.state.start('StartMenu');




	},

	update: function (){
		this.ready = true;

	}

};
