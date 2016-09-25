# impactES6

### NEW UPDATE : **Version BETA 0.3**

#### What's new in 0.3 Version
- Is it now possible to have a project with both old script and ES6 Scripts. Note : To avoid most common error, please read the chapter about "Use Strict mode"
- Preloading image run now correctly

This project allow you tu use ES6 with ImpactJS.

> **Note about current version**

> - Impact Library support : **Version 1.24**
> - It is currently not possible to have ES5 impact module and ES6 class. I recommand you to use this project for a new game only.
> - If you encouter any bugs or issues, please report it into the issues page


## Overview

#### ES6

ImpactJS is an excellent javascript game framework with lots of features. But there is actually no support with ES6.
ES6 is a new way to write javascript code and it is so much better than ES5. [Click here for more informations about ES6 features][1]


#### Webpack

This project use webpack to minify and uglify your all game into a single file. [Click here for more informations about Webpack][2]


#### Node and Npm

Npm ("Module Package Manager") is a tool for manage your project dependency. To have Npm in your shell, you must install **Node**
[by clicking here][3]

#### Use strict mode

In ES6, all scripts are in *use strict* mode. In this mode, you **can't** create a global variable :
```javascript
  EntityPlayer = ig.Entity.extend(...) // Will throw an error because EntityPlayer doesn't exist
```
To avoid this error, you **must** bind your entity with "ig" variable like this :
```javascript
  ig.EntityPlayer = ig.Entity.extend(...) // GOOD !
```
In fact, in *use strict* mode, a function that is not an object can't have a reference to a *this* and it doesn't not also
reference to *window* object.


## Installation

##### **1)** Copy this project into your local environment.

##### **2)** Install package with npm 
```
  npm install
```

##### **3)** Install ImpactJS into the project
The ImpactJS folder must be at the root of this project. In other terms : **game** and **impact** folders should be into the lib directory with "impactES6" folder.

##### **4)** Make your game !
The project is now configured and you can develop your game with ES6 !

##### **5)** Build your game into a single file
To build your games into a single file, use the shell and type this command into the root directory of your project
```
  npm run build
```

If your are in a development environnement, you can use :
```
  npm run build-dev
```
This command has a watcher and it will build your game when a file has changed.


## Usage

### Import an old script
```javascript
ig.require('game.entities.fire');   // You need to require it juste once. It will be loaded for all your project
```

### Import a new script
```javascript
import EntityPlayer from "lib/game/entities/player";
```

### Create an entity
```javascript
export default class EntityPlayer extend ig.Entity {

    init (x, y, settings) 
    {
        super.init(x, y, settings);
        ...
    }
    
    fire ()
    {
        ig.game.spawnEntity(EntityFire, this.pos.x + (this.size.x / 2), this.pos.y + this.size.y, { owner: this });
    }
    
}
```

### Default properties
Default properties is a new way to declare your properties **before** the new object was created.
For example, in ES5 Script, you have :
```javascript
    ig.EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet('media/player.png', 10, 10),
        size    : {x: 10, y: 10},
        speed: 300,
        
        init: function (x, y, settings) {
            ...
        }
    });
```

In ES6, you can't define variable except into a function, so, when it is created. But ImpactES6 has a function which
allow you to define properties. Like this :
```javascript
export default class EntityPlayer extend ig.Entity {
    init (x, y, settings) 
    {
        ...
    }
}

ig.bindProperties(EntityPlayer, {
    animSheet   : new ig.AnimationSheet('media/player.png', 10, 10),
    size        : {x: 10, y: 10},
    speed       : 300
});
```

### jQuery
jQuery is added by default on the project. You can call "$" or "jQuery" without do anything. But if you want to add
plugin into jQuery, you have to use *imports-loader* and import your plugin like this :
```javascript
import "imports?$=jquery,this=>window!velocity-animate";
```
It is a query string which means that you import global jQuery into the script and you define the window object like global variable.
Like *ig.require*, import it once and it will be loaded into all your project.


## Examples

You can see a dummy example into the folder, juste load the index.html in your browser and you will see.
 
 



[1]: https://babeljs.io/docs/learn-es2015/
[2]: https://webpack.github.io/docs/what-is-webpack.html
[3]: https://docs.npmjs.com/getting-started/installing-node