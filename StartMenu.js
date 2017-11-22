N8.StartMenu = function (game) {

	this.startBG;
	this.startPrompt;


};

N8.StartMenu.prototype = {

	create: function (game) {

	    startBG = this.add.image(0, 0, 'titlescreen');
			startBG.inputEnabled = true;
			startBG.events.onInputDown.addOnce(this.startGame, this);

			startBG.height = game.height;
			startBG.width = game.width;

			startPrompt = this.add.text(this.world.centerX-410, this.world.centerY-180,
			'Press any key to enter my domain!', {
				font: '60px Orbitron',
				fill: "#fff"});


	},


	startGame: function (pointer) {
		this.state.start('Game');
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	resize: function (width, height) {

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

	    this.BG.width = width;
	    this.BG.height = height;

	}

};
