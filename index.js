// Import impact library
import "lib/impact/impact";

// Merge features into new ImpactEngine
ig.mergeES5();
window.ig = ig;

// Import main game
require('lib/game/main');