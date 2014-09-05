/**
 * Created by vasiliy.lomanov on 03.09.2014.
 */

/// <reference path="./Geometry.js" />
/// <reference path="./Drawer.js" />
/// <reference path="./MoveCtrlKeyboard.js" />

var drawer = new Drawer('field');

var game = {
    score: 0
};

const pool = new Pool();
pool.setBounds( {x: 0, y:0}, {x: drawer.width, y:drawer.height} );

var me = {};
Movable.makeMovable(me, new Vector({x:512,y:512}));
makeKeyboardControlable(me.movable);
Collisionable.makeCollisionable(me, 5, function(me, obj) {
    console.log("Ouch!")
    me.mortal.hit(25);
});
giveHimWeapon(me, "AK47")
Mortal.makeMortal(me, 100);
me.type = Types.me;

pool.add(me);

var pid = 0;
var mouse = new MouseCtrl(
    'field',
    function(v){
        //console.log("down at ", v);
        pid = setInterval(function() {
            var bullet = me.fire(new Vector(mouse.coordinate));

            if(bullet) {
                bullet.type = Types.bullet;
                pool.add(bullet);
            }
        }, 1000.0 / me.weapon.currentStat.rate);
    },
    function(v){
        //console.log("up at ", v);
        clearInterval(pid);
    },
    function(v){
        //console.log("move at ", v);
    });


setInterval(function() {
    var obj = {};
    Movable.makeMovable(obj, new Vector({x:Math.random()*drawer.width,y:Math.random()*drawer.height}));

    obj.movable.setVelocity(new Vector({x:Math.random()*6-3,y:Math.random()*6-3}));
    Collisionable.makeCollisionable(obj, 5, function(obj, something) {
        console.log("Bull eye!!!");
        if( something.type === Types.bullet )
            obj.mortal.hit(something.damage);
        if( !obj.mortal.alive() )
            game.score += 1;
    });
    Mortal.makeMortal(obj, 100);
    obj.type = Types.enemy;

    pool.add(obj);
}, 1000);

setInterval(function(){

    pool.update(0.1);

    drawer.clear();

    //for( var i = 0; i < pool.objects.length; i++ ) {
    for( var i in  pool.objects) {
        var color = "";
        switch(pool.objects[i].type) {
            case Types.bullet:
                color = "#000000";
                break;
            case Types.enemy:
                color = "#FF0000";
                break;
            case Types.me:
                color = "#0000FF";
                break;
        }
        drawer.circle(pool.objects[i].movable.coordinate, pool.objects[i].collisionable.size, color, 1);
        drawer.text(game.score.toString(10), new Vector({x:10,y:50}));
    }
}, 0);
