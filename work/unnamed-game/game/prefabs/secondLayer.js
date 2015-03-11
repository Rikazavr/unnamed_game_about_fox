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