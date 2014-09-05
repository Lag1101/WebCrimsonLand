/**
 * Created by vasiliy.lomanov on 03.09.2014.
 */

/// <reference path="./Vector" />

function Drawer(id) {
    var htmlCanvas = document.getElementById(id);

    this.context = htmlCanvas.getContext('2d');
    this.width = htmlCanvas.width;
    this.height = htmlCanvas.height;
}

Drawer.prototype.circle = function(center, radius, color, lineWidth) {
    this.context.beginPath();
    this.context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = color;
    this.context.stroke();
};

Drawer.prototype.clear = function() {
    this.context.clearRect(0,0, this.width, this.height);
};

Drawer.prototype.text = function(text, coordinate) {
    this.context.font="20px Georgia";
    this.context.fillText(text,coordinate.x,coordinate.y);
};