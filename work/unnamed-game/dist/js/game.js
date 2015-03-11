(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(1280, 800, Phaser.AUTO, 'game-about-fox');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":7,"./states/gameover":8,"./states/menu":9,"./states/play":10,"./states/preload":11}],2:[function(require,module,exports){
'use strict';

var Tree = require('./tree');

var Forest = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  this.firstTree = new Tree(this.game, 0, 0, 1);
  this.secondTree = new Tree(this.game, 0, 20, 2);
  this.add(this.firstTree); 
  this.add(this.secondTree);

  this.setAll('body.velocity.x', -550);
 
};

Forest.prototype = Object.create(Phaser.Sprite.prototype);
Forest.prototype.constructor = Forest;

Forest.prototype.update = function() {
	this.checkWorldBounds();
};

Forest.prototype.checkWorldBounds = function() {  
  if(!this.tree.inWorld) {
    this.exists = false;
  }
};

Forest.prototype.reset = function(x, y) {
this.firstTree.reset(25,-50);
this.secondTree.reset(25,20);
this.x = x;
this.y = y;
this.setAll('body.velocity.x', -550);
this.exists = true;
}; 

module.exports = Forest;

},{"./tree":6}],3:[function(require,module,exports){
'use strict';

var Fox = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'fox', frame);
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('run');
  this.animations.play('run', 12, true);

  this.game.physics.arcade.enableBody(this);
  
};

Fox.prototype = Object.create(Phaser.Sprite.prototype);
Fox.prototype.constructor = Fox;

Fox.prototype.update = function() {
	if(this.angle < 0) {
    this.angle += 1.5;
  }
};

Fox.prototype.jump = function() { 
	this.body.velocity.y = -750; 
	this.game.add.tween(this).to({angle: -40}, 100).start();
};

module.exports = Fox;

},{}],4:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {  
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');
  this.autoScroll(-550,0);

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);  
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {   
};

module.exports = Ground;
},{}],5:[function(require,module,exports){
'use strict';

var SecondLayer = function(game, x, y, width, height) {  
  Phaser.TileSprite.call(this, game, x, y, width, height, 'secondLayer');
  this.autoScroll(-300,0);

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
};

SecondLayer.prototype = Object.create(Phaser.TileSprite.prototype);  
SecondLayer.prototype.constructor = SecondLayer;

SecondLayer.prototype.update = function() {   
};

module.exports = SecondLayer;
},{}],6:[function(require,module,exports){
'use strict';

var Tree = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'tree', frame);
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);

  this.body.allowGravity = false;
  this.body.immovable = true; 
};

Tree.prototype = Object.create(Phaser.Sprite.prototype);
Tree.prototype.constructor = Tree;

Tree.prototype.update = function() {
};

module.exports = Tree;

},{}],7:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],8:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],9:[function(require,module,exports){
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#сссссс', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],10:[function(require,module,exports){
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
},{"../prefabs/forest":2,"../prefabs/fox":3,"../prefabs/ground":4,"../prefabs/secondLayer":5,"../prefabs/tree":6}],11:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.spritesheet('tree', 'assets/trees.png', 157, 400, 2);
    this.load.image('secondLayer', 'assets/ground.png');
    this.load.spritesheet('fox', 'assets/fox.png', 147, 70, 3);

    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('yeoman', 'assets/yeoman-logo.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])