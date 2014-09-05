/**
 * Created by vasiliy.lomanov on 05.09.2014.
 */

function Mortal(health) {
    this.health = health || 100;
}

Mortal.makeMortal = function(obj, health) {
    obj.mortal = new Mortal(health);
};

Mortal.prototype.hit = function(damage) {
    this.health -= damage;
};

Mortal.prototype.alive = function() {
    return this.health > 0;
};