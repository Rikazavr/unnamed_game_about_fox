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
