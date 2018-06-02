import { ifElse } from "./ifElse";

describe("ifElse", () => {
	it(
		"should execute and return the true path if the condition is truthy",
		() => {
			expect(
				ifElse(
					true,
					() => "truePath",
					() => "falsePath"
				)
			).toBe("truePath");

			expect(
				ifElse(
					"truthy",
					() => "truePath",
					() => "falsePath"
				)
			).toBe("truePath");
		}
	);
	it("should execute and return the false path if the condition is falsy", () => {
		expect(
			ifElse(
				false,
				() => "truePath",
				() => "falsePath"
			)
		).toBe("falsePath");

		expect(
			ifElse(
				"",
				() => "truePath",
				() => "falsePath"
			)
		).toBe("falsePath");
	});
	it("should execute and return undefined if the condition is falsy and no false path is provided", () => {
		expect(
			ifElse(
				false,
				() => "truePath"
			)
		).toBe(undefined);

		expect(
			ifElse(
				"",
				() => "truePath"
			)
		).toBe(undefined);
	});
});