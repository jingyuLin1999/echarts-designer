/**
 * @description Get the rgb value of the hex color
 * @param {String} color Hex color
 * @return {Array<Number>} Rgb value of the color
 */
export function getRgbValueFromHex(color) {
    color = color.replace('#', '');
    if (color.length === 3) color = Array.from(color).map(function (hexNum) {
        return hexNum + hexNum;
    }).join('');
    color = color.split('');
    return new Array(3).fill(0).map(function (t, i) {
        return parseInt("0x".concat(color[i * 2]).concat(color[i * 2 + 1]));
    });
}


/**
 * @description Get the Rgb value of the color
 * @param {String} color Hex|Rgb|Rgba color or color keyword
 * @return {Array<Number>|Boolean} Rgb value of the color (Invalid input will return false)
 */
export function getRgbValue(color) {
    if (!color) {
        console.error('getRgbValue: Missing parameters!');
        return false;
    }
    // color = validator(color);
    // if (!color) return false;
    var hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var rgbReg = /^(rgb|rgba|RGB|RGBA)/;
    var rgbaReg = /^(rgba|RGBA)/;

    var isHex = hexReg.test(color);
    var isRgb = rgbReg.test(color);
    var lowerColor = color.toLowerCase();
    if (isHex) return getRgbValueFromHex(lowerColor);
    if (isRgb) return getRgbValueFromRgb(lowerColor);
}

function arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }

    return arr2;
}

function arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

function iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    let n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

function nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

var interopRequireDefault = createCommonjsModule(function (module) {
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }

    module.exports = _interopRequireDefault;
});

var _toConsumableArray2 = interopRequireDefault(toConsumableArray);

/**
 * @description Get Color from Rgb|Rgba value
 * @param {Array<Number>} value Rgb|Rgba color value
 * @return {String|Boolean} Rgb|Rgba color (Invalid input will return false)
 */
export function getColorFromRgbValue(value) {
    if (!value) {
        console.error('getColorFromRgbValue: Missing parameters!');
        return false;
    }

    let valueLength = value.length;

    if (valueLength !== 3 && valueLength !== 4) {
        console.error('getColorFromRgbValue: Value is illegal!');
        return false;
    }

    let color = valueLength === 3 ? 'rgb(' : 'rgba(';
    color += value.join(',') + ')';
    return color;
}

/**
 * @description Adjust color opacity
 * @param {String} color   Hex|Rgb|Rgba color or color keyword
 * @param {Number} Percent of opacity
 * @return {String|Boolean} Rgba color (Invalid input will return false)
 */
export function fade(color) {
    let percent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

    if (!color) {
        console.error('fade: Missing parameters!');
        return false;
    }

    let rgbValue = getRgbValue(color);
    if (!rgbValue) return false;
    let rgbaValue = [].concat((0, _toConsumableArray2["default"])(rgbValue), [percent / 100]);
    return getColorFromRgbValue(rgbaValue);
}


