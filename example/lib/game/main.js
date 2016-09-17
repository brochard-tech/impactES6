import Arena from "./screens/Arena";

// Method to require an impact library
// Once it is loaded, it doesn't need to require it again
ig.require('impact.debug.debug');

// Launch the game
ig.main('#canvas', Arena, 60, 500, 500, 1);