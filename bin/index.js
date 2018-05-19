"use strict";
exports.__esModule = true;
var maybe_1 = require("./maybe");
var value = { first: { second: { third: "Hello World!" } } };
var logIt = function (maybe) {
    console.log(maybe.getOrElse("Not Found :("));
};
logIt(maybe_1.Maybe.just(value)
    .flatMap(function (value) { return maybe_1.Maybe.create(value.first); })
    .flatMap(function (value) { return maybe_1.Maybe.create(value.second); })
    .flatMap(function (value) { return maybe_1.Maybe.create(value.third); }));
logIt(maybe_1.Maybe.just(value)
    .flatMap(function (value) { return maybe_1.Maybe.create(value.first); })
    .flatMap(function (value) { return maybe_1.Maybe.create(value.second); })
    .flatMap(function (value) { return maybe_1.Maybe.create(value.numberThree); }));
logIt(maybe_1.Maybe.just(value)
    .then(function (value) { return value.first; })
    .then(function (value) { return value.second; })
    .then(function (value) { return value.third; }));
logIt(maybe_1.Maybe.just(value)
    .then(function (value) { return value.first; })
    .then(function (value) { return value.second; })
    .then(function (value) { return value.numberThree; }));
//# sourceMappingURL=index.js.map