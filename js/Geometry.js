/**
* Created by vasiliy.lomanov on 03.09.2014.
*/


function Vector(v) {
    if (typeof v === "undefined") { v = { x: 0, y: 0 }; }
    this.x = v.x || 0;
    this.y = v.y || 0;
}

Vector.prototype.addEq = function(v) {
    this.x += v.x;
    this.y += v.y;
};
Vector.prototype.subEq = function(v) {
    this.x -= v.x;
    this.y -= v.y;
};

Vector.prototype.norm = function() {
    return  Math.sqrt(this.x*this.x + this.y*this.y);
};

Vector.mul = function(v1,v2) {
    var v1c, v2c;

    if( typeof v1 === 'number' )
        v1c = new Vector({x:v1, y:v1});
    else v1c = new Vector(v1);

    if( typeof v2 === 'number' )
        v2c = new Vector({x:v2, y:v2});
    else v2c = new Vector(v2);

    return new Vector( {x:v1c.x*v2c.x, y: v1c.y*v2c.y });
};

Vector.distance = function(v1,v2) {
    var diff = new Vector(v1);
    diff.subEq(v2);
    return diff.norm();
};