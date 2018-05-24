"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Writer {
    constructor(state) {
        this.state = state;
    }
    static writer(value, log) {
        return new Writer({
            value,
            log: log || [],
        });
    }
    flatMap(mapper) {
        const mapped = mapper(this.state.value);
        return Writer.writer(mapped.get().value, this.state.log.concat(mapped.get().log));
    }
    lift(mapper) {
        const mapped = mapper(this.state.value);
        if (mapped instanceof Writer) {
            return this.flatMap(() => mapped);
        }
        else {
            return Writer.writer(mapped, this.state.log);
        }
    }
    liftWithLog(mapper) {
        const mapped = mapper(this.state.value);
        if (mapped instanceof Writer) {
            // Potentially "Output" type could be a log/array, which whill break the
            return this.flatMap(() => mapped);
        }
        else {
            const mappedArray = mapped;
            const [value] = mappedArray;
            const logged = mappedArray.length > 1 ? [mappedArray[1]] : [];
            return Writer.writer.apply(null, [value, this.state.log.concat(logged)]);
        }
    }
    get() {
        return this.state;
    }
}
exports.Writer = Writer;
//# sourceMappingURL=writer.js.map