"use strict";
exports.__esModule = true;
var Maybe = /** @class */ (function () {
    function Maybe(value) {
        this.value = value;
    }
    Maybe.just = function (value) {
        if (Maybe.IsEmpty(value)) {
            throw Error("Cannot call Just on an empty value. Try Create().");
        }
        return new Maybe(value);
    };
    Maybe.nothing = function () {
        return new Maybe(null);
    };
    Maybe.from = function (value) {
        if (Maybe.IsEmpty(value)) {
            return Maybe.nothing();
        }
        if (value instanceof Maybe) {
            return value;
        }
        return Maybe.just(value);
    };
    Maybe.IsEmpty = function (value) {
        return value === undefined || value === null;
    };
    Maybe.prototype.getOrElse = function (defaultValue) {
        return Maybe.IsEmpty(this.value) ? defaultValue : this.value;
    };
    Maybe.prototype.hasValue = function () {
        return !Maybe.IsEmpty(this.value);
    };
    Maybe.prototype.flatMap = function (mapper) {
        return this.ifElse(mapper, function () { return Maybe.nothing(); });
    };
    Maybe.prototype.lift = function (mapper) {
        return this.ifElse(function (value) { return Maybe.from(mapper(value)); }, function () { return Maybe.nothing(); });
    };
    Maybe.prototype.ifElse = function (just, nothing) {
        return Maybe.from(Maybe.IsEmpty(this.value) ? nothing() : just(this.value));
    };
    Maybe.prototype.caseOf = function (cases) {
        return this.ifElse(cases.just, cases.nothing);
    };
    return Maybe;
}());
exports.Maybe = Maybe;
//# sourceMappingURL=maybe.js.map