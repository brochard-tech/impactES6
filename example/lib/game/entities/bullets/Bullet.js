ig.module(
    'game.entities.bullets.bullet'

).requires(
    'impact.entity'
    
).defines(function () {

    ig.EntityBullet = ig.Entity.extend({
        /* ATTRIBUTES */
        amount: 10,
        owner : null,
        
        
        /* LIFECYCLE */
        init: function (x, y, settings) 
        {
            this.parent(x, y, settings);
            
            if (this.owner) {
                this.type           = this.owner.type;
                this.checkAgainst   = (this.type === ig.Entity.TYPE.A) ? ig.Entity.TYPE.B : ig.Entity.TYPE.A;
            }

            if (this.animSheet) {
                this.addAnim('idle', 1, [0]);
            }
        },
        
        update: function ()
        {
            this.parent();

            if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x > ig.system.width || this.pos.y > ig.system.height) {
                this.kill();
            }

            return 4;
        },
        
        check: function (other)
        {
            other.receiveDamage(this.amount);
            this.kill();
        }
    });
    
});