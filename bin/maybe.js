"use strict";
exports.__esModule = true;
function IsEmpty(value) {
    return value === undefined || value === null;
}
var Maybe = /** @class */ (function () {
    function Maybe(value) {
        this.value = value;
    }
    Maybe.just = function (value) {
        if (IsEmpty(value)) {
            throw Error("Cannot call Just on an empty value. Try Create().");
        }
        return new Maybe(value);
    };
    Maybe.nothing = function () {
        return new Maybe(null);
    };
    Maybe.create = function (value) {
        return IsEmpty(value) ? Maybe.nothing() : Maybe.just(value);
    };
    Maybe.prototype.getOrElse = function (defaultValue) {
        return IsEmpty(this.value) ? defaultValue : this.value;
    };
    Maybe.prototype.flatMap = function (mapper) {
        // Mapping a nothing gives nothing.
        if (IsEmpty(this.value)) {
            return Maybe.nothing();
        }
        else {
            return mapper(this.value);
        }
    };
    Maybe.prototype.then = function (mapper) {
        // Mapping a nothing gives nothing.
        if (IsEmpty(this.value)) {
            return Maybe.nothing();
        }
        var result = mapper(this.value);
        if (IsEmpty(result)) {
            return Maybe.nothing();
        }
        if (result instanceof Maybe) {
            return result;
        }
        return Maybe.just(result);
    };
    return Maybe;
}());
exports.Maybe = Maybe;
//# sourceMappingURL=maybe.js.map