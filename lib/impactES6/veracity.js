/**
 * Export declaration
 */
var exports = module.exports = {};

/**
 * Log Error system (only if not on production environment)
 * @param message
 * @param ref
 */
var logError = function (message, ref) {
    if (!(typeof(process) !== 'undefined' && process.env && process.env.NODE_ENV === "production")) {
        console.error('Veracity Error' + (ref ? "[" + ref + "]" : ""), message);
    }
};

/**
 * Object VeracityType
 * @param name
 * @param validator
 * @param value
 * @constructor
 */
function VeracityType (name, validator, value) {
    this.name       = name;
    this.validator  = validator;
    this.value      = value;
};

/**
 * A function that ensure that the object is an instance of VeracityType
 * @param patternType
 * @returns {*}
 */
var constructVeracityType = function (patternType) {
    if (typeof patternType === "function") {
        patternType = patternType();
    }

    if (!(patternType instanceof VeracityType)) {
        logError('A pattern validator must be an instance of VeracityType');
        return null;
    }

    return patternType;
};


/**
 * Types Enumeration
 */
exports.Type = {
    // Number format
    Integer: function () {
        return new VeracityType('integer', function (property) {
            return !isNaN(property) && isFinite(property) && property % 1 === 0;
        });
    },

    // Float format
    Float: function () {
        return new VeracityType('float', function (property) {
            return Number(property) === property && property %1 !== 0;
        });
    },

    // Boolean format
    Boolean: function () {
        return new VeracityType('boolean', function (property) {
            return typeof(property) === 'boolean';
        });
    },

    // String format
    String: function () {
        return new VeracityType('string', function (property) {
            return typeof(property) === 'string';
        });
    },

    // Array format
    Array: function () {
        return new VeracityType('array', function (property) {
            return property instanceof Array;
        });
    },

    // Object format
    Object: function (waterfallValidation) {
        return new VeracityType('object', function (property, values) {
            return (typeof(property) === 'object') ? (values ? exports.validate(property, values) : true) : false;
        }, waterfallValidation);
    },

    // Regular Expression
    Regex: function (regex) {
        return new VeracityType('regex', function (property, regexValue) {
            return regexValue ? new RegExp(regexValue).test(property) : false;
        }, regex);
    },

    // One value among values passed in parameters
    AmongValues: function (arrValues) {
        return new VeracityType('amongvalues', function (property, values) {
            if (!values) {
                return false;
            }

            for (var i = 0; i < values.length; i++) {
                var value = values[i];

                if (property === value) {
                    return true;
                }
            }

            return false;
        }, arrValues);
    },


    // One type among types passed in parameters
    AmongTypes: function (arrTypes) {
        return new VeracityType('amongTypes', function (property, values) {
            if (!values) {
                return false;
            }

            for (var i = 0; i < values.length; i++) {
                var type = constructVeracityType(values[i]);

                if (type instanceof VeracityType && exports.validate(property, type)) {
                    return true;
                }
            }

            return false;
        }, arrTypes);
    }
};


/**
 * Valid a property with a type
 * @param property
 * @param veracityType
 */
exports.validateFormat = function (property, veracityType) {
    if (!property || !veracityType || (veracityType && !(veracityType instanceof VeracityType))) {
        return false;
    }

    return veracityType.validator(property, veracityType.value);
};


/**
 * Valid all properties of the data
 * @param data
 * @param veracityPattern
 * @param options
 * @returns {boolean}
 */
exports.validate = function (data, veracityPattern, options) {
    if (!data || !veracityPattern) {
        return true;
    }

    if (!(veracityPattern instanceof Array)) {
        return exports.validateFormat(data, constructVeracityType(veracityPattern), options);
    }

    var validated   = true;
    options         = options || {};

    for (var i = 0; i < veracityPattern.length; i++) {
        var pattern = veracityPattern[i];
        pattern.type = constructVeracityType(pattern.type);

        if (data.hasOwnProperty(pattern.name)) {
            var dataProperty = data[pattern.name];
            if (!exports.validateFormat(dataProperty, pattern.type, pattern.value)) {
                validated = false;
                logError('Bad format for property : ' + dataProperty + ', expected : ' + pattern.type.name + ', but : ' + typeof(dataProperty), options.ref);
            }

        } else if (pattern.required) {
            validated = false;
            logError('Missing parameter, expected : ' + pattern.name, options.ref);
        }

        if (!validated) {
            break;
        }
    }

    if (validated && options.success) {
        options.success(data);
    }

    return validated;
};


/**
 * Module Export
 */
module.export = exports;