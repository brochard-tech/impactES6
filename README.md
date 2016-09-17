# impactES6

**Version BETA 0.1**

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


## Installation and usage

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


## Examples

You can see a dummy example into the ./example folder.

### How to run the example

 - Go to **index.js** on the root. Uncomment the last line with the require instruction.
 - Don't forget to comment the line above, the one with an other require instruction.
 
 



[1]: https://babeljs.io/docs/learn-es2015/
[2]: https://webpack.github.io/docs/what-is-webpack.html
[3]: https://docs.npmjs.com/getting-started/installing-node