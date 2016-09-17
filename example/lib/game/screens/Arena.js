import Class from "lib/impactES6/Class";
import CharacterFlight from "./../entities/CharacterFlight";
import CharacterSpike from "./../entities/CharacterSpike";

ig.require('impact.game');


export default class Arena extends Class.inheritance(ig.Game) {
    /* LIFECYCLE */
    init ()
    {
        this.gravity    = 300;
        this.player     = null;

        // Bind inputs for player
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.SPACE, 'fire');

        this.player = ig.game.spawnEntity(CharacterFlight, 0, 0);
        this.spike  = ig.game.spawnEntity(CharacterSpike, 50, Arena.getHeight() - 100);
    }

    update ()
    {
        super.update();

        if (this.player) {
            this.updateInputs();
        }
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

        this.player.setAccel(x, y);

        if (ig.input.pressed('fire')) {
            this.player.fire();
        }
    }

    static getWidth ()
    {
        return ig.system.scale * ig.system.width;
    }

    static getHeight ()
    {
        return ig.system.scale * ig.system.height;
    }
}