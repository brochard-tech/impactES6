import Class from "lib/impactES6/Class";
import Arena from "./../screens/Arena";

ig.require('impact.entity');


export default class Bullet extends Class.inheritance(ig.Entity) {
    /* LIFECYCLE */
    init (x, y, settings)
    {
        super.init(x, y, settings);

        this.animSheet          = new ig.AnimationSheet('example/media/fire01.png', 14, 32);
        this.size               = {x: 14, y: 32};
        this.vel                = {x: 0, y: 300};
        this.amount             = 40;

        if (this.owner) {
            this.type           = this.owner.type;
            this.checkAgainst   = (this.type === ig.Entity.TYPE.A) ? ig.Entity.TYPE.B : ig.Entity.TYPE.A;
        }

        this.addAnim('idle', 1, [0]);
    }

    update ()
    {
        super.update();

        if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x > Arena.getWidth() || this.pos.y > Arena.getHeight()) {
            this.kill();
        }
    }

    check (other)
    {
        other.receiveDamage(this.amount);
        this.kill();
    }
}