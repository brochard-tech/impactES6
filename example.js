// We redefine the requirecontext to be able to require all ES5 files presents in the example folder
ig.requirecontext = require.context('example/lib/', true, /^((?![\\/]impactES6|weltmeister[\\/]).)*\.js$/);


// Import impact library
import "lib/impact/impact";

// Merge features into new ImpactEngine
ig.mergeES5();
window.ig = ig;

require('example/lib/game/main');