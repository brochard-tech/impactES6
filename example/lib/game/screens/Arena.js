import CharacterFlight from "./../entities/characters/CharacterFlight";
import CharacterSpike from "./../entities/characters/CharacterSpike";

ig.require('impact.game');


export default class Arena extends ig.Game {
    /* LIFECYCLE */
    init ()
    {
        // Bind inputs for player
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.SPACE, 'fire');

        this.player = ig.game.spawnEntity(CharacterFlight, 0, 0);
        this.spike  = ig.game.spawnEntity(CharacterSpike, 50, ig.system.height - 100);
        ig.game.spawnEntity(CharacterSpike, 200, ig.system.height - 100, { size: {x: 70, y: 70} });
    }

    update ()
    {
        super.update();

        if (this.player) {
            this.updateInputs();
        }
    }

    draw ()
    {
        super.draw();

        var x = ig.system.width / 2,
            y = ig.system.height / 2;

        this.font.draw('It Works!', x, y, ig.Font.ALIGN.CENTER);
    }


    /* METHODS */
    updateInputs ()
    {
        var left    = ig.input.state('left');
        var right   = ig.input.state('right');
        var up      = ig.input.state('up');
        var down    = ig.input.state('down');
        var x       = 0;
        var y       = 0;

        if (left) { x--; }
        if (right) { x++; }
        if (down) { y++; }
        if (up) { y--; }

        this.player.setVel(x, y);

        if (ig.input.pressed('fire')) {
            this.player.fire();
        }
    }
}

ig.bindProperties(Arena, {
    gravity : 300,
    player  : null,
    font    : new ig.Font('media/04b03.font.png')
});