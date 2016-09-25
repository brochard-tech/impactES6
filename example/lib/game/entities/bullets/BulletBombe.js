ig.require('game.entities.bullets.bullet');


export default class BulletBombe extends ig.EntityBullet {
    /* LIFECYCLE */
}

ig.bindProperties(BulletBombe, {
    animSheet   : new ig.AnimationSheet('example/media/fire01.png', 14, 32),
    size        : {x: 14, y: 32},
    vel         : {x: 0, y: 300},
    amount      : 40
});