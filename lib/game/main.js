import Class from "lib/impactES6/Class";

// Method to require an impact library
// Once it is loaded, it doesn't need to require it again
ig.require('impact.game');
ig.require('impact.debug.debug');


class MyGame extends Class.inheritance(ig.Game) {
    init ()
    {
        // Declare properties

        // Load a font
        this.font   = new ig.Font('media/04b03.font.png');
    }

    update ()
    {
        // Update all entities and backgroundMaps
        super.update();

        // Add your own, additional update code here
    }

    draw ()
    {
        // Draw all entities and backgroundMaps
        super.draw();

        // Add your own drawing code here
        var x = ig.system.width / 2,
            y = ig.system.height / 2;

        this.font.draw('It Works!', x, y, ig.Font.ALIGN.CENTER);
    }
}

ig.main('#canvas', MyGame, 60, 320, 240, 2);

export default MyGame;