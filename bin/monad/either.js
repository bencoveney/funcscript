"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Either {
    constructor(state) {
        this.state = state;
    }
    static left(error) {
        return new Either({ hasValue: false, store: error });
    }
    static right(value) {
        return new Either({ hasValue: true, store: value });
    }
    static from(value) {
        if (value instanceof Either) {
            return value;
        }
        return this.create(value);
    }
    static tryFrom(mightFail) {
        try {
            return Either.from(mightFail());
        }
        catch (error) {
            return Either.left(error);
        }
    }
    static create(value) {
        return Either.isError(value) ? Either.left(value) : Either.right(value);
    }
    static tryCreate(mightFail) {
        try {
            return Either.create(mightFail());
        }
        catch (error) {
            return Either.left(error);
        }
    }
    static isError(value) {
        return value instanceof Error;
    }
    getOrElse(defaultValue) {
        return this.state.hasValue ? this.state.store : defaultValue;
    }
    hasValue() {
        return this.state.hasValue;
    }
    flatMap(mapper) {
        if (this.state.hasValue) {
            const value = this.state.store;
            return Either.tryFrom(() => mapper(value));
        }
        else {
            return Either.left(this.state.store);
        }
    }
    lift(mapper) {
        return this.ifElse(mapper, (error) => Either.left(error));
    }
    ifElse(right, left) {
        if (this.state.hasValue) {
            const value = this.state.store;
            return Either.tryFrom(() => right(value));
        }
        else {
            const error = this.state.store;
            return Either.tryFrom(() => left(error));
        }
    }
    caseOf(cases) {
        return this.ifElse(cases.right, cases.left);
    }
}
exports.Either = Either;
//# sourceMappingURL=either.js.map