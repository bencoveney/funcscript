import { BiValueMonad, BiValueMonadLike } from "./biValueMonad";
export declare type Empty = undefined | null;
export declare type MaybeLike<Value> = BiValueMonadLike<Value, Empty>;
export declare class Maybe<Value> implements BiValueMonad<Value, Empty> {
    private readonly value;
    private constructor();
    static just<Value>(value: Value): Maybe<Value>;
    static nothing<Value>(): Maybe<Value>;
    static from<Value>(value: MaybeLike<Value>): Maybe<Value>;
    private static IsEmpty<Value>(value);
    getOrElse(defaultValue: Value): Value;
    hasValue(): boolean;
    flatMap<Output>(mapper: (value: Value) => Maybe<Output>): Maybe<Output>;
    lift<Output>(mapper: (value: Value) => MaybeLike<Output>): Maybe<Output>;
    ifElse<Output>(just: (value: Value) => MaybeLike<Output>, nothing: () => MaybeLike<Output>): Maybe<Output>;
    caseOf<Output>(cases: {
        just: (value: Value) => MaybeLike<Output>;
        nothing: () => MaybeLike<Output>;
    }): Maybe<Output>;
}
