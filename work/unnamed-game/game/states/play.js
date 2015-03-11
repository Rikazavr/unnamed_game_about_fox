  'use strict';
  var Fox = require('../prefabs/fox');
  var Ground = require('../prefabs/ground');
  var SecondLayer = require('../prefabs/secondLayer');
  var Tree = require('../prefabs/tree');
  var Forest = require('../prefabs/forest'); 

  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 1280;

      this.background = this.game.add.sprite(0,0,'background');

      this.ground = new Ground(this.game, 0, 655, 1280, 146);
      this.game.add.existing(this.ground);

      this.secondLayer = new SecondLayer(this.game, 0, 500, 1280, 146);
      this.game.add.existing(this.secondLayer);

      this.trees = this.game.add.group();

      // this.treeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 0.55, this.generateTrees, this);
      // this.treeGenerator.timer.start();

      this.fox = new Fox(this.game, 230, this.game.height/2);
      this.game.add.existing(this.fox);

      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
      var jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      jumpKey.onDown.add(this.fox.jump, this.fox);
      this.input.onDown.add(this.fox.jump, this.fox);

    },
    update: function() {
      this.game.physics.arcade.collide(this.fox, this.ground);
    },

    generateTrees: function() {
      alert(1);
      var treeY = this.game.rnd.integerInRange(-50, 50);
      alert(2);
      var forest = this.trees.getFirstExists(false);
      alert(3);
      if(!forest) {
          forest = new Forest(this.game, this.trees);
          alert(4);  
        }
      forest.reset(this.game.width, treeY);
      alert(5);
    }

  };
  
  module.exports = Play;