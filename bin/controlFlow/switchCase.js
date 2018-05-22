"use strict";
exports.__esModule = true;
var ifElse_1 = require("./ifElse");
function switchCase(expression, cases, defaultValue) {
    var unwrap = function (remainingCases) {
        return ifElse_1.ifElse(remainingCases.length === 0, function () { return defaultValue; }, function () {
            var nextCase = remainingCases[0];
            return ifElse_1.ifElse(nextCase[0] === expression, function () { return nextCase[1]; }, function () { return unwrap(remainingCases.slice(1)); });
        });
    };
    return unwrap(cases);
}
exports.switchCase = switchCase;
//# sourceMappingURL=switchCase.js.map