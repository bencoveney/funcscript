"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ifElse_1 = require("./ifElse");
/**
 * Checks the expression against each case and returns the result for the first matching case, otherwise returns the default value.
 *
 * @template Case The type of the expression and cases.
 * @template Result The type of the return values.
 * @param {Case} expression The expression to check against the cases.
 * @param {Array<[Case, Result]>} cases Array of case pairs, where the first value will be compared against the expression, and the second value will be the result.
 * @param {Result} defaultValue The default value to return if no cases match the expression.
 * @returns {Result} The result for the first matching case, otherwise returns the default value.
 */
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