import { switchCase } from "./switchCase";

describe("switchCase", () => {
	it("should return the corresponding value for the first matching condition", () => {
		expect(
			switchCase(
				"dog",
				[
					["sheep", "boo"],
					["dog", "woof"],
					["dog", "woof again"],
					["cow", "moo"]
				],
				"meow"
			)
		).toBe("woof");
	});
	it("should return the default value if condition ", () => {
		expect(
			switchCase(
				"horse",
				[
					["sheep", "boo"],
					["dog", "woof"],
					["dog", "woof again"],
					["cow", "moo"]
				],
				"meow"
			)
		).toBe("meow");
	});
});
