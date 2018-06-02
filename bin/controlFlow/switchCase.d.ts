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
export declare function switchCase<Case, Result>(expression: Case, cases: Array<[Case, Result]>, defaultValue: Result): Result;
