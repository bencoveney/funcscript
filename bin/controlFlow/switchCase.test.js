"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const switchCase_1 = require("./switchCase");
describe("switchCase", () => {
    it("should return the corresponding value for the first matching condition", () => {
        expect(switchCase_1.switchCase("dog", [
            ["sheep", "boo"],
            ["dog", "woof"],
            ["dog", "woof again"],
            ["cow", "moo"]
        ], "meow")).toBe("woof");
    });
    it("should return the default value if condition ", () => {
        expect(switchCase_1.switchCase("horse", [
            ["sheep", "boo"],
            ["dog", "woof"],
            ["dog", "woof again"],
            ["cow", "moo"]
        ], "meow")).toBe("meow");
    });
});
//# sourceMappingURL=switchCase.test.js.map