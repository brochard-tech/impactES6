var igES6 = module.exports = {
    /**
     * This variable is at true when igES6 has all method of impact library
     */
    _importES5: false,

    /**
     * Data provided by ig.module, ig.requires and ig.defines before _importES5 at true
     */
    _storedData: {modules: [], requires: [], defines: []},

    /**
     * List of all modules ES5 loaded
     */
    modules: {},

    /**
     * Context folder of all library (needed for dynamic require)
     */
    requirecontext: require.context('lib/', true, /^((?![\\/]impactES6|weltmeister[\\/]).)*\.js$/),

    /**
     * Define a new module (support ES5)
     * @param name
     * @returns Object
     */
    module: function (name)
    {
        if (!name) {
            return this;

        }

        if (!this._importES5) {
            this._storedData.modules.push(name);

        } else if (!this.modules[name]) {
            this.modules[name] = true;

        }

        return this;
    },

    /**
     * Requires all module for the current module (support ES5)
     * @returns Object
     */
    requires: function ()
    {
        var args = Array.from(arguments);

        if (!this._importES5) {
            this._storedData.requires.push(args);
            return this;
        }

        args.map((arg) => {
            if (arg === "dom.ready") {
                this._ready = true;

            } else {
                this.require(arg);

            }
        });

        return this;
    },

    /**
     * Require a module
     * @param moduleName
     */
    require: function (moduleName)
    {
        if (!this.modules[moduleName] && moduleName !== "impact.impact") {
            let path = "./" + moduleName.split('.').join('/') + '.js';
            this.requirecontext(path);
        }
    },

    /**
     * Define a module (ig.module must be defined before) (support ES5)
     * @param define
     */
    defines: function (define)
    {
        if (!this._importES5) {
            this._storedData.defines.push(define);

        } else {
            define();

        }
    },

    /**
     * Merge all storedData provided by old module before _importES5
     */
    mergeES5: function ()
    {
        for (var propName in window.ig) {
            if (!this.hasOwnProperty(propName) && window.ig.hasOwnProperty(propName)) {
                this[propName] = window.ig[propName];
            }
        }

        this.setVendorAttribute         = window.ig.setVendorAttribute;
        this.getVendorAttribute         = window.ig.getVendorAttribute;
        this.normalizeVendorAttribute   = window.ig.normalizeVendorAttribute;

        this._importES5 = true;

        this._storedData.modules.map(x => this.module(x));
        this._storedData.requires.map(x => this.requires.apply(this, x));
        this._storedData.defines.map(x => this.defines(x));
    },

    /**
     * Bind props to ES6 currentClass
     * @param currentClass
     * @param props
     * @returns {*}
     */
    bindProperties: function (currentClass, props)
    {
        for (var propname in props) {
            currentClass.prototype[propname] = props[propname];
        }

        return currentClass;
    },

    /**
     * Override of ImpactJS
     * @returns {boolean}
     * @private
     */
    _DOMReady: function()
    {
        return !!this._ready;
    },

    /**
     * Same as ImpactJS
     * @param element
     * @param attribute
     * @param value
     */
    setVendorAttribute: (element, attribute, value) => {
        window.ig.setVendorAttribute(element, attribute, value);
    },

    /**
     * Same as ImpactJS
     * @param element
     * @param attribute
     * @returns {*}
     */
    getVendorAttribute: (element, attribute) => {
        return window.ig.getVendorAttribute(element, attribute);
    },

    /**
     * Same as ImpactJS
     * @param element
     * @param attribute
     */
    normalizeVendorAttribute: (element, attribute) => {
        window.ig.normalizeVendorAttribute(element, attribute);
    }
};

module.export   = igES6;