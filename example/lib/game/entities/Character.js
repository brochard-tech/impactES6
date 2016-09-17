import Class from "lib/impactES6/Class";

ig.require('impact.entity');


export default class Character extends Class.inheritance(ig.Entity) {
    /* LIFECYCLE */
    init (x, y, settings)
    {
        super.init(x, y, settings);

        this.zIndex         = 0;
        this.speed          = 100;
        this.health         = 100;
        this.timeWeaponWait = 200;
        this.gravityFactor  = 0;
    }

    update ()
    {
        super.update();

        if (this.currentAnim) {
            this.updateAnimation();
        }
    }

    check ()
    {
        //this.kill();
    }


    /* METHODS */
    updateAnimation ()
    {
        this.currentAnim.flip.x = this.flip;
    }

    setDirection (speedType, x, y)
    {
        if (speedType !== "vel" && speedType !== "accel") {
            return null;
        }

        this[speedType].y   = (y || 0) * this.speed;
        this[speedType].x   = (x || 0) * this.speed;
    }

    setVel (x, y)
    {
        this.setDirection('vel', x, y);
    }

    setAccel (x, y)
    {
        if (!x && !y && !this.accel.x && !this.accel.y) {
            return null;
        }

        this.setDirection('accel', x, y);
    }

    fire ()
    {
        if (this._killed) {
            return false;
        }

        if (!this.timerWeaponWait) {
            this.timerWeaponWait = new ig.Timer(this.timeWeaponWait / 100);
            return true;

        } else if (this.timerWeaponWait.delta() > 0) {
            this.timerWeaponWait = null;
            return true;
        }

        return false;
    }
}