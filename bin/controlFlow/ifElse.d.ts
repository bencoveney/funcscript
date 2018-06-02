/**
 * Checks the condition and returns the result of either the true path or false path.
 *
 * @template Result The type of return value for any paths.
 * @param {*} condition The condition to check.
 * @param {() => Result} truePath The path to execute if the condition is true.
 * @param {() => Result} falsePath The path to execute if the condition is false.
 * @returns {Result} The result of the executed path.
 */
export declare function ifElse<Result>(condition: any, truePath: () => Result, falsePath: () => Result): Result;
/**
 * Checks the condition and returns the result of either the true path or undefined.
 *
 * @template Result The type of return value for any paths.
 * @param {*} condition The condition to check.
 * @param {() => Result} truePath The path to execute if the condition is true.
 * @returns {(Result | undefined)} The result of the true path, or undefined.
 */
export declare function ifElse<Result>(condition: any, truePath: () => Result): Result | undefined;
