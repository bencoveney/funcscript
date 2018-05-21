"use strict";
exports.__esModule = true;
var Writer = /** @class */ (function () {
    function Writer(state) {
        this.state = state;
    }
    Writer.writer = function (value, log) {
        return new Writer({
            value: value,
            log: log || []
        });
    };
    Writer.prototype.flatMap = function (mapper) {
        var mapped = mapper(this.state.value);
        return Writer.writer(mapped.get().value, this.state.log.concat(mapped.get().log));
    };
    Writer.prototype.lift = function (mapper) {
        var mapped = mapper(this.state.value);
        if (mapped instanceof Writer) {
            return this.flatMap(function () { return mapped; });
        }
        else {
            return Writer.writer(mapped, this.state.log);
        }
    };
    Writer.prototype.liftWithLog = function (mapper) {
        var mapped = mapper(this.state.value);
        if (mapped instanceof Writer) {
            // Potentially "Output" type could be a log/array, which whill break the
            return this.flatMap(function () { return mapped; });
        }
        else {
            var mappedArray = mapped;
            var value = mappedArray[0];
            var logged = mappedArray.length > 1 ? [mappedArray[1]] : [];
            return Writer.writer.apply(null, [value, this.state.log.concat(logged)]);
        }
    };
    Writer.prototype.get = function () {
        return this.state;
    };
    return Writer;
}());
exports.Writer = Writer;
//# sourceMappingURL=writer.js.map