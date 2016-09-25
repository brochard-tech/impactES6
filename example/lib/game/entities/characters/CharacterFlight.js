import Character from "./Character";
import BulletBombe from "./../bullets/BulletBombe";


export default class CharacterFlight extends Character {
    /* LIFECYCLE */
    init (x, y, settings)
    {
        super.init(x, y, settings);

        this.addAnim('idle', 1, [0]);
    }

    update ()
    {
        super.update();
    }
    
    
    /* METHOD */
    fire ()
    {
        if (super.fire()) {
            ig.game.spawnEntity(BulletBombe, this.pos.x + (this.size.x / 2), this.pos.y + this.size.y, { owner: this });
        }
    }
}

ig.bindProperties(CharacterFlight, {
    animSheet       : new ig.AnimationSheet('example/media/helicopter.png', 43, 36),
    size            : {x: 43, y: 36},
    type            : ig.Entity.TYPE.A,
    checkAgainst    : ig.Entity.TYPE.B,
    gravityFactor   : 0,
    zIndex          : 1,
    speed           : 300
});