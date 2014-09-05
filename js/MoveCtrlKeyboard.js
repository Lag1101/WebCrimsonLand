/**
* Created by vasiliy.lomanov on 03.09.2014.
*/

/// <reference path="KeyboardJS-master/keyboard.js" />

function makeKeyboardControlable(movableObject) {

    var v = 10;

    movableObject._directions = {
        up: new Vector(),
        down: new Vector(),
        right: new Vector(),
        left: new Vector()
    };

    function calcV() {
        var res = new Vector();
        res.addEq(movableObject._directions.up);
        res.addEq(movableObject._directions.down);
        res.addEq(movableObject._directions.right);
        res.addEq(movableObject._directions.left);


        movableObject.setVelocity(Vector.mul(v, Vector.mul(res, 1.0/res.norm())));
    }

    function stop(dir) {
        movableObject._directions[dir] = new Vector({x: 0, y: 0});
        calcV();
    }

    KeyboardJS.on('a',
        function() {
            movableObject._directions.left = new Vector({x: -1, y: 0});
            calcV();
        },
        function() {
            stop('left');
        }
    );
    KeyboardJS.on('d',
        function() {
            movableObject._directions.right = new Vector({x: 1, y: 0});
            calcV();
        },
        function() {
            stop('right');
        }
    );
    KeyboardJS.on('w',
        function() {
            movableObject._directions.up = new Vector({x: 0, y: -1});
            calcV();
        },
        function() {
            stop('up');
        }
    );
    KeyboardJS.on('s',
        function() {
            movableObject._directions.down = new Vector({x: 0, y: 1});
            calcV();
        },
        function() {
            stop('down');
        }
    );
}