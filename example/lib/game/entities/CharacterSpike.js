import Character from "./Character";


export default class CharacterSpike extends Character {
    /* LIFECYCLE */
    init (x, y, settings)
    {
        super.init(x, y, settings);

        this.type           = ig.Entity.TYPE.B;
        this.checkAgainst   = ig.Entity.TYPE.A;
        this.animSheet      = new ig.AnimationSheet('example/media/spiker.png', 30, 40);
        this.size           = {x: 30, y: 40};

        // Animations
        this.addAnim('idle', 1, [0]);
        this.addAnim('walk', 0.2, [1, 2]);
    }
}