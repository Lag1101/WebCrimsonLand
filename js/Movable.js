/**
* Created by vasiliy.lomanov on 03.09.2014.
*/

/// <reference path="./Vector" />

function Movable(v, type) {
    this.coordinate = new Vector(v);
    this.velocity = new Vector();
}
Movable.prototype.setCoordinate = function (c) {
    this.coordinate = new Vector(c);
};

Movable.prototype.setVelocity = function (v) {
    this.velocity.x = v.x;
    this.velocity.y = v.y;
};

Movable.prototype.touchVelocity = function (v) {
    this.velocity.addEq(v);
};

Movable.prototype.update = function(t) {
    this.coordinate.addEq(Vector.mul(t, this.velocity));
    //console.log("Moved to ", this.coordinate, " with speed ", this.velocity );
};


Movable.makeMovable = function(obj, startCoordinate) {
    obj.movable = new Movable(startCoordinate);
};

function Collisionable(size, onCollision) {
    this.size = size;
    this.onCollision = onCollision;
}

Collisionable.makeCollisionable = function(obj, size, onCollision) {
    if( ! obj.movable instanceof Movable ) {
        throw new Error("Can't move this object!!!");
    }
    obj.collisionable = new Collisionable(size, onCollision);
};

function Pool(){
    this.objects = [];
}

Pool.prototype.add = function(obj) {
    if( ! obj.movable instanceof Movable ) {
        throw new Error("Can't move this object!!!");
    }

    this.objects.push(obj);
};

Pool.prototype.setBounds = function(minBounds, maxBounds) {
    this.minBounds = new Vector(minBounds);
    this.maxBounds = new Vector(maxBounds);
};

Pool.prototype.update = function(t) {
    for( var i = 0; i < this.objects.length; i++) {
        var obj = this.objects[i].movable;
        obj.update(t);
    }

    if( this.minBounds && this.maxBounds )
    for( var i = 0; i < this.objects.length; ) {
        var coordinate = this.objects[i].movable.coordinate;
        if( coordinate.x < this.minBounds.x || coordinate.y < this.minBounds.y ||
            coordinate.x >= this.maxBounds.x || coordinate.y >= this.maxBounds.y) {
            this.objects.splice(i, 1);
        } else {
            i++;
        }
    }

    for( var i = 0; i < this.objects.length; ) {
        var obj = this.objects[i];
        if( obj.mortal instanceof Mortal && !obj.mortal.alive() )
            this.objects.splice(i, 1);
        else
            i++;
    }

    for( var i = 0; i < this.objects.length; i++) {
        var obj1 = this.objects[i];

        if( obj1.collisionable instanceof Collisionable )
        for( var j = i+1; j < this.objects.length; j++) {
            var obj2 = this.objects[j];

            var distance = Vector.distance(obj1.movable.coordinate, obj2.movable.coordinate);

            if( distance < obj1.collisionable.size + obj2.collisionable.size )
            if( obj2.collisionable instanceof Collisionable ) {
                if( obj1.collisionable.onCollision )
                    obj1.collisionable.onCollision(obj1, obj2);
                if( obj2.collisionable.onCollision )
                    obj2.collisionable.onCollision(obj2, obj1);
            }
        }
    }
};
