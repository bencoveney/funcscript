import { ifElse } from "./ifElse";

export function switchCase<Case, Result>(
	expression: Case,
	cases: Array<[Case, Result]>,
	defaultValue: Result
): Result {
	const unwrap = (
		remainingCases: Array<[Case, Result]>
	): Result => {
		return ifElse<Result>(
			remainingCases.length === 0,
			() => defaultValue,
			() => {
				const nextCase = (remainingCases as Array<[Case, Result]>)[0];
				return ifElse<Result>(
					nextCase[0] === expression,
					() => nextCase[1],
					() => unwrap((remainingCases as Array<[Case, Result]>).slice(1))
				);
			}
		);
	};
	return unwrap(cases);
}
