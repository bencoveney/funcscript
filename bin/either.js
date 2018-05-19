"use strict";
exports.__esModule = true;
var Either = /** @class */ (function () {
    function Either(state) {
        this.state = state;
    }
    Either.left = function (error) {
        return new Either({ hasValue: false, store: error });
    };
    Either.right = function (value) {
        return new Either({ hasValue: true, store: value });
    };
    Either.from = function (value) {
        if (value instanceof Either) {
            return value;
        }
        return this.create(value);
    };
    Either.tryFrom = function (mightFail) {
        try {
            return Either.from(mightFail());
        }
        catch (error) {
            return Either.left(error);
        }
    };
    Either.create = function (value) {
        return Either.isError(value) ? Either.left(value) : Either.right(value);
    };
    Either.tryCreate = function (mightFail) {
        try {
            return Either.create(mightFail());
        }
        catch (error) {
            return Either.left(error);
        }
    };
    Either.isError = function (value) {
        return value instanceof Error;
    };
    Either.prototype.getOrElse = function (defaultValue) {
        return this.state.hasValue ? this.state.store : defaultValue;
    };
    Either.prototype.hasValue = function () {
        return this.state.hasValue;
    };
    Either.prototype.flatMap = function (mapper) {
        if (this.state.hasValue) {
            var value_1 = this.state.store;
            return Either.tryFrom(function () { return mapper(value_1); });
        }
        else {
            return Either.left(this.state.store);
        }
    };
    Either.prototype.lift = function (mapper) {
        return this.ifElse(mapper, function (error) { return Either.left(error); });
    };
    Either.prototype.ifElse = function (right, left) {
        if (this.state.hasValue) {
            var value_2 = this.state.store;
            return Either.tryFrom(function () { return right(value_2); });
        }
        else {
            var error_1 = this.state.store;
            return Either.tryFrom(function () { return left(error_1); });
        }
    };
    Either.prototype.caseOf = function (cases) {
        return this.ifElse(cases.right, cases.left);
    };
    return Either;
}());
exports.Either = Either;
//# sourceMappingURL=either.js.map