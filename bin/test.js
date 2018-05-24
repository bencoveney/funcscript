"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const logIt = (maybe) => {
    try {
        console.log(maybe.getOrElse("No result"));
    }
    catch (_a) {
        console.log("Error during evaluation");
    }
};
const value = { first: { second: { third: "Hello World!" } } };
logIt(index_1.Maybe
    .just(value)
    .flatMap((value) => index_1.Maybe.from(value.first))
    .flatMap((value) => index_1.Maybe.from(value.second))
    .flatMap((value) => index_1.Maybe.from(value.third)));
logIt(index_1.Maybe
    .just(value)
    .flatMap((value) => index_1.Maybe.from(value.first))
    .flatMap((value) => index_1.Maybe.from(value.second))
    .flatMap((value) => index_1.Maybe.from(value.numberThree)));
logIt(index_1.Maybe
    .just(value)
    .lift((value) => value.first)
    .lift((value) => value.second)
    .lift((value) => value.third));
logIt(index_1.Maybe
    .just(value)
    .lift((value) => value.first)
    .lift((value) => value.second)
    .lift((value) => value.numberThree));
const decrementWithoutThrow = (value) => {
    return value <= 0 ? Error("Value too low") : value - 1;
};
logIt(index_1.Either
    .right(3)
    .flatMap((value) => index_1.Either.from(decrementWithoutThrow(value)))
    .flatMap((value) => index_1.Either.from(decrementWithoutThrow(value)))
    .flatMap((value) => index_1.Either.from(decrementWithoutThrow(value))));
logIt(index_1.Either
    .right(3)
    .flatMap((value) => index_1.Either.from(decrementWithoutThrow(value)))
    .flatMap((value) => index_1.Either.from(decrementWithoutThrow(value)))
    .flatMap((value) => index_1.Either.from(decrementWithoutThrow(value)))
    .flatMap((value) => index_1.Either.from(decrementWithoutThrow(value))));
logIt(index_1.Either
    .right(3)
    .lift(decrementWithoutThrow)
    .lift(decrementWithoutThrow)
    .lift(decrementWithoutThrow));
logIt(index_1.Either
    .right(3)
    .lift(decrementWithoutThrow)
    .lift(decrementWithoutThrow)
    .lift(decrementWithoutThrow)
    .lift(decrementWithoutThrow));
const decrementWithThrow = (value) => {
    if (value <= 0) {
        throw Error("Value too low");
    }
    return value - 1;
};
logIt(index_1.Either
    .right(3)
    .flatMap((value) => index_1.Either.from(decrementWithThrow(value)))
    .flatMap((value) => index_1.Either.from(decrementWithThrow(value)))
    .flatMap((value) => index_1.Either.from(decrementWithThrow(value))));
logIt(index_1.Either
    .right(3)
    .flatMap((value) => index_1.Either.from(decrementWithThrow(value)))
    .flatMap((value) => index_1.Either.from(decrementWithThrow(value)))
    .flatMap((value) => index_1.Either.from(decrementWithThrow(value)))
    .flatMap((value) => index_1.Either.from(decrementWithThrow(value))));
logIt(index_1.Either
    .right(3)
    .lift(decrementWithThrow)
    .lift(decrementWithThrow)
    .lift(decrementWithThrow));
logIt(index_1.Either
    .right(3)
    .lift(decrementWithThrow)
    .lift(decrementWithThrow)
    .lift(decrementWithThrow)
    .lift(decrementWithThrow));
const writeLog = (writer) => {
    const result = writer.get();
    console.log(`Value:
${result.value}
Log:
${result.log.join("\n")}`);
};
writeLog(index_1.Writer.writer(5)
    .flatMap(value => index_1.Writer.writer(value + 3, ["Added 3"]))
    .flatMap(value => index_1.Writer.writer(value / 2, ["Divided by 2"]))
    .flatMap(value => index_1.Writer.writer(value - 2, ["Subtracted 2"])));
writeLog(index_1.Writer.writer(5)
    .liftWithLog(value => [value + 3, "Added 3"])
    .liftWithLog(value => [value / 2, "Divided by 2"])
    .liftWithLog(value => [value / 2, "Divided by 2"])
    .liftWithLog(value => [value - 2, "Subtracted 2"]));
console.log(index_1.ifElse(1 === 1, () => "True!", () => "False!"));
console.log(index_1.ifElse(1 === 2, () => "True!", () => "False!"));
console.log(index_1.ifElse(1 === 1, () => "True!"));
console.log(index_1.ifElse(1 === 2, () => "True!"));
console.log(index_1.switchCase("dog", [
    ["cat", "meow"],
    ["dog", "woof"],
    ["cow", "moo"],
], "baa"));
console.log(index_1.switchCase("sheep", [
    ["cat", "meow"],
    ["dog", "woof"],
    ["cow", "moo"],
], "baa"));
const justValues = index_1.Enumerable.from([1, 2, 3, 4, 5]);
for (const value of justValues) {
    console.log(value);
}
const mappedValues = index_1.Enumerable
    .from([1, 2, 3, 4, 5])
    .map((value) => value * 2);
for (const value of mappedValues) {
    console.log(value);
}
const filteredValues = index_1.Enumerable
    .from([1, 2, 3, 4, 5])
    .filter((value) => value < 2 || value > 3);
for (const value of filteredValues) {
    console.log(value);
}
//# sourceMappingURL=test.js.map