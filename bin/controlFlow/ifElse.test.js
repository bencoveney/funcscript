"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ifElse_1 = require("./ifElse");
describe("ifElse", () => {
    it("should execute and return the true path if the condition is truthy", () => {
        expect(ifElse_1.ifElse(true, () => "truePath", () => "falsePath")).toBe("truePath");
        expect(ifElse_1.ifElse("truthy", () => "truePath", () => "falsePath")).toBe("truePath");
    });
    it("should execute and return the false path if the condition is falsy", () => {
        expect(ifElse_1.ifElse(false, () => "truePath", () => "falsePath")).toBe("falsePath");
        expect(ifElse_1.ifElse("", () => "truePath", () => "falsePath")).toBe("falsePath");
    });
    it("should execute and return undefined if the condition is falsy and no false path is provided", () => {
        expect(ifElse_1.ifElse(false, () => "truePath")).toBe(undefined);
        expect(ifElse_1.ifElse("", () => "truePath")).toBe(undefined);
    });
});
//# sourceMappingURL=ifElse.test.js.map