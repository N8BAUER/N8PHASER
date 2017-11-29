N8.Game = function(game){
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
  this.mute;
  this.unmute;
  this.signLeft;
  this.cursors;
  this.themeSong;
  this.teleport;
  this.winner;
  this.ready = false;
};

N8.Game.prototype = {
  create: function(game){
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.board
    this.buildWorld(game);
    this.addSprites(game);



    },

    buildWorld: function(game){



      //main board features
      this.board = this.add.image(this.world.centerX, this.world.centerY, 'mountain')
      this.board.anchor.set(0.5);
      this.board.height = game.height;
      this.board.width = game.width;


      //music
      this.teleport = this.add.audio('teleport');
      this.winner = this.add.audio('winner');
      this.themeSong = this.add.audio('themeSong');

      //play & pause (functions below)
      this.mute = this.add.image(this.world.centerX + 615, this.world.top, 'mute')
      this.mute.inputEnabled = true;
      this.mute.events.onInputDown.addOnce(this.provideSound, this);


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
      this.healthText = this.add.text(16, 16, 'Health: 9999', { font: "Orbitron", fontSize: '30px', fill: 'red'});

      //tree of mana
      this.tree = this.treeGroup.create(this.world.centerX - 200, this.world.bottom -400, 'tree');
      this.tree.body.immovable = true;
      this.tree.scale.x = 4;
      this.tree.scale.y = 5;

      //branch platforms
      this.treePlat = this.platformGroup.create(this.world.centerX + 59, this.world.bottom - 110, 'bentBranch');
      this.treePlat.scale.x = 5;
      this.treePlat.scale.y = 3;
      this.treePlatLeft = this.platformGroup.create(this.world.centerX - 100, this.world.bottom - 110, 'bentBranch');
      this.treePlatLeft.scale.x = 5;
      this.treePlatLeft.scale.y = 3;
      this.treePlatLeft2 = this.platformGroup.create(this.world.centerX - 260, this.world.bottom - 110, 'bentBranch');
      this.treePlatLeft2.scale.x = 5;
      this.treePlatLeft2.scale.y = 3;
      this.treePlatLeft3 = this.platformGroup.create(this.world.centerX - 420, this.world.bottom - 110, 'bentBranch');
      this.treePlatLeft3.scale.x = 5;
      this.treePlatLeft3.scale.y = 3;
      this.treePlatLeft4 = this.platformGroup.create(this.world.centerX - 580, this.world.bottom - 110, 'bentBranch');
      this.treePlatLeft4.scale.x = 5;
      this.treePlatLeft4.scale.y = 3;
      this.treePlatLeft5 = this.platformGroup.create(this.world.centerX - 740, this.world.bottom - 110, 'bentBranch');
      this.treePlatLeft5.scale.x = 5;
      this.treePlatLeft5.scale.y = 3;
      this.treePlat2 = this.platformGroup.create(this.world.centerX + 219, this.world.bottom - 110, 'bentBranch');
      this.treePlat2.scale.x = 5;
      this.treePlat2.scale.y = 3;
      this.treePlat3 = this.platformGroup.create(this.world.centerX +  379,this.world.bottom - 110, 'bentBranch');
      this.treePlat3.scale.x = 5;
      this.treePlat3.scale.y = 3;
      this.treePlat4 = this.platformGroup.create(this.world.centerX +  539,this.world.bottom - 110, 'bentBranch');
      this.treePlat4.scale.x = 6;
      this.treePlat4.scale.y = 3;
      this.treePlat4.enableBody = true;
      this.treePlat3.enableBody = true;
      this.treePlat2.enableBody = true;
      this.treePlat.enableBody = true;
      this.treePlatLeft.enableBody = true;
      this.treePlatLeft2.enableBody = true;
      this.treePlatLeft3.enableBody = true;
      this.treePlatLeft4.enableBody = true;
      this.treePlatLeft5.enableBody = true;
      this.treePlat4.body.immovable = true;
      this.treePlatLeft5.body.immovable = true;
      this.treePlat3.body.immovable = true;
      this.treePlat2.body.immovable = true;
      this.treePlat.body.immovable = true;
      this.treePlatLeft.body.immovable = true;
      this.treePlatLeft2.body.immovable = true;
      this.treePlatLeft3.body.immovable = true;
      this.treePlatLeft4.body.immovable = true;



      //clouds for right side
      this.cloudPlat = this.platformGroup.create(this.world.centerX + 400, this.world.bottom -250, 'cloud');
      this.cloudPlat.scale.x = .4;
      this.cloudPlat.scale.y = .4;
      this.cloudPlat2 = this.platformGroup.create(this.world.centerX + 330, this.world.bottom -280, 'cloud');
      this.cloudPlat2.scale.x = .4;
      this.cloudPlat2.scale.y = .4;
      this.cloudPlat3 = this.platformGroup.create(this.world.centerX + 260, this.world.bottom -310, 'cloud');
      this.cloudPlat3.scale.x = .4;
      this.cloudPlat3.scale.y = .4;
      this.cloudPlat4 = this.platformGroup.create(this.world.centerX + 190, this.world.bottom -340, 'cloud');
      this.cloudPlat4.scale.x = .4;
      this.cloudPlat4.scale.y = .4;
      this.cloudPlat5 = this.platformGroup.create(this.world.centerX + 280, this.world.bottom -450, 'cloud');
      this.cloudPlat5.scale.x = .4;
      this.cloudPlat5.scale.y = .4;
      this.cloudPlat6 = this.platformGroup.create(this.world.centerX + 320, this.world.bottom -450, 'cloud');
      this.cloudPlat6.scale.x = .4;
      this.cloudPlat6.scale.y = .4;
      this.cloudPlat7 = this.platformGroup.create(this.world.centerX + 390, this.world.bottom -450, 'cloud');
      this.cloudPlat7.scale.x = .4;
      this.cloudPlat7.scale.y = .4;
      this.cloudPlat8 = this.platformGroup.create(this.world.centerX + 460, this.world.bottom -450, 'cloud');
      this.cloudPlat8.scale.x = .4;
      this.cloudPlat8.scale.y = .4;
      this.cloudPlat9 = this.platformGroup.create(this.world.centerX + 530, this.world.bottom -450, 'cloud');
      this.cloudPlat9.scale.x = .4;
      this.cloudPlat9.scale.y = .4;
      this.cloudPlat10 = this.platformGroup.create(this.world.centerX + 600, this.world.bottom -450, 'cloud');
      this.cloudPlat10.scale.x = .4;
      this.cloudPlat10.scale.y = .4;
      this.cloudPlat11 = this.platformGroup.create(this.world.centerX + 390, this.world.bottom -590, 'cloud');
      this.cloudPlat11.scale.x = .4;
      this.cloudPlat11.scale.y = .4;
      this.cloudPlat12 = this.platformGroup.create(this.world.centerX + 550, this.world.bottom -650, 'cloud');
      this.cloudPlat12.scale.x = .4;
      this.cloudPlat12.scale.y = .4;
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
      this.cloudPlatLeft = this.platformGroup.create(this.world.centerX - 460, this.world.bottom -250, 'cloud');
      this.cloudPlatLeft.scale.x = .4;
      this.cloudPlatLeft.scale.y = .4;
      this.cloudPlatLeft2 = this.platformGroup.create(this.world.centerX - 390, this.world.bottom -280, 'cloud');
      this.cloudPlatLeft2.scale.x = .4;
      this.cloudPlatLeft2.scale.y = .4;
      this.cloudPlatLeft3 = this.platformGroup.create(this.world.centerX - 320, this.world.bottom -310, 'cloud');
      this.cloudPlatLeft3.scale.x = .4;
      this.cloudPlatLeft3.scale.y = .4;
      this.cloudPlatLeft4 = this.platformGroup.create(this.world.centerX - 250, this.world.bottom -340, 'cloud');
      this.cloudPlatLeft4.scale.x = .4;
      this.cloudPlatLeft4.scale.y = .4;
      this.cloudPlatLeft5 = this.platformGroup.create(this.world.centerX - 320, this.world.bottom -450, 'cloud');
      this.cloudPlatLeft5.scale.x = .4;
      this.cloudPlatLeft5.scale.y = .4;
      this.cloudPlatLeft6 = this.platformGroup.create(this.world.centerX - 390, this.world.bottom -450, 'cloud');
      this.cloudPlatLeft6.scale.x = .4;
      this.cloudPlatLeft6.scale.y = .4;
      this.cloudPlatLeft7 = this.platformGroup.create(this.world.centerX - 460, this.world.bottom -450, 'cloud');
      this.cloudPlatLeft7.scale.x = .4;
      this.cloudPlatLeft7.scale.y = .4;
      this.cloudPlatLeft8 = this.platformGroup.create(this.world.centerX - 530, this.world.bottom -450, 'cloud');
      this.cloudPlatLeft8.scale.x = .4;
      this.cloudPlatLeft8.scale.y = .4;
      this.cloudPlatLeft9 = this.platformGroup.create(this.world.centerX - 600, this.world.bottom -450, 'cloud');
      this.cloudPlatLeft9.scale.x = .4;
      this.cloudPlatLeft9.scale.y = .4;
      this.cloudPlatLeft10 = this.platformGroup.create(this.world.centerX - 670, this.world.bottom -450, 'cloud');
      this.cloudPlatLeft10.scale.x = .4;
      this.cloudPlatLeft10.scale.y = .4;
      this.cloudPlatLeft.enableBody = true;
      this.cloudPlatLeft2.enableBody = true;
      this.cloudPlatLeft3.enableBody = true;
      this.cloudPlatLeft4.enableBody= true;
      this.cloudPlatLeft.body.immovable = true;
      this.cloudPlatLeft2.body.immovable = true;
      this.cloudPlatLeft3.body.immovable = true;
      this.cloudPlatLeft4.body.immovable = true;

      //portals to portfolio & resume
      this.resume = this.portalGroup.create(this.world.centerX + 645, this.world.bottom - 190, 'blueStar');
      this.resume.scale.x = .35;
      this.resume.scale.y = .35;
      this.port = this.portalGroup.create(this.world.centerX - 765, this.world.bottom - 210, 'purpleStar');
      this.port.scale.x = 1;
      this.port.scale.y = 1;
      this.resume.enableBody = true;
      this.port.enableBody = true;
      this.resume.body.immovable = true;
      this.port.body.immovable = true;

      //signs and health bars
      this.sign = this.signGroup.create(this.world.centerX + 355, this.world.bottom -185, 'sign');
      this.sign.scale.setTo(6, 6);
      this.sign = this.add.text(this.world.centerX + 362, this.world.bottom -160, 'Resume -->', { font: "Orbitron", fontSize: '15px', fill: 'White'});
      this.signLeft = this.signGroup.create(this.world.centerX - 355, this.world.bottom -185, 'sign');
      this.sign = this.add.text(this.world.centerX - 350, this.world.bottom -160, '<-- Portfolio', { font: "Orbitron", fontSize: '15px', fill: 'White'});
      this.signLeft.scale.setTo(6, 6);
      this.signBoss = this.signGroup.create(this.world.centerX + 550, this.world.bottom -600, 'sign');
      this.signBossText = this.add.text(this.world.centerX + 553, this.world.bottom -595, 'Boss Fight Above', { font: "Orbitron", fontSize: '14px', fill: 'white'});
      this.signBossText2 = this.add.text(this.world.centerX + 560, this.world.bottom -535, 'Below the Belt', { font: "Orbitron", fontSize: '14px', fill: 'White'});
      this.signBoss.scale.setTo(8, 8);



      //holy platfrom for boss fight
      this.glow = this.glowGroup.create(this.world.centerX, this.world.top + 250, 'glow')
      this.glow2 = this.glowGroup.create(this.world.centerX -70, this.world.top + 250, 'glow')
      this.glow3 = this.glowGroup.create(this.world.centerX -140, this.world.top + 250, 'glow')
      this.glow4 = this.glowGroup.create(this.world.centerX -210, this.world.top + 250, 'glow')
      this.glow5 = this.glowGroup.create(this.world.centerX -280, this.world.top + 250, 'glow')
      this.glow6 = this.glowGroup.create(this.world.centerX +70, this.world.top + 250, 'glow')
      this.glow7 = this.glowGroup.create(this.world.centerX +140, this.world.top + 250, 'glow')
      this.glow8 = this.glowGroup.create(this.world.centerX +210, this.world.top + 250, 'glow')
      this.glow9 = this.glowGroup.create(this.world.centerX +280, this.world.top + 250, 'glow')
      this.glow10 = this.glowGroup.create(this.world.centerX +350, this.world.top + 250, 'glow')
      this.glow11 = this.glowGroup.create(this.world.centerX -350, this.world.top + 250, 'glow')
      this.container = this.bossWalls.create(this.world.centerX + 330, this.world.top + 20, 'container');
      this.containerLeft = this.bossWalls.create(this.world.centerX - 370, this.world.top + 20, 'container');
      this.container.scale.setTo(1, 1);
      this.containerLeft.scale.setTo(1, 1);
      this.glow.scale.setTo(.25, .25);
      this.glow2.scale.setTo(.25, .25);
      this.glow3.scale.setTo(.25, .25);
      this.glow4.scale.setTo(.25, .25);
      this.glow5.scale.setTo(.25, .25);
      this.glow6.scale.setTo(.25, .25);
      this.glow7.scale.setTo(.25, .25);
      this.glow8.scale.setTo(.25, .25);
      this.glow9.scale.setTo(.25, .25);
      this.glow10.scale.setTo(.25, .25);
      this.glow11.scale.setTo(.25, .25);
      this.container.enableBody = true;
      this.containerLeft.enableBody = true;
      this.glow.enableBody = true;
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
      this.container.body.immovable = true;
      this.containerLeft.body.immovable = true;
      this.glow.body.immovable = true;
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


      this.cursors = this.input.keyboard.createCursorKeys();

    },

    provideSound: function(game){
      this.themeSong = this.add.audio('themeSong');
      this.themeSong.play();
      //sound icons
      this.unmute = this.add.image(this.world.centerX + 615, this.world.top, 'unmute')
      this.unmute.inputEnabled = true;
      this.unmute.events.onInputDown.addOnce(this.silence, this);
    },

    silence: function(game){;
      this.themeSong.pause();
      this.mute = this.add.image(this.world.centerX + 615, this.world.top, 'mute')
      this.mute.inputEnabled = true;
      this.mute.events.onInputDown.addOnce(this.provideSound, this);

    },


    addSprites: function(game){
      this.ninja = this.add.sprite(this.world.centerX + 115, this.world.bottom -300, 'ninjaRun')
      this.ninja.scale.x = 2;
      this.ninja.scale.y = 2;
      this.physics.arcade.enable(this.ninja);
      this.ninja.body.bounce.y = 0.2;
      this.ninja.body.gravity.y = 300;
      this.ninja.body.collideWorldBounds = true;
      this.ninja.animations.add('right', [0, 1, 2], 5, true);
      this.ninja.animations.add('left', [2, 1, 2], 5, true);

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
      this.boss = this.add.sprite(430, this.world.top, 'finalBoss')
      this.physics.arcade.enable(this.boss);
      this.boss.enableBody = true;
      this.boss.body.velocity.setTo(100, 100);
      this.boss.body.bounce.set(1);
      this.boss.animations.add('left', [0, 1, 2], 7, false);
      this.boss.animations.add('right', [0, 1, 2], 7, false);
      this.boss.body.collideWorldBounds = true;
      this.boss.scale.setTo(1,1);
      this.boss.body.gravity.y = 150;

    },



  update: function(game){


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




    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.ninja.body.velocity.x = -200;

        this.ninja.animations.play('left');
        this.ninja.scale.setTo(-2, 2);
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.ninja.body.velocity.x = 200;

        this.ninja.animations.play('right');
        this.ninja.scale.setTo(2, 2);
    }
      else if(this.cursors.down.isDown)
    {
      this.ninja.body.velocity.x = 0;
    }
    else
    {
        //  Stand still
        this.ninja.animations.stop();

        this.ninja.frame = 0;
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.ninja.body.touching.down && this.hitObjects)
    {
        this.ninja.body.velocity.y = -299;
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.ninja.body.touching.down && this.glowJump)
    {
        this.ninja.body.velocity.y = -299;
    }

  },




}

function jumpAttack(boss, ninja) {
   if ( this.ninja.y > this.boss.y && this.bossHealth == 500){
        this.boss.body.velocity.x = 0;
        this.boss.y -= 500;
        this.bossHealth = 250;
        console.log(this.bossHealth)
        this.ninja.y -= 30;
}    else if ( this.ninja.y > this.boss.y  && this.bossHealth == 250 ){
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
        if(this.ninjaHealth == 0){
            this.ninja.kill();
            this.deathText = this.add.text(this.world.centerX -250, this.world.centerY -80, "You're courageous, but lacking skill!", { font: "24px Orbitron", fill: "red", align: "center" });
         }
}

function killBoss(health){
  if(this.bossHealth == 0  && this.bossLives == 3){
    this.boss.kill()
    this.bossLives = 2;
    this.boss.revive(this.bossHealth == 500)
  } else if(this.bossHealth == 0  && this.bossLives == 2){
    this.boss.kill()
    this.bossLives = 1;
    this.boss.revive(this.bossHealth == 500)
  }else if(this.bossHealth == 0  && this.bossLives == 1){
    this.boss.kill()
    this.bossLives = 0;
    this.boss.revive(this.bossHealth == 500)
  } else if(this.bossLives == 0){
    this.boss.kill()
  }
}

function bossLivesCounter(boss){
 if(this.bossLives == 2){
    this.boss.reset(430, this.world.top);
    this.physics.arcade.enable(this.boss);
    this.boss.enableBody = true;
    this.boss.body.velocity.setTo(200, 200);
    this.boss.body.bounce.set(1);
    this.boss.body.collideWorldBounds = true;
    this.boss.scale.setTo(1,1);
    this.boss.body.gravity.y = 150;
    this.bossHealth == 500;

  }
  else if(this.bossLives == 1){
    this.boss.reset(430, this.world.top);
    this.physics.arcade.enable(this.boss);
    this.boss.enableBody = true;
    this.boss.body.velocity.setTo(200, 200);
    this.boss.body.bounce.set(1);
    this.boss.body.collideWorldBounds = true;
    this.boss.scale.setTo(1,1);
    this.boss.body.gravity.y = 150;
    this.bossHealth == 500;
  } else if(this.bossLives == 0  && this.bossHealth == 0){
    this.themeSong.pause();
    this.winner.play();
  this.add.text(this.world.centerX -550, this.world.centerY -80, "Congrats, you've defeated the boss! Now visit my resume or portfolio portals.", { font: "24px Orbitron", fill: "black"});
}
}

function portTele(tele){
  if(this.ninja.body.x = this.port.y){
  this.teleport.play()
    // open in a new window instead (this will likely be blocked by popup blockers though)
   // window.open("http://127.0.0.1:8080/portfolio");
   // open in the same window (like clicking a link)
   window.location.href = "portfolio.html"
}
}

function resumeTele(teleport){
  if(this.ninja.body.x = this.resume.y){
  this.teleport.play()
  // open in a new window instead (this will likely be blocked by popup blockers though)
  // window.open("http://127.0.0.1:8080/resume");
  // open in the same window (like clicking a link)
    window.
  location.href = "resume.html"
}
}
