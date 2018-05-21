export function ifElse<Result>(
	condition: boolean,
	truePath: () => Result,
	falsePath: () => Result
): Result;

export function ifElse<Result>(
	condition: boolean,
	truePath: () => Result
): Result | undefined;

export function ifElse<Result>(
	condition: boolean,
	truePath: () => Result,
	falsePath?: () => Result
): Result | undefined {
	return condition ? truePath() : (falsePath && falsePath());
};
