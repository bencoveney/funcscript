"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ifElse_1 = require("./ifElse");
function switchCase(expression, cases, defaultValue) {
    const unwrap = (remainingCases) => {
        return ifElse_1.ifElse(remainingCases.length === 0, () => defaultValue, () => {
            const nextCase = remainingCases[0];
            return ifElse_1.ifElse(nextCase[0] === expression, () => nextCase[1], () => unwrap(remainingCases.slice(1)));
        });
    };
    return unwrap(cases);
}
exports.switchCase = switchCase;
//# sourceMappingURL=switchCase.js.map