"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks the condition and returns the result of either the true path or optional false path, otherwise undefined.
 *
 * @template Result The type of the return value for any paths.
 * @param {*} condition The condition to check.
 * @param {() => Result} truePath The path to execute if the condition is true.
 * @param {() => Result} [falsePath] The optional path to execute if the condition is true.
 * @returns {(Result | undefined)} The result of the true path, or undefined.
 */
function ifElse(condition, truePath, falsePath) {
    return condition ? truePath() : (falsePath && falsePath());
}
exports.ifElse = ifElse;
;
//# sourceMappingURL=ifElse.js.map