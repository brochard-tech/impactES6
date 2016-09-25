import Character from "./Character";


export default class CharacterSpike extends Character {
    /* LIFECYCLE */
    init (x, y, settings)
    {
        super.init(x, y, settings);

        // Animations
        this.addAnim('idle', 1, [0]);
        this.addAnim('walk', 0.2, [1, 2]);
    }
}


ig.bindProperties(CharacterSpike, {
    animSheet       : new ig.AnimationSheet('example/media/spiker.png', 30, 40),
    size            : {x: 30, y: 40},
    type            : ig.Entity.TYPE.B,
    checkAgainst    : ig.Entity.TYPE.A
});