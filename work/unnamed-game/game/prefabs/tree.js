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
