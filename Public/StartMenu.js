N8.StartMenu = function (game) {
	this.startBG = null;
	this.startPrompt = null;
	this.startUp = null;
	this.down = null;
	this.up = null;
	this.left = null;
	this.right = null;
	this.ctrls = null;
	this.ready = false;
	this.timer = new Phaser.Timer(game);
};

N8.StartMenu.prototype = {

	preload: function (game) {

		this.scaleRatio = window.devicePixelRatio / 2.5;

		this.startBG = this.add.image(0, 0, 'titlescreen');
		this.startBG.height = this.game.height;
		this.startBG.width = this.game.width;
		this.startPrompt = this.add.text(this.world.centerX - this.world.width / 70, this.world.centerY - this.game.height / 2.45,
			'Click start to enter my domain!', {
				font: "Orbitron",
				fontSize: 39,
				fill: "rgba(255, 255, 255, 1)"
			})
		this.startPrompt.anchor.setTo(.5);
		this.startPrompt.scale.setTo(this.scaleRatio, this.scaleRatio);
		// this.scaleSprite(this.startPrompt, this.width, this.height / 3, 50, 1);

		this.warning = this.add.text(this.world.centerX - this.world.width / 70, this.world.centerY - this.game.height / 9,
			'Landscape must be used for mobile while in game 😬!', {
				font: "Orbitron",
				fontSize: 39,
				fill: "rgba(255, 255, 255, 1)"
			})
		this.warning.anchor.setTo(.5);
		this.warning.scale.setTo(this.scaleRatio, this.scaleRatio);



		this.down = this.add.image(this.world.centerX + TheGame.Params.iconSize / 2, this.world.centerY + this.game.height / 7, 'arrowDown')
		this.down.anchor.setTo(.5);
		this.down.scale.setTo(this.scaleRatio, this.scaleRatio);
		// this.scaleSprite(this.down, this.game.width, this.game.height / 3, 50, .5);
		this.down.x = this.world.centerX - this.down.width / 15;

		//ctrls
		this.ctrls = this.add.text(this.world.centerX - this.world.width / 36, this.world.centerY + this.game.height / 4, 'Controls', {
			font: "Orbitron",
			fontSize: 60,
			fill: "white"
		});
		this.ctrls.anchor.setTo(.5);
		this.ctrls.scale.setTo(this.scaleRatio, this.scaleRatio)
		this.ctrls.x = this.world.centerX - this.down.width / 15;
		// this.scaleSprite(this.startPrompt, this.width, this.height / 3, 50, .5);

		this.startUp = this.add.image(this.world.centerX - TheGame.Params.iconSize / 10, this.world.centerY - this.game.height / 3, 'buttonStart');
		this.startUp.inputEnabled = true;
		this.startUp.events.onInputDown.addOnce(this.startGame, this);
		this.startUp.scale.setTo(this.scaleRatio, this.scaleRatio);
		this.startUp.x = this.world.centerX - this.down.width / 1.6;
		// this.scaleSprite(this.startUp, this.width, this.height / 3, 50, 1);

		this.up = this.add.image(this.world.centerX + TheGame.Params.iconSize / 2, this.world.centerY + this.game.height / 20, 'arrowUp')
		this.up.anchor.setTo(.5);
		this.up.scale.setTo(this.scaleRatio, this.scaleRatio);
		// this.scaleSprite(this.up, this.game.width, this.game.height / 3, 50, .5);
		this.up.x = this.world.centerX - this.up.width / 15;

		this.left = this.add.image(this.world.centerX - TheGame.Params.iconSize / 4, this.world.centerY + this.game.height / 10, 'arrowLeft')
		this.left.anchor.setTo(.5);
		this.left.scale.setTo(this.scaleRatio, this.scaleRatio);
		// this.scaleSprite(this.left, this.game.width, this.game.height / 3, 50, .5);
		this.left.x = this.world.centerX - this.up.width / 1.6;

		this.right = this.add.image(this.world.centerX + TheGame.Params.iconSize / 35, this.world.centerY + this.game.height / 10, 'arrowRight')
		this.right.anchor.setTo(.5);
		this.right.scale.setTo(this.scaleRatio, this.scaleRatio);
		// this.scaleSprite(this.right, this.game.width, this.game.height / 3, 50, .5);
		this.right.x = this.world.centerX + this.up.width / 1.99;
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
		if (widthRatio > 1 || heightRatio > 1) {
			ratio = 1 / Math.max(widthRatio, heightRatio);
		}
		return ratio * currentDevicePixelRatio;
	},

	resize: function (width, height) {
		this.startBG.height = height;
		this.startBG.width = width;

		this.scaleSprite(this.startUp, width, height / 3, 50, 1);
		this.startUp.x = this.world.centerX - this.down.width / .93;
		this.startUp.y = this.world.centerY - height / 3;

		this.scaleSprite(this.ctrls, width, height / 3, 50, 1);
		this.ctrls.x = this.world.centerX;
		this.ctrls.y = this.world.centerY + height / 4.5;

		this.scaleSprite(this.startPrompt, width, height / 3, 50, .85);
		this.startPrompt.x = this.world.centerX;
		this.startPrompt.y = this.world.centerY - height / 3;

		this.scaleSprite(this.warning, width, height / 3, 50, .85);
		this.warning.x = this.world.centerX - this.world.width / 70;
		this.warning.y = this.world.centerY - this.game.height / 9;


		this.scaleSprite(this.down, width, height / 3, 50, .5);
		this.down.x = this.world.centerX - this.down.width / 20;
		this.down.y = this.world.centerY + height / 8;

		this.scaleSprite(this.up, width, height / 3, 50, .5);
		this.up.x = this.world.centerX - this.down.width / 20;
		this.up.y = this.world.centerY + height / 30;

		this.scaleSprite(this.left, width, height / 3, 50, .5);
		this.left.x = this.world.centerX - this.down.width / 1.35;
		this.left.y = this.world.centerY + height / 13;

		this.scaleSprite(this.right, width, height / 3, 50, .5);
		this.right.x = this.world.centerX + this.down.width / 1.6;
		this.right.y = this.world.centerY + height / 13;

	},
	create: function (game) {
	},
	startGame: function (pointer) {
		this.state.start('Game');
	},
	update: function () {
		this.ready = true;
	},
};