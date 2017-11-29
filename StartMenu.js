N8.StartMenu = function (game) {

	this.startBG;
	this.startPrompt;
	this.startUp;
	this.about;
	this.down;
	this.up;
	this.left;
	this.right;
	this.ctrls;


};

N8.StartMenu.prototype = {

	create: function (game) {

	    startBG = this.add.image(0, 0, 'titlescreen');

			this.startUp = this.add.image(this.world.centerX-75, this.world.top + 160, 'buttonStart');
			this.startUp.inputEnabled = true;
			this.startUp.events.onInputDown.addOnce(this.startGame, this);

			startBG.height = game.height;
			startBG.width = game.width;


			this.startPrompt = this.add.text(this.world.centerX-500, this.world.top +80,
			'Click start to enter my domain!', {
			font: 'Orbitron',
			fontSize: 80,
			fill: "white"})

			//ctrls
			this.ctrls = this.add.text(this.world.centerX -175, this.world.top + 600, 'Controls', {
				font: 'Orbitron',
				fontSize: 80,
				fill: "white"
			});
			this.down = this.add.image(this.world.centerX -75, this.world.centerY +5, 'arrowDown')
			this.up = this.add.image(this.world.centerX -75, this.world.centerY -95, 'arrowUp')
			this.left = this.add.image(this.world.centerX - 125, this.world.centerY -45, 'arrowLeft')
			this.right = this.add.image(this.world.centerX - 25, this.world.centerY -45,  'arrowRight')

			//about me...add in future...seprate page


	},

	about: function(know){

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
      //
	    // this.BG.width = width;
	    // this.BG.height = height;

	}

};
