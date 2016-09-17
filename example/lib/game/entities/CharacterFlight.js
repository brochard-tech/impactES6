import Character from "./Character";
import Bullet from "./Bullet";


export default class CharacterFlight extends Character {
    /* LIFECYCLE */
    init (x, y, settings)
    {
        super.init(x, y, settings);

        this.animSheet      = new ig.AnimationSheet('example/media/helicopter.png', 43, 36);
        this.size           = {x: 43, y: 36};
        this.type           = ig.Entity.TYPE.A;
        this.checkAgainst   = ig.Entity.TYPE.B;
        this.gravityFactor  = 0;
        this.zIndex         = 1;
        this.speed          = 300;
        this.friction       = {x: 300, y: 300};

        // Set animation
        this.addAnim('idle', 0.1, [0, 1, 2]);
    }


    /* METHOD */
    fire ()
    {
        if (super.fire()) {
            ig.game.spawnEntity(Bullet, this.pos.x + (this.size.x / 2), this.pos.y + this.size.y, { owner: this });
        }
    }
}