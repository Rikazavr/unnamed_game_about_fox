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
