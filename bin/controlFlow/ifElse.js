"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ifElse(condition, truePath, falsePath) {
    return condition ? truePath() : (falsePath && falsePath());
}
exports.ifElse = ifElse;
;
//# sourceMappingURL=ifElse.js.map