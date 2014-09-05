/**
 * Created by vasiliy.lomanov on 04.09.2014.
 */


function MouseCtrl(id, ondown, onup, onmove) {

    var dom = document.getElementById(id);

    this.coordinate = new Vector();

    var _this = this;

    this.pushed = false;

    function calcCoordinates(e) {
        return new Vector({
            x: e.pageX - dom.offsetLeft,
            y: e.pageY - dom.offsetTop
        });
    }

    dom.addEventListener('mousedown',function(e) {
        _this.pushed = true;
        _this.coordinate = calcCoordinates(e);
        ondown(new Vector(_this.coordinate));
    });
    dom.addEventListener('mouseup',function(e) {
        _this.pushed = false;
        _this.coordinate = calcCoordinates(e);
        onup(new Vector(_this.coordinate));
    });
    dom.addEventListener('mousemove',function(e) {
        _this.coordinate = calcCoordinates(e);
        onmove(new Vector(_this.coordinate));
    });
}