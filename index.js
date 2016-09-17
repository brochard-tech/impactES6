// Import impact library
import "lib/impact/impact";

// Merge features into new ImpactEngine
ig.mergeES5();
window.ig = ig;

// Import main game
require('lib/game/main');

// Uncomment this line and comment the line above to see an example of ES6
//require('example/lib/game/main');