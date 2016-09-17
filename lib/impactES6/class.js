import clone from "clone";
import Veracity from "lib/impactES6/veracity";


const __transmitES5Inheritance = () => {
     console.log(this);
    if (this.constructor.classES5) {
        var objectES5 = new this.constructor.classES5();

        for (var propname in objectES5) {
            if (propname !== "constructor") {
                this[propname] = objectES5[propname];
            }
        }
    }

    if (this.init) {
        this.init(...arguments);
    }
};


export default class Class {
    constructor ()
    {

        __transmitES5Inheritance.bind(this, ...arguments);
    }

    static inheritance (classES5)
    {
        var objectES5                   = new classES5();
        var newClass                    = class {
            constructor ()
            {
                for (var propname in this) {
                    if (propname !== "constructor") {
                        var prop = this[propname];

                        if (Veracity.validate(prop, Veracity.Type.Object) && !Veracity.validate(prop, Veracity.Type.Array)) {
                            this[propname] = clone(prop, false);
                        }
                    }
                }
                
                if (this.init) {
                    this.init(...arguments);
                }
            }
        };

        for (var propname in objectES5) {
            if (propname !== "constructor") {
                newClass.prototype[propname] = objectES5[propname];
            }
        }

        return newClass;
    }
}