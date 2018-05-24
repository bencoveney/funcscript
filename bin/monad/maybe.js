"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Maybe {
    constructor(value) {
        this.value = value;
    }
    static just(value) {
        if (Maybe.IsEmpty(value)) {
            throw Error("Cannot call Just on an empty value. Try Create().");
        }
        return new Maybe(value);
    }
    static nothing() {
        return new Maybe(null);
    }
    static from(value) {
        if (Maybe.IsEmpty(value)) {
            return Maybe.nothing();
        }
        if (value instanceof Maybe) {
            return value;
        }
        return Maybe.just(value);
    }
    static IsEmpty(value) {
        return value === undefined || value === null;
    }
    getOrElse(defaultValue) {
        return Maybe.IsEmpty(this.value) ? defaultValue : this.value;
    }
    hasValue() {
        return !Maybe.IsEmpty(this.value);
    }
    flatMap(mapper) {
        return this.ifElse(mapper, () => Maybe.nothing());
    }
    lift(mapper) {
        return this.ifElse((value) => Maybe.from(mapper(value)), () => Maybe.nothing());
    }
    ifElse(just, nothing) {
        return Maybe.from(Maybe.IsEmpty(this.value) ? nothing() : just(this.value));
    }
    caseOf(cases) {
        return this.ifElse(cases.just, cases.nothing);
    }
}
exports.Maybe = Maybe;
//# sourceMappingURL=maybe.js.map