N8.Game = function (game) {
  this.ninja;
  this.finalBoss;
  this.portalGroup;
  this.signGroup;
  this.treeGroup;
  this.glowGroup;
  this.bossWalls;
  this.platformGroup;
  this.healthText;
  this.ninjaHealth = 9999;
  this.bossHealth = 500;
  this.bossLives = 3;
  this.sign;
  this.deathRefresh;
  this.mute;
  this.unmute;
  this.signLeft;
  this.cursors;
  this.themeSong;
  this.teleport;
  this.winner;
  this.left;
  this.right;
  this.down;
  this.up;

};

N8.Game.prototype = {
  create: function (game) {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.board
    this.buildWorld(game);
    this.addSprites(game);
    this.mobile(game);
  },
  buildWorld: function (game) {
    //main board features
    this.board = this.add.image(0, 0, 'mountain')
    this.board.height = game.height;
    this.board.width = game.width;
    //music
    this.teleport = this.add.audio('teleport');
    this.winner = this.add.audio('winner');
    this.themeSong = this.add.audio('themeSong');
    //play & pause (functions below)
    this.unmute = this.add.image(this.world.centerX + this.game.width / 2.37, this.world.centerY - this.game.height / 2.09, 'unmute')
    this.scaleSprite(this.unmute, this.width, this.height / 3, 50, .25);
    this.mute = this.add.image(this.world.centerX + this.game.width / 2.37, this.world.centerY - this.game.height / 2.09, 'mute')
    this.mute.inputEnabled = true;
    this.mute.events.onInputDown.addOnce(this.provideSound, this);
    this.scaleSprite(this.mute, this.width, this.height / 3, 50, .25);
    //seprate group for z-index & no collison
    this.treeGroup = this.add.group();
    this.treeGroup.enableBody = true;
    //signs
    this.signGroup = this.add.group();
    this.signGroup.enableBody = true;
    //board itself
    this.platformGroup = this.add.group();
    this.platformGroup.enableBody = true;
    //portal group..similar to the tree treeGroup
    this.portalGroup = this.add.group();
    this.portalGroup.enableBody = true;
    //boss platform
    this.glowGroup = this.add.group();
    this.glowGroup.enableBody = true;
    //boss bossWalls
    this.bossWalls = this.add.group();
    this.bossWalls.enableBody = true;
    //healthText
    this.healthText = this.add.text(this.world.centerX - this.game.width / 2.07, this.world.centerY - this.game.height / 2.09, 'Health: 9999', {
      font: "Orbitron",
      fontSize: '30px',
      fill: 'red'
    });
    this.scaleSprite(this.healthText, this.width, this.height / 3, 50, .25);
    //tree of mana
    this.tree = this.treeGroup.create(this.world.centerX - this.game.height / 5, this.world.centerY + this.game.height / 4.3, 'tree');
    this.tree.body.immovable = true;
    // this.tree.enableBody = false;
    this.scaleSprite(this.tree, this.width, this.height / 3, 50, 1);
    //branch platforms
    this.treePlat = this.platformGroup.create(this.world.centerX - this.game.height / 10, this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat, this.width, this.height / 3, 50, 1.2);
    this.treePlat2 = this.platformGroup.create(this.world.centerX - this.game.height / 10 + (this.treePlat.width), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat2, this.width, this.height / 3, 50, 1.2);
    this.treePlat3 = this.platformGroup.create(this.world.centerX - this.game.height / 10 + (this.treePlat.width * 2), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat3, this.width, this.height / 3, 50, 1.2);
    this.treePlat4 = this.platformGroup.create(this.world.centerX - this.game.height / 10 + (this.treePlat.width * 3), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat4, this.width, this.height / 3, 50, 1.2);
    this.treePlat5 = this.platformGroup.create(this.world.centerX - this.game.height / 10 + (this.treePlat.width * 4), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat5, this.width, this.height / 3, 50, 1.2);
    this.treePlat6 = this.platformGroup.create(this.world.centerX - this.game.height / 10 + (this.treePlat.width * 5), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat6, this.width, this.height / 3, 50, 1.2);
    this.treePlat7 = this.platformGroup.create(this.world.centerX - this.game.height / 10 + (this.treePlat.width * 6), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat7, this.width, this.height / 3, 50, 1.2);
    this.treePlat8 = this.platformGroup.create(this.world.centerX - this.game.height / 10 + (this.treePlat.width * 7), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat8, this.width, this.height / 3, 50, 1.2);
    this.treePlat9 = this.platformGroup.create(this.world.centerX - this.game.height / 10 + (this.treePlat.width * 8), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat9, this.width, this.height / 3, 50, 1.2);
    this.treePlat10 = this.platformGroup.create(this.world.centerX - this.game.height / 10 + (this.treePlat.width * 9), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat10, this.width, this.height / 3, 50, 1.2);
    this.treePlat11 = this.platformGroup.create(this.world.centerX - this.game.height / 10 + (this.treePlat.width * 10), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlat11, this.width, this.height / 3, 50, 1.2)
    this.treePlatLeft = this.platformGroup.create(this.world.centerX - this.game.height / 10 - this.treePlat.width, this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlatLeft, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft2 = this.platformGroup.create(this.world.centerX - this.game.height / 10 - (this.treePlat.width * 2), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlatLeft2, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft3 = this.platformGroup.create(this.world.centerX - this.game.height / 10 - (this.treePlat.width * 3), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlatLeft3, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft4 = this.platformGroup.create(this.world.centerX - this.game.height / 10 - (this.treePlat.width * 4), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlatLeft4, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft5 = this.platformGroup.create(this.world.centerX - this.game.height / 10 - (this.treePlat.width * 5), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlatLeft5, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft6 = this.platformGroup.create(this.world.centerX - this.game.height / 10 - (this.treePlat.width * 6), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlatLeft6, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft7 = this.platformGroup.create(this.world.centerX - this.game.height / 10 - (this.treePlat.width * 7), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlatLeft7, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft8 = this.platformGroup.create(this.world.centerX - this.game.height / 10 - (this.treePlat.width * 8), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlatLeft8, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft9 = this.platformGroup.create(this.world.centerX - this.game.height / 10 - (this.treePlat.width * 9), this.world.centerY + this.game.height / 2.17, 'bentBranch');
    this.scaleSprite(this.treePlatLeft9, this.width, this.height / 3, 50, 1.2);
    this.treePlat.enableBody = true;
    this.treePlat.body.immovable = true;
    this.treePlat2.enableBody = true;
    this.treePlat2.body.immovable = true;
    this.treePlat3.enableBody = true;
    this.treePlat3.body.immovable = true;
    this.treePlat4.enableBody = true;
    this.treePlat4.body.immovable = true;
    this.treePlat5.enableBody = true;
    this.treePlat5.body.immovable = true;
    this.treePlat6.enableBody = true;
    this.treePlat6.body.immovable = true;
    this.treePlat7.enableBody = true;
    this.treePlat7.body.immovable = true;
    this.treePlat8.enableBody = true;
    this.treePlat8.body.immovable = true;
    this.treePlat9.enableBody = true;
    this.treePlat9.body.immovable = true;
    this.treePlat10.enableBody = true;
    this.treePlat10.body.immovable = true;
    this.treePlat11.enableBody = true;
    this.treePlat11.body.immovable = true;
    this.treePlatLeft.enableBody = true;
    this.treePlatLeft.body.immovable = true;
    this.treePlatLeft2.enableBody = true;
    this.treePlatLeft2.body.immovable = true;
    this.treePlatLeft3.enableBody = true;
    this.treePlatLeft3.body.immovable = true;
    this.treePlatLeft4.enableBody = true;
    this.treePlatLeft4.body.immovable = true;
    this.treePlatLeft5.enableBody = true;
    this.treePlatLeft5.body.immovable = true;
    this.treePlatLeft6.enableBody = true;
    this.treePlatLeft6.body.immovable = true;
    this.treePlatLeft7.enableBody = true;
    this.treePlatLeft7.body.immovable = true;
    this.treePlatLeft8.enableBody = true;
    this.treePlatLeft8.body.immovable = true;
    this.treePlatLeft9.enableBody = true;
    this.treePlatLeft9.body.immovable = true;
    //clouds for right side
    this.cloudPlat = this.platformGroup.create(this.world.centerX - this.game.height / 5, this.world.centerY + this.game.height / 3, 'cloud');
    this.scaleSprite(this.cloudPlat, this.width, this.height / 3, 50, .05);
    this.cloudPlat2 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width), this.world.centerY + this.game.height / 3, 'cloud');
    this.scaleSprite(this.cloudPlat2, this.width, this.height / 3, 50, .05);
    this.cloudPlat3 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width * 2), this.world.centerY + this.game.height / 3, 'cloud');
    this.scaleSprite(this.cloudPlat3, this.width, this.height / 3, 50, .05);
    this.cloudPlat4 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width * 3), this.world.centerY + this.game.height / 3, 'cloud');
    this.scaleSprite(this.cloudPlat4, this.width, this.height / 3, 50, .05);
    this.cloudPlat5 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width * 9), this.world.centerY + this.game.height / 3, 'cloud');
    this.scaleSprite(this.cloudPlat5, this.width, this.height / 3, 50, .05);
    this.cloudPlat6 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width * 10), this.world.centerY + this.game.height / 3, 'cloud');
    this.scaleSprite(this.cloudPlat6, this.width, this.height / 3, 50, .05);
    this.cloudPlat7 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width * 11), this.world.centerY + this.game.height / 3, 'cloud');
    this.scaleSprite(this.cloudPlat7, this.width, this.height / 3, 50, .05);
    this.cloudPlat8 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width * 12), this.world.centerY + this.game.height / 3, 'cloud');
    this.scaleSprite(this.cloudPlat8, this.width, this.height / 3, 50, .05);
    this.cloudPlat9 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width * 12), this.world.centerY + this.game.height / 5.2, 'cloud');
    this.scaleSprite(this.cloudPlat9, this.width, this.height / 3, 50, .05);
    this.cloudPlat10 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width * 11), this.world.centerY + this.game.height / 5.2, 'cloud');
    this.scaleSprite(this.cloudPlat10, this.width, this.height / 3, 50, .05);
    this.cloudPlat11 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width * 13), this.world.centerY + this.game.height / 18, 'cloud');
    this.scaleSprite(this.cloudPlat11, this.width, this.height / 3, 50, .05);
    this.cloudPlat12 = this.platformGroup.create(this.world.centerX - this.game.height / 5 + (this.cloudPlat.width * 5), this.world.centerY + this.game.height / 18, 'cloud');
    this.scaleSprite(this.cloudPlat12, this.width, this.height / 3, 50, .05);
    this.cloudPlat.enableBody = true;
    this.cloudPlat2.enableBody = true;
    this.cloudPlat3.enableBody = true;
    this.cloudPlat4.enableBody = true;
    this.cloudPlat5.enableBody = true;
    this.cloudPlat6.enableBody = true;
    this.cloudPlat7.enableBody = true;
    this.cloudPlat8.enableBody = true;
    this.cloudPlat9.enableBody = true;
    this.cloudPlat10.enableBody = true;
    this.cloudPlat11.enableBody = true;
    this.cloudPlat12.enableBody = true;
    this.cloudPlat.body.immovable = true;
    this.cloudPlat2.body.immovable = true;
    this.cloudPlat3.body.immovable = true;
    this.cloudPlat4.body.immovable = true;
    this.cloudPlat5.body.immovable = true;
    this.cloudPlat6.body.immovable = true;
    this.cloudPlat7.body.immovable = true;
    this.cloudPlat8.body.immovable = true;
    this.cloudPlat9.body.immovable = true;
    this.cloudPlat10.body.immovable = true;
    this.cloudPlat11.body.immovable = true;
    this.cloudPlat12.body.immovable = true;

    //clouds for left inside
    this.cloudPlatLeft = this.platformGroup.create(this.world.centerX - this.game.height / 5 - (this.cloudPlat.width * 4), this.world.centerY + this.game.height / 5.2, 'cloud');
    this.scaleSprite(this.cloudPlatLeft, this.width, this.height / 3, 50, .05);

    this.cloudPlatLeft2 = this.platformGroup.create(this.world.centerX - this.game.height / 5 - (this.cloudPlat.width * 5), this.world.centerY + this.game.height / 5.2, 'cloud');
    this.scaleSprite(this.cloudPlatLeft2, this.width, this.height / 3, 50, .05);

    this.cloudPlatLeft3 = this.platformGroup.create(this.world.centerX - this.game.height / 5 - (this.cloudPlat.width * 6), this.world.centerY + this.game.height / 18, 'cloud');
    this.scaleSprite(this.cloudPlatLeft3, this.width, this.height / 3, 50, .05);

    this.cloudPlatLeft4 = this.platformGroup.create(this.world.centerX - this.game.height / 5 - (this.cloudPlat.width * 5), this.world.centerY + this.game.height / 18, 'cloud');
    this.scaleSprite(this.cloudPlatLeft4, this.width, this.height / 3, 50, .05);

    this.cloudPlatLeft5 = this.platformGroup.create(this.world.centerX - this.game.height / 5 - (this.cloudPlat.width * 6), this.world.centerY + this.game.height / 18, 'cloud');
    this.scaleSprite(this.cloudPlatLeft5, this.width, this.height / 3, 50, .05);

    this.cloudPlatLeft6 = this.platformGroup.create(this.world.centerX - this.game.height / 5 - (this.cloudPlat.width * 7), this.world.centerY + this.game.height / 18, 'cloud');
    this.scaleSprite(this.cloudPlatLeft6, this.width, this.height / 3, 50, .05);

    this.cloudPlatLeft7 = this.platformGroup.create(this.world.centerX - this.game.height / 5 - (this.cloudPlat.width * 8), this.world.centerY + this.game.height / 18, 'cloud');
    this.scaleSprite(this.cloudPlatLeft7, this.width, this.height / 3, 50, .05);

    this.cloudPlatLeft8 = this.platformGroup.create(this.world.centerX - this.game.height / 5 - (this.cloudPlat.width * 9), this.world.centerY + this.game.height / 18, 'cloud');
    this.scaleSprite(this.cloudPlatLeft8, this.width, this.height / 3, 50, .05);

    this.cloudPlatLeft9 = this.platformGroup.create(this.world.centerX - this.game.height / 5 - (this.cloudPlat.width * 10), this.world.centerY + this.game.height / 18, 'cloud');
    this.scaleSprite(this.cloudPlatLeft9, this.width, this.height / 3, 50, .05);

    this.cloudPlatLeft10 = this.platformGroup.create(this.world.centerX - this.game.height / 5 - (this.cloudPlat.width * 11), this.world.centerY + this.game.height / 18, 'cloud');
    this.scaleSprite(this.cloudPlatLeft10, this.width, this.height / 3, 50, .05);

    this.cloudPlatLeft.enableBody = true;
    this.cloudPlatLeft.body.immovable = true;
    this.cloudPlatLeft2.enableBody = true;
    this.cloudPlatLeft2.body.immovable = true;
    this.cloudPlatLeft3.enableBody = true;
    this.cloudPlatLeft4.enableBody = true;
    this.cloudPlatLeft.body.immovable = true;
    this.cloudPlatLeft2.body.immovable = true;
    this.cloudPlatLeft3.body.immovable = true;
    this.cloudPlatLeft4.body.immovable = true;

    //refresh antics
    this.deathRefresh = this.add.image(this.world.centerX - this.cloudPlat.width, this.world.centerY + this.game.height / 10, 'refresh');
    this.scaleSprite(this.deathRefresh, this.width, this.height / 3, 50, .25);
    this.deathRefresh.kill();


    //portals to portfolio & resume
    this.resume = this.portalGroup.create(this.world.centerX + this.game.height / 3, this.world.centerY + this.game.height / 3.4, 'blueStar');
    this.scaleSprite(this.resume, this.width, this.height / 3, 50, .2);
    this.resume.inputEnabled = true;
    this.resume.events.onInputDown.addOnce(this.visitResume, this)

    this.port = this.portalGroup.create(this.world.centerX - this.game.height / 1.4, this.world.centerY + this.game.height / 4, 'purpleStar');
    this.scaleSprite(this.port, this.width, this.height / 3, 50, .5);
    this.port.inputEnabled = true;
    this.port.events.onInputDown.addOnce(this.visitPort, this);

    this.resume.enableBody = true;
    this.port.enableBody = true;
    this.resume.body.immovable = true;
    this.port.body.immovable = true;

    //signs and health bars
    this.sign = this.signGroup.create(this.world.centerX + this.game.height / 6, this.world.centerY + this.game.height / 3, 'sign');
    this.scaleSprite(this.sign, this.width, this.height / 3, 50, 4);
    this.signResume = this.add.text(this.world.centerX + this.game.height / 5.5, this.world.centerY + this.game.height / 2.7, 'Resume -->', {
      font: "Orbitron",
      fontSize: '15px',
      fill: 'White'
    });
    this.scaleSprite(this.signResume, this.width, this.height / 3, 50, .5);

    this.signLeft = this.signGroup.create(this.world.centerX - this.game.height / 2.9, this.world.centerY + this.game.height / 3, 'sign');
    this.scaleSprite(this.signLeft, this.width, this.height / 3, 50, 4);
    this.signPort = this.add.text(this.world.centerX - this.game.height / 3, this.world.centerY + this.game.height / 2.7, '<-- Portfolio', {
      font: "Orbitron",
      fontSize: '15px',
      fill: 'White'
    });
    this.scaleSprite(this.signPort, this.width, this.height / 3, 50, .5);

    this.signBoss = this.signGroup.create(this.world.centerX - this.cloudPlat.width * 6, this.world.centerY + this.game.height / 16, 'bossSign');
    this.scaleSprite(this.signBoss, this.width, this.height / 3, 50, 1.1);
    this.signBossText = this.add.text(this.world.centerX - this.cloudPlat.width * 5, this.world.centerY + this.game.height / 9, 'Boss Fight ^', {
      font: "Orbitron",
      fontSize: '14px',
      fill: 'white'
    });
    this.scaleSprite(this.signBossText, this.width, this.height / 3, 50, .4);
    this.signBossText2 = this.add.text(this.world.centerX - this.cloudPlat.width * 4, this.world.centerY + this.game.height / 5.5, 'GL, HF!', {
      font: "Orbitron",
      fontSize: '14px',
      fill: 'White'
    });
    this.scaleSprite(this.signBossText2, this.width, this.height / 3, 50, .4)

    //victory text  && death text
    this.victoryText = this.add.text(this.world.centerX - this.cloudPlat.width * 10, this.world.centerY + this.game.height / 26, "Victory! Now visit my resume or portfolio portals.", {
      font: "18px Orbitron",
      fill: "black"
    });
    this.scaleSprite(this.victoryText, this.width, this.height / 3, 50, .4);
    this.victoryText.kill();

    this.deathText = this.add.text(this.world.centerX - this.cloudPlat.width * 10, this.world.centerY + this.game.height / 26, "You're courageous, but lacking skill!", {
      font: "24px Orbitron",
      fill: "red",
      align: "center"
    });
    this.scaleSprite(this.deathText, this.width, this.height / 3, 50, .39);
    this.deathText.kill();



    //holy platfrom for boss fight
    this.glow = this.glowGroup.create(this.world.centerX - this.game.height / 3.3, this.world.centerY - this.game.height / 12, 'glow')
    this.scaleSprite(this.glow, this.width, this.height / 3, 50, .1);
    this.glow2 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width), this.world.centerY - this.game.height / 12, 'glow')
    this.scaleSprite(this.glow2, this.width, this.height / 3, 50, .1);
    this.glow3 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 2), this.world.centerY - this.game.height / 12, 'glow')
    this.scaleSprite(this.glow3, this.width, this.height / 3, 50, .1);
    this.glow4 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 3), this.world.centerY - this.game.height / 12, 'glow')
    this.scaleSprite(this.glow4, this.width, this.height / 3, 50, .1);
    this.glow5 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 4), this.world.centerY - this.game.height / 12, 'glow')
    this.scaleSprite(this.glow5, this.width, this.height / 3, 50, .1);
    this.glow6 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5), this.world.centerY - this.game.height / 12, 'glow')
    this.scaleSprite(this.glow6, this.width, this.height / 3, 50, .1);
    this.glow7 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5), this.world.centerY - this.game.height / 12 - this.glow.height, 'glow')
    this.scaleSprite(this.glow7, this.width, this.height / 3, 50, .1);
    this.glow8 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5), this.world.centerY - this.game.height / 12 - (this.glow.height * 2), 'glow')
    this.scaleSprite(this.glow8, this.width, this.height / 3, 50, .1);
    this.glow9 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5), this.world.centerY - this.game.height / 12 - (this.glow.height * 3), 'glow')
    this.scaleSprite(this.glow9, this.width, this.height / 3, 50, .1);
    this.glow10 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5), this.world.centerY - this.game.height / 12 - (this.glow.height * 4), 'glow')
    this.scaleSprite(this.glow10, this.width, this.height / 3, 50, .1);
    this.glow11 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5), this.world.centerY - this.game.height / 12 - (this.glow.height * 5), 'glow')
    this.scaleSprite(this.glow11, this.width, this.height / 3, 50, .1);
    this.glow12 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5), this.world.centerY - this.game.height / 12 - (this.glow.height * 6), 'glow')
    this.scaleSprite(this.glow12, this.width, this.height / 3, 50, .1);
    this.glow13 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5), this.world.centerY - this.game.height / 12 - (this.glow.height * 7), 'glow')
    this.scaleSprite(this.glow13, this.width, this.height / 3, 50, .1);
    this.glow14 = this.glowGroup.create(this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5), this.world.centerY - this.game.height / 12 - (this.glow.height * 8), 'glow')
    this.scaleSprite(this.glow14, this.width, this.height / 3, 50, .1);



    this.glow.enableBody = true;
    this.glow.body.immovable = true;
    this.glow2.enableBody = true;
    this.glow3.enableBody = true;
    this.glow4.enableBody = true;
    this.glow5.enableBody = true;
    this.glow6.enableBody = true;
    this.glow7.enableBody = true;
    this.glow8.enableBody = true;
    this.glow9.enableBody = true;
    this.glow10.enableBody = true;
    this.glow11.enableBody = true;
    this.glow12.enableBody = true;
    this.glow13.enableBody = true;
    this.glow14.enableBody = true;
    this.glow2.body.immovable = true;
    this.glow3.body.immovable = true;
    this.glow4.body.immovable = true;
    this.glow5.body.immovable = true;
    this.glow6.body.immovable = true;
    this.glow7.body.immovable = true;
    this.glow8.body.immovable = true;
    this.glow9.body.immovable = true;
    this.glow10.body.immovable = true;
    this.glow11.body.immovable = true;
    this.glow12.body.immovable = true;
    this.glow13.body.immovable = true;
    this.glow14.body.immovable = true;



    this.container = this.bossWalls.create(this.world.centerX - this.game.height / 3, this.world.centerY - (this.glow.height * 5.5), 'container');
    this.scaleSprite(this.container, this.width, this.height / 3, 50, .39);
    this.container2 = this.bossWalls.create(this.world.centerX - this.game.height / 3, this.world.centerY - (this.glow.height * 5.5) - (this.container.height), 'container');
    this.scaleSprite(this.container2, this.width, this.height / 3, 50, .39);



    this.container.enableBody = true;
    this.container2.enableBody = true;
    this.container.body.immovable = true;
    this.container2.body.immovable = true;

    this.left = this.add.image(this.world.centerX + this.game.height / 12, this.world.centerY + this.game.height / 5, "arrowLeft");
    this.scaleSprite(this.left, this.width, this.height / 3, 50, .3);
    this.left.inputEnabled = true;
    this.left.events.onInputDown.add(this.moveLeft, this);
    this.left.kill();
    this.right = this.add.image(this.world.centerX + this.game.height / 6.4, this.world.centerY + this.game.height / 5, "arrowRight");
    this.scaleSprite(this.right, this.width, this.height / 3, 50, .3);
    this.right.inputEnabled = true;
    this.right.events.onInputDown.add(this.moveRight, this);
    this.right.kill();
    this.up = this.add.image(this.world.centerX + this.game.height / 8.5, this.world.centerY + this.game.height / 6, "arrowUp")
    this.scaleSprite(this.up, this.width, this.height / 3, 50, .3);
    this.up.inputEnabled = true;
    this.up.events.onInputDown.add(this.jump, this);
    this.up.kill();
    this.down = this.add.image(this.world.centerX + this.game.height / 8.5, this.world.centerY + this.game.height / 4.3, "arrowDown")
    this.scaleSprite(this.down, this.width, this.height / 3, 50, .3);
    this.down.kill();
    this.down.inputEnabled = true;
    this.down.events.onInputDown.add(this.stop, this);

    this.cursors = this.input.keyboard.createCursorKeys();

  },

  visitPort: function (game) {

    window.location.href = "portfolio.html"

  },

  visitResume: function (game) {

    window.location.href = "resume.html"

  },

  provideSound: function (game) {
    this.themeSong = this.add.audio('themeSong');
    this.themeSong.play();
    //sound icons
    this.mute.kill()
    this.unmute.kill();
    this.unmute = this.add.image(this.world.centerX + this.game.width / 2.37, this.world.centerY - this.game.height / 2.09, 'unmute')
    this.scaleSprite(this.unmute, this.width, this.height / 3, 50, .25);
    this.unmute.inputEnabled = true;
    this.unmute.events.onInputDown.addOnce(this.silence, this);
  },

  silence: function (game) {
    this.themeSong.pause();
    this.unmute.kill();
    this.mute.kill();
    this.mute = this.add.image(this.world.centerX + this.game.width / 2.37, this.world.centerY - this.game.height / 2.09, 'mute')
    this.scaleSprite(this.mute, this.width, this.height / 3, 50, .25);
    this.mute.inputEnabled = true;
    this.mute.events.onInputDown.addOnce(this.provideSound, this);

  },

  deathRefreshF: function (game) {
    if (this.ninjaHealth == 0 || this.ninjaHealth < 0) {
      this.deathRefresh.reset(this.world.centerX - this.cloudPlat.width, this.world.centerY + this.game.height / 10);
      this.deathRefresh.inputEnabled = true;
      this.deathRefresh.events.onInputDown.addOnce(this.reload, this);
    }
  },

  reload: function (game) {
    window.location.href = "index.html";
  },


  addSprites: function (game) {
    this.ninja = this.add.sprite(this.world.centerX - this.game.height / 10, this.world.centerY + this.game.height / 3.0, 'ninjaRun')
    this.scaleSprite(this.ninja, this.width, this.height / 3, 50, .5)
    this.physics.arcade.enable(this.ninja);
    this.ninja.body.bounce.y = 0.2;
    this.ninja.body.gravity.y = 300;
    this.ninja.body.collideWorldBounds = true;
    this.ninja.animations.add('right', [0, 1, 2], 5, true);
    this.ninja.animations.add('left', [2, 1, 2], 5, true);
    this.ninja.animations.add('rightMobile', [0, 1, 2], 30, true);
    this.ninja.animations.add('leftMobile', [2, 1, 2], 30, true);

    // //ninja death future implementation
    // this.deadNinja = this.add.sprite(this.world.centerX + 115, this.world.bottom -300, 'ninjaRun')
    // this.deadNinja.scale.x = 2;
    // this.deadNinja.scale.y = 2;
    // this.physics.arcade.enable(this.deadNinja);
    // this.deadNinja.body.bounce.y = 0.2;
    // this.deadNinja.body.gravity.y = 300;
    // this.deadNinja.body.collideWorldBounds = true;
    // this.deadNinja.animations.add('right', [0, 1, 2, 3], 5, true);
    // this.deadNinja.animations.add('left', [0, 1, 2, 3], 5, true);

    //boss
    this.boss = this.add.sprite(this.world.centerX - this.game.height / 4, this.world.centerY - this.game.height / 3.0, 'finalBoss')
    this.scaleSprite(this.boss, this.width, this.height / 3, 50, .35)
    this.physics.arcade.enable(this.boss);
    this.boss.enableBody = true;
    this.boss.body.velocity.setTo(298, 280);
    this.boss.body.bounce.set(1);
    this.boss.animations.add('left', [0, 1, 2], 7, false);
    this.boss.animations.add('right', [0, 1, 2], 7, false);
    this.boss.body.collideWorldBounds = true;
    this.boss.body.gravity.y = 150;

  },

  viewport: function () {
    var e = window,
      a = 'inner';
    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    return {
      width: e[a + 'Width'],
      height: e[a + 'Height']
    }
  },

  mobile: function (game) {

    if (this.viewport(game).width <= 640 && this.viewport(game).height <= 960) {
      console.log("mobile")


      //    buttonleft = game.add.button(0, 472, 'buttonhorizontal', null, this, 0, 1, 0, 1);
      this.left.reset(this.world.centerX + this.game.height / 12, this.world.centerY + this.game.height / 5, "arrowLeft");

      this.right.reset(this.world.centerX + this.game.height / 6.4, this.world.centerY + this.game.height / 5, "arrowRight");

      this.up.reset(this.world.centerX + this.game.height / 8.5, this.world.centerY + this.game.height / 6, "arrowUp");

      this.down.reset(this.world.centerX + this.game.height / 8.5, this.world.centerY + this.game.height / 4.3, "arrowDown");



    } else if (!this.viewport(game).width <= 640 && !this.viewport(game).height <= 960) {
      this.left.kill();
      this.right.kill();
      this.down.kill();
      this.up.kill();
    }
  },


  moveLeft: function (game) {
    console.log("left")

    //  Move to the left
    this.ninja.body.velocity.x = -1200;


    this.ninja.animations.play('leftMobile');
    this.ninja.scale.setTo(-1, 1);
  },
  moveRight: function (game) {

    //  Move to the right
    this.ninja.body.velocity.x = 1200;

    this.ninja.animations.play('rightMobile');
    this.ninja.scale.setTo(1, 1);

  },
  stop: function (game) {

    this.ninja.body.velocity.x = 0;

    //  Stand still
    this.ninja.animations.stop();

    this.ninja.frame = 0;
  },

  jump: function (game) {
    //  Allow the player to jump if they are touching the ground.

    this.ninja.body.velocity.y = -259;



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

    this.board.height = height;
    this.board.width = width;

    this.scaleSprite(this.ninja, width, height / 3, 50, .5);
    this.ninja.x = this.world.centerX - this.game.height / 8;
    this.ninja.y = this.world.centerY + this.game.height / 3;

    this.scaleSprite(this.mute, this.width, this.height / 3, 50, .25);
    this.mute.x = this.world.centerX + this.game.width / 2.37;
    this.mute.y = this.world.centerY - this.game.height / 2.09;

    this.scaleSprite(this.unmute, this.width, this.height / 3, 50, .25);
    this.unmute.x = this.world.centerX + this.game.width / 2.37;
    this.unmute.y = this.world.centerY - this.game.height / 2.09;



    this.scaleSprite(this.healthText, this.width, this.height / 3, 50, .25);
    this.healthText.x = this.world.centerX - this.board.width / 2.4;
    this.healthText.y = this.world.centerY - height / 2;

    this.scaleSprite(this.tree, this.width, this.height / 3, 50, 1);
    this.tree.x = this.world.centerX - this.mute.width / .3;
    this.tree.y = this.world.centerY + height / 4;

    this.scaleSprite(this.treePlat, this.width, this.height / 3, 50, 1.2);
    this.treePlat.x = this.world.centerX - this.mute.width / .42;
    this.treePlat.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlat2, this.width, this.height / 3, 50, 1.2);
    this.treePlat2.x = this.world.centerX - this.mute.width / .42 + this.treePlat.width;
    this.treePlat2.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlat3, this.width, this.height / 3, 50, 1.2);
    this.treePlat3.x = this.world.centerX - this.mute.width / .42 + (this.treePlat.width * 2);
    this.treePlat3.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlat4, this.width, this.height / 3, 50, 1.2);
    this.treePlat4.x = this.world.centerX - this.mute.width / .42 + (this.treePlat.width * 3);
    this.treePlat4.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlat5, this.width, this.height / 3, 50, 1.2);
    this.treePlat5.x = this.world.centerX - this.mute.width / .42 + (this.treePlat.width * 4);
    this.treePlat5.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlat6, this.width, this.height / 3, 50, 1.2);
    this.treePlat6.x = this.world.centerX - this.mute.width / .42 + (this.treePlat.width * 5);
    this.treePlat6.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlat7, this.width, this.height / 3, 50, 1.2);
    this.treePlat7.x = this.world.centerX - this.mute.width / .42 + (this.treePlat.width * 6);
    this.treePlat7.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlat8, this.width, this.height / 3, 50, 1.2);
    this.treePlat8.x = this.world.centerX - this.mute.width / .42 + (this.treePlat.width * 7);
    this.treePlat8.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlat9, this.width, this.height / 3, 50, 1.2);
    this.treePlat9.x = this.world.centerX - this.mute.width / .42 + (this.treePlat.width * 8);
    this.treePlat9.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlat10, this.width, this.height / 3, 50, 1.2);
    this.treePlat10.x = this.world.centerX - this.mute.width / .42 + (this.treePlat.width * 9);
    this.treePlat10.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlat11, this.width, this.height / 3, 50, 1.2);
    this.treePlat11.x = this.world.centerX - this.mute.width / .42 + (this.treePlat.width * 10);
    this.treePlat11.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlatLeft, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft.x = this.world.centerX - this.mute.width / .42 - this.treePlat.width;
    this.treePlatLeft.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlatLeft2, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft2.x = this.world.centerX - this.mute.width / .42 - (this.treePlat.width * 2);
    this.treePlatLeft2.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlatLeft3, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft3.x = this.world.centerX - this.mute.width / .42 - (this.treePlat.width * 3);
    this.treePlatLeft3.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlatLeft4, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft4.x = this.world.centerX - this.mute.width / .42 - (this.treePlat.width * 4);
    this.treePlatLeft4.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlatLeft5, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft5.x = this.world.centerX - this.mute.width / .42 - (this.treePlat.width * 5);
    this.treePlatLeft5.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlatLeft6, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft6.x = this.world.centerX - this.mute.width / .42 - (this.treePlat.width * 6);
    this.treePlatLeft6.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlatLeft7, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft7.x = this.world.centerX - this.mute.width / .42 - (this.treePlat.width * 7);
    this.treePlatLeft7.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlatLeft8, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft8.x = this.world.centerX - this.mute.width / .42 - (this.treePlat.width * 8);
    this.treePlatLeft8.y = this.world.centerY + height / 2.2;

    this.scaleSprite(this.treePlatLeft9, this.width, this.height / 3, 50, 1.2);
    this.treePlatLeft9.x = this.world.centerX - this.mute.width / .42 - (this.treePlat.width * 9);
    this.treePlatLeft9.y = this.world.centerY + height / 2.2;

    //cloud scaling such fun...fuck me left side of tree
    this.scaleSprite(this.cloudPlat, this.width, this.height / 3, 50, .05);
    this.cloudPlat.x = this.world.centerX - this.mute.width / .3;
    this.cloudPlat.y = this.world.centerY + height / 2.95;

    this.scaleSprite(this.cloudPlat2, this.width, this.height / 3, 50, .05);
    this.cloudPlat2.x = this.world.centerX - this.mute.width / .3 + (this.cloudPlat.width);
    this.cloudPlat2.y = this.world.centerY + height / 2.95;

    this.scaleSprite(this.cloudPlat3, this.width, this.height / 3, 50, .05);
    this.cloudPlat3.x = this.world.centerX - this.mute.width / .3 + (this.cloudPlat.width * 2);
    this.cloudPlat3.y = this.world.centerY + height / 2.95;

    this.scaleSprite(this.cloudPlat4, this.width, this.height / 3, 50, .05);
    this.cloudPlat4.x = this.world.centerX - this.mute.width / .3 + (this.cloudPlat.width * 3);
    this.cloudPlat4.y = this.world.centerY + height / 2.95;

    //clouds to the right uppper levels of the tree. Has to be a better approach...must gain more knowledge

    this.scaleSprite(this.cloudPlat5, this.width, this.height / 3, 50, .05);
    this.cloudPlat5.x = this.world.centerX + this.mute.width / .55;
    this.cloudPlat5.y = this.world.centerY + height / 2.95;

    this.scaleSprite(this.cloudPlat6, this.width, this.height / 3, 50, .05);
    this.cloudPlat6.x = this.world.centerX + this.mute.width / .55 + (this.cloudPlat.width);
    this.cloudPlat6.y = this.world.centerY + height / 2.95;

    this.scaleSprite(this.cloudPlat7, this.width, this.height / 3, 50, .05);
    this.cloudPlat7.x = this.world.centerX + this.mute.width / .55 + (this.cloudPlat.width * 2);
    this.cloudPlat7.y = this.world.centerY + height / 2.95;

    this.scaleSprite(this.cloudPlat8, this.width, this.height / 3, 50, .05);
    this.cloudPlat8.x = this.world.centerX + this.mute.width / .55 + (this.cloudPlat.width * 3);
    this.cloudPlat8.y = this.world.centerY + height / 2.95;

    this.scaleSprite(this.cloudPlat9, this.width, this.height / 3, 50, .05);
    this.cloudPlat9.x = this.world.centerX + this.mute.width / .3 + (this.cloudPlat.width * 2)
    this.cloudPlat9.y = this.world.centerY + height / 5.0;

    this.scaleSprite(this.cloudPlat10, this.width, this.height / 3, 50, .05);
    this.cloudPlat10.x = this.world.centerX + this.mute.width / .3 + (this.cloudPlat.width * 3)
    this.cloudPlat10.y = this.world.centerY + height / 5.0;

    this.scaleSprite(this.cloudPlat11, this.width, this.height / 3, 50, .05);
    this.cloudPlat11.x = this.world.centerX + this.mute.width / .3 + (this.cloudPlat.width * 3.5)
    this.cloudPlat11.y = this.world.centerY + height / 18;


    this.scaleSprite(this.cloudPlat12, this.width, this.height / 3, 50, .05);
    this.cloudPlat12.x = this.world.centerX - this.mute.width / .3 + (this.cloudPlat.width * 5)
    this.cloudPlat12.y = this.world.centerY + height / 18;

    //cloud to the left..ugh

    this.scaleSprite(this.cloudPlatLeft, this.width, this.height / 3, 50, .05);
    this.cloudPlatLeft.x = this.world.centerX - this.mute.width / .3 - (this.cloudPlat.width * 4);
    this.cloudPlatLeft.y = this.world.centerY + height / 5.0;

    this.scaleSprite(this.cloudPlatLeft2, this.width, this.height / 3, 50, .05);
    this.cloudPlatLeft2.x = this.world.centerX - this.mute.width / .3 - (this.cloudPlat.width * 3)
    this.cloudPlatLeft2.y = this.world.centerY + height / 5.0;

    this.scaleSprite(this.cloudPlatLeft3, this.width, this.height / 3, 50, .05);
    this.cloudPlatLeft3.x = this.world.centerX - this.mute.width / .3 - (this.cloudPlat.width * 3.5)
    this.cloudPlatLeft3.y = this.world.centerY + height / 18;

    this.scaleSprite(this.cloudPlatLeft4, this.width, this.height / 3, 50, .05);
    this.cloudPlatLeft4.x = this.world.centerX - this.mute.width / .3 - (this.cloudPlat.width * 4.5)
    this.cloudPlatLeft4.y = this.world.centerY + height / 18;

    this.scaleSprite(this.cloudPlatLeft5, this.width, this.height / 3, 50, .05);
    this.cloudPlatLeft5.x = this.world.centerX - this.mute.width / .3 - (this.cloudPlat.width * 5.5)
    this.cloudPlatLeft5.y = this.world.centerY + height / 18;

    this.scaleSprite(this.cloudPlatLeft6, this.width, this.height / 3, 50, .05);
    this.cloudPlatLeft6.x = this.world.centerX - this.mute.width / .3 - (this.cloudPlat.width * 6.5)
    this.cloudPlatLeft6.y = this.world.centerY + height / 18;

    this.scaleSprite(this.cloudPlatLeft7, this.width, this.height / 3, 50, .05);
    this.cloudPlatLeft7.x = this.world.centerX - this.mute.width / .3 - (this.cloudPlat.width * 7.5)
    this.cloudPlatLeft7.y = this.world.centerY + height / 18;

    this.scaleSprite(this.cloudPlatLeft8, this.width, this.height / 3, 50, .05);
    this.cloudPlatLeft8.x = this.world.centerX - this.mute.width / .3 - (this.cloudPlat.width * 8.5)
    this.cloudPlatLeft8.y = this.world.centerY + height / 18;

    this.scaleSprite(this.cloudPlatLeft9, this.width, this.height / 3, 50, .05);
    this.cloudPlatLeft9.x = this.world.centerX - this.mute.width / .3 - (this.cloudPlat.width * 9.5)
    this.cloudPlatLeft9.y = this.world.centerY + height / 18;

    this.scaleSprite(this.cloudPlatLeft10, this.width, this.height / 3, 50, .05);
    this.cloudPlatLeft10.x = this.world.centerX - this.mute.width / .3 - (this.cloudPlat.width * 10.5)
    this.cloudPlatLeft10.y = this.world.centerY + height / 18;

    //portals

    this.scaleSprite(this.resume, this.width, this.height / 3, 50, .2);
    this.resume.x = this.world.centerX + this.game.height / 3,
      this.resume.y = this.world.centerY + this.game.height / 3.4

    this.scaleSprite(this.port, this.width, this.height / 3, 50, .5);
    this.port.x = this.world.centerX - this.game.height / 1.8;
    this.port.y = this.world.centerY + this.game.height / 4;

    //signs

    this.scaleSprite(this.sign, this.width, this.height / 3, 50, 4);
    this.sign.x = this.world.centerX + this.game.height / 6;
    this.sign.y = this.world.centerY + this.game.height / 3;

    this.scaleSprite(this.signResume, this.width, this.height / 3, 50, .5);
    this.signResume.x = this.world.centerX + this.game.height / 5.5;
    this.signResume.y = this.world.centerY + this.game.height / 2.7;

    this.scaleSprite(this.signLeft, this.width, this.height / 3, 50, 4);
    this.signLeft.x = this.world.centerX - this.game.height / 2.9;
    this.signLeft.y = this.world.centerY + this.game.height / 3;

    this.scaleSprite(this.signPort, this.width, this.height / 3, 50, .5);
    this.signPort.x = this.world.centerX - this.game.height / 3;
    this.signPort.y = this.world.centerY + this.game.height / 2.7;

    this.scaleSprite(this.signBoss, this.width, this.height / 3, 50, 1.1);
    this.signBoss.x = this.world.centerX - this.cloudPlat.width * 6;
    this.signBoss.y = this.world.centerY + this.game.height / 16;

    this.scaleSprite(this.signBossText, this.width, this.height / 3, 50, .4);
    this.signBossText.x = this.world.centerX - this.cloudPlat.width * 5;
    this.signBossText.y = this.world.centerY + this.game.height / 9;

    this.scaleSprite(this.signBossText2, this.width, this.height / 3, 50, .4);
    this.signBossText2.x = this.world.centerX - this.cloudPlat.width * 4;
    this.signBossText2.y = this.world.centerY + this.game.height / 5.5;

    //deathRefresh
    this.scaleSprite(this.deathRefresh, this.width, this.height / 3, 50, .25);
    this.deathRefresh.x = this.world.centerX - this.cloudPlat.width;
    this.deathRefresh.y = this.world.centerY + this.game.height / 10;

    this.scaleSprite(this.victoryText, this.width, this.height / 3, 50, .4);
    this.victoryText.x = this.world.centerX - this.cloudPlat.width * 10;
    this.victoryText.y = this.world.centerY + this.game.height / 26;

    this.scaleSprite(this.deathText, this.width, this.height / 3, 50, .4);
    this.deathText.x = this.world.centerX - this.cloudPlat.width * 10;
    this.deathText.y = this.world.centerY + this.game.height / 26;


    //glow plats & container
    this.scaleSprite(this.glow, this.width, this.height / 3, 50, .1);
    this.glow.x = this.world.centerX - this.game.height / 3.3;
    this.glow.y = this.world.centerY - this.game.height / 12;

    this.scaleSprite(this.glow2, this.width, this.height / 3, 50, .1);
    this.glow2.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width);
    this.glow2.y = this.world.centerY - this.game.height / 12;

    this.scaleSprite(this.glow3, this.width, this.height / 3, 50, .1);
    this.glow3.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 2);
    this.glow3.y = this.world.centerY - this.game.height / 12;

    this.scaleSprite(this.glow4, this.width, this.height / 3, 50, .1);
    this.glow4.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 3);
    this.glow4.y = this.world.centerY - this.game.height / 12;

    this.scaleSprite(this.glow5, this.width, this.height / 3, 50, .1);
    this.glow5.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 4);
    this.glow5.y = this.world.centerY - this.game.height / 12;

    this.scaleSprite(this.glow6, this.width, this.height / 3, 50, .1);
    this.glow6.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5);
    this.glow6.y = this.world.centerY - this.game.height / 12;

    this.scaleSprite(this.glow7, this.width, this.height / 3, 50, .1);
    this.glow7.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5);
    this.glow7.y = this.world.centerY - this.game.height / 12 - this.glow.height;

    this.scaleSprite(this.glow8, this.width, this.height / 3, 50, .1);
    this.glow8.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5);
    this.glow8.y = this.world.centerY - this.game.height / 12 - (this.glow.height * 2);

    this.scaleSprite(this.glow9, this.width, this.height / 3, 50, .1);
    this.glow9.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5);
    this.glow9.y = this.world.centerY - this.game.height / 12 - (this.glow.height * 3);

    this.scaleSprite(this.glow10, this.width, this.height / 3, 50, .1);
    this.glow10.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5);
    this.glow10.y = this.world.centerY - this.game.height / 12 - (this.glow.height * 4);

    this.scaleSprite(this.glow11, this.width, this.height / 3, 50, .1);
    this.glow11.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5);
    this.glow11.y = this.world.centerY - this.game.height / 12 - (this.glow.height * 5);

    this.scaleSprite(this.glow12, this.width, this.height / 3, 50, .1);
    this.glow12.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5);
    this.glow12.y = this.world.centerY - this.game.height / 12 - (this.glow.height * 6);

    this.scaleSprite(this.glow13, this.width, this.height / 3, 50, .1);
    this.glow13.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5);
    this.glow13.y = this.world.centerY - this.game.height / 12 - (this.glow.height * 7);

    this.scaleSprite(this.glow14, this.width, this.height / 3, 50, .1);
    this.glow14.x = this.world.centerX - this.game.height / 3.3 + (this.glow.width * 5);
    this.glow14.y = this.world.centerY - this.game.height / 12 - (this.glow.height * 8);

    this.scaleSprite(this.container, this.width, this.height / 3, 50, .39);
    this.container.x = this.world.centerX - this.game.height / 3;
    this.container.y = this.world.centerY - (this.glow.height * 5.5);

    this.scaleSprite(this.container2, this.width, this.height / 3, 50, .39);
    this.container2.x = this.world.centerX - this.game.height / 3;
    this.container2.y = this.world.centerY - (this.glow.height * 5.5) - (this.container.height);


  },




  update: function (game) {

    this.deathRefreshF(game);
    this.ready = true;




    //collision
    this.hitObjects = this.physics.arcade.collide(this.ninja, this.platformGroup)
    // this.physics.arcade.collide(this.deadNinja, this.platformGroup)
    //   this.physics.arcade.collide(this.deadNinja, this.glowGroup);
    this.physics.arcade.collide(this.boss, this.platformGroup);
    this.glowJump = this.physics.arcade.collide(this.ninja, this.glowGroup);
    this.physics.arcade.collide(this.boss, this.glowGroup);
    this.physics.arcade.collide(this.boss, this.bossWalls);
    this.physics.arcade.collide(this.ninja, this.boss);


    //functions below feed into This
    this.physics.arcade.overlap(this.boss, this.ninja, jumpAttack, null, this);
    this.boss.onCollide = new Phaser.Signal();
    this.physics.arcade.overlap(this.boss, this.ninja, killBoss, null, this);
    this.physics.arcade.overlap(this.boss, this.ninja, bossLivesCounter, null, this);
    this.physics.arcade.overlap(this.ninja, this.resume, resumeTele, null, this);
    this.physics.arcade.overlap(this.ninja, this.port, portTele, null, this);




    //set ninjas velocity to 0
    this.ninja.body.velocity.x = 0;




    if (this.cursors.left.isDown) {
      //  Move to the left
      this.ninja.body.velocity.x = -100;

      this.ninja.animations.play('left');
      this.ninja.scale.setTo(-1, 1);
    } else if (this.cursors.right.isDown) {
      //  Move to the right
      this.ninja.body.velocity.x = 100;

      this.ninja.animations.play('right');
      this.ninja.scale.setTo(1, 1);
    } else if (this.cursors.down.isDown) {
      this.ninja.body.velocity.x = 0;
    } else {
      //  Stand still
      this.ninja.animations.stop();

      this.ninja.frame = 0;
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.ninja.body.touching.down && this.hitObjects) {
      this.ninja.body.velocity.y = -259;
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.ninja.body.touching.down && this.glowJump) {
      this.ninja.body.velocity.y = -299;
    }


  },




}

function jumpAttack(boss, ninja) {
  if (this.ninja.y > this.boss.y && this.bossHealth == 500) {
    this.boss.body.velocity.x = 0;
    this.boss.y -= 500;
    this.bossHealth = 250;
    console.log(this.bossHealth)
    this.ninja.y -= 30;
  } else if (this.ninja.y > this.boss.y && this.bossHealth == 250) {
    this.boss.body.velocity.x = 0;
    this.boss.y -= 500;
    this.bossHealth = 0;
    console.log(this.bossHealth)
    this.ninja.y -= 30;
  } else {
    this.ninjaHealth -= 1666;
    console.log(this.ninjaHealth)
  }
  this.healthText.setText("Health: " + this.ninjaHealth);
  console.log(this.ninjaHealth)
  console.log(this.healthText)
  //Gameover
  if (this.ninjaHealth == 0 || this.ninjaHealth < 0) {
    this.ninja.kill();
    this.deathText.reset(this.world.centerX - this.cloudPlat.width * 10, this.world.centerY + this.game.height / 26, "You're courageous, but lacking skill!", {
      font: "24px Orbitron",
      fill: "red",
      align: "center"
    });
  }
}



function killBoss(health) {
  if (this.bossHealth == 0 && this.bossLives == 3) {
    this.boss.kill()
    this.bossLives = 2;
    this.boss.revive(this.bossHealth == 500)
  } else if (this.bossHealth == 0 && this.bossLives == 2) {
    this.boss.kill()
    this.bossLives = 1;
    this.boss.revive(this.bossHealth == 500)
  } else if (this.bossHealth == 0 && this.bossLives == 1) {
    this.boss.kill()
    this.bossLives = 0;
    this.boss.revive(this.bossHealth == 500)
  } else if (this.bossLives == 0) {
    this.boss.kill()
  }
}

function bossLivesCounter(boss) {
  if (this.bossLives == 2) {
    this.boss.reset(this.world.centerX - this.game.height / 4, this.world.centerY - this.game.height / 3.0);
    this.physics.arcade.enable(this.boss);
    this.physics.arcade.enable(this.boss);
    this.boss.enableBody = true;
    this.boss.body.velocity.setTo(298, 280);
    this.boss.body.bounce.set(1);
    this.boss.body.collideWorldBounds = true;
    this.boss.scale.setTo(1, 1);
    this.boss.body.gravity.y = 150;
    this.bossHealth == 500;

  } else if (this.bossLives == 1) {
    this.boss.reset(this.world.centerX - this.game.height / 4, this.world.centerY - this.game.height / 3.0);
    this.physics.arcade.enable(this.boss);
    this.boss.enableBody = true;
    this.boss.body.velocity.setTo(298, 280);
    this.boss.body.bounce.set(1);
    this.boss.body.collideWorldBounds = true;
    this.boss.scale.setTo(1, 1);
    this.boss.body.gravity.y = 150;
    this.bossHealth == 500;
  } else if (this.bossLives == 0 && this.bossHealth == 0) {
    this.themeSong.pause();
    this.winner.play();
    this.victoryText.reset(this.world.centerX - this.cloudPlat.width * 10, this.world.centerY + this.game.height / 26, "Congrats, you've defeated the boss! Now visit my resume or portfolio portals.", {
      font: "24px Orbitron",
      fill: "black"
    });
  }
}

function portTele(tele) {
  if (this.ninja.body.x = this.port.x) {
    this.teleport.play()
    this.ninja.kill()
    // open in a new window instead (this will likely be blocked by popup blockers though)
    // window.open("http://127.0.0.1:8080/portfolio");
    // open in the same window (like clicking a link)
    window.location.href = "portfolio.html"
  }
}

function resumeTele(teleport) {
  if (this.ninja.body.x = this.resume.y) {
    this.teleport.play()
    this.ninja.kill()
    // open in a new window instead (this will likely be blocked by popup blockers though)
    // window.open("http://127.0.0.1:8080/resume");
    // open in the same window (like clicking a link)
    window.location.href = "resume.html"
  }
}