"use strict";
exports.__esModule = true;
var index_1 = require("./index");
var logIt = function (maybe) {
    try {
        console.log(maybe.getOrElse("No result"));
    }
    catch (_a) {
        console.log("Error during evaluation");
    }
};
var value = { first: { second: { third: "Hello World!" } } };
logIt(index_1.Maybe
    .just(value)
    .flatMap(function (value) { return index_1.Maybe.from(value.first); })
    .flatMap(function (value) { return index_1.Maybe.from(value.second); })
    .flatMap(function (value) { return index_1.Maybe.from(value.third); }));
logIt(index_1.Maybe
    .just(value)
    .flatMap(function (value) { return index_1.Maybe.from(value.first); })
    .flatMap(function (value) { return index_1.Maybe.from(value.second); })
    .flatMap(function (value) { return index_1.Maybe.from(value.numberThree); }));
logIt(index_1.Maybe
    .just(value)
    .lift(function (value) { return value.first; })
    .lift(function (value) { return value.second; })
    .lift(function (value) { return value.third; }));
logIt(index_1.Maybe
    .just(value)
    .lift(function (value) { return value.first; })
    .lift(function (value) { return value.second; })
    .lift(function (value) { return value.numberThree; }));
var decrementWithoutThrow = function (value) {
    return value <= 0 ? Error("Value too low") : value - 1;
};
logIt(index_1.Either
    .right(3)
    .flatMap(function (value) { return index_1.Either.from(decrementWithoutThrow(value)); })
    .flatMap(function (value) { return index_1.Either.from(decrementWithoutThrow(value)); })
    .flatMap(function (value) { return index_1.Either.from(decrementWithoutThrow(value)); }));
logIt(index_1.Either
    .right(3)
    .flatMap(function (value) { return index_1.Either.from(decrementWithoutThrow(value)); })
    .flatMap(function (value) { return index_1.Either.from(decrementWithoutThrow(value)); })
    .flatMap(function (value) { return index_1.Either.from(decrementWithoutThrow(value)); })
    .flatMap(function (value) { return index_1.Either.from(decrementWithoutThrow(value)); }));
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
var decrementWithThrow = function (value) {
    if (value <= 0) {
        throw Error("Value too low");
    }
    return value - 1;
};
logIt(index_1.Either
    .right(3)
    .flatMap(function (value) { return index_1.Either.from(decrementWithThrow(value)); })
    .flatMap(function (value) { return index_1.Either.from(decrementWithThrow(value)); })
    .flatMap(function (value) { return index_1.Either.from(decrementWithThrow(value)); }));
logIt(index_1.Either
    .right(3)
    .flatMap(function (value) { return index_1.Either.from(decrementWithThrow(value)); })
    .flatMap(function (value) { return index_1.Either.from(decrementWithThrow(value)); })
    .flatMap(function (value) { return index_1.Either.from(decrementWithThrow(value)); })
    .flatMap(function (value) { return index_1.Either.from(decrementWithThrow(value)); }));
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
var writeLog = function (writer) {
    var result = writer.get();
    console.log("Value:\n" + result.value + "\nLog:\n" + result.log.join("\n"));
};
writeLog(index_1.Writer.writer(5)
    .flatMap(function (value) { return index_1.Writer.writer(value + 3, ["Added 3"]); })
    .flatMap(function (value) { return index_1.Writer.writer(value / 2, ["Divided by 2"]); })
    .flatMap(function (value) { return index_1.Writer.writer(value - 2, ["Subtracted 2"]); }));
writeLog(index_1.Writer.writer(5)
    .liftWithLog(function (value) { return [value + 3, "Added 3"]; })
    .liftWithLog(function (value) { return [value / 2, "Divided by 2"]; })
    .liftWithLog(function (value) { return [value / 2, "Divided by 2"]; })
    .liftWithLog(function (value) { return [value - 2, "Subtracted 2"]; }));
//# sourceMappingURL=test.js.map