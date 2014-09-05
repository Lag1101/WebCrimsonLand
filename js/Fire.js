/**
 * Created by vasiliy.lomanov on 04.09.2014.
 */


function WeaponStat(stat) {
    this.rate = stat.rate;
    this.damage = stat.damage;
    this.bulletSpeed = stat.bulletSpeed;
    this.capacity = stat.capacity;
    this.reloadTime =stat.reloadTime;
}

function Bullet(damage, speed) {
    this.damage = damage;
    this.speed = speed;
}

const WeaponPresets = {
    PM: new WeaponStat({rate:15, damage:25, bulletSpeed:15, capacity:10, reloadTime:200}),
    AK47: new WeaponStat({rate:30, damage:50, bulletSpeed:25, capacity:30, reloadTime:500})
};

function Weapon(preset) {
    this.preset = preset;
    this.currentStat = new WeaponStat(WeaponPresets[this.preset]);
    this.canFire = true;
    this.reloading = false;
}

Weapon.prototype.reload = function() {
    this.capacity = 0;
    this.reloading = true;
    var _this = this;
    setTimeout(function() {
        _this.currentStat.capacity = WeaponPresets[_this.preset].capacity;
        _this.reloading = false;
        console.log("reloaded");
    }, this.currentStat.reloadTime);
};

Weapon.prototype.fire = function() {
    console.log(this.currentStat.capacity);
    if( this.currentStat.capacity <= 0) {
        if( !this.reloading)
            this.reload();
    } else if(this.canFire) {
        this.canFire = false;
        var _this = this;
        setTimeout(function(){
            _this.canFire = true;
        }, 1000.0/this.currentStat.rate);

        this.currentStat.capacity --;
        return new Bullet(this.currentStat.damage, this.currentStat.bulletSpeed);
    }
};

function fire(dir) {
    if( this.movable instanceof Movable && this.weapon instanceof Weapon)
    {
        dir.subEq(me.movable.coordinate);
        var n = Vector.mul( dir, 1.0/dir.norm() );
        var from = new Vector(me.movable.coordinate);
        from.addEq(Vector.mul(n, 5+1));

        var bullet = this.weapon.fire();
        if( bullet ) {
            Movable.makeMovable(bullet, from);
            bullet.movable.setVelocity(Vector.mul(n, bullet.speed));
            Collisionable.makeCollisionable(bullet, 1);
            return bullet;
        }
    }
}

function giveHimWeapon(obj, preset) {
    obj.weapon = new Weapon(preset);
    obj.fire = fire;
}

