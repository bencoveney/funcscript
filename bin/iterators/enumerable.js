"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Enumerable {
    constructor(iterator) {
        this.iterator = iterator;
    }
    static from(arrayLike) {
        return Enumerable.generate(function* () {
            for (let index = 0; index < arrayLike.length; index++) {
                yield arrayLike[index];
            }
        });
    }
    static of(...args) {
        return Enumerable.from(args);
    }
    static generate(generator) {
        return new Enumerable(generator());
    }
    static wrap(iterator) {
        return new Enumerable(iterator);
    }
    filter(predicate) {
        const that = this;
        return Enumerable.generate(function* () {
            let result = that.iterator.next();
            while (!result.done) {
                if (predicate(result.value)) {
                    yield result.value;
                }
                result = that.iterator.next();
            }
        });
    }
    map(transform) {
        const that = this;
        return Enumerable.generate(function* () {
            let result = that.iterator.next();
            while (!result.done) {
                yield transform(result.value);
                result = that.iterator.next();
            }
        });
    }
    next() {
        return this.iterator.next();
    }
    [Symbol.iterator]() {
        return this;
    }
}
exports.Enumerable = Enumerable;
//# sourceMappingURL=enumerable.js.map