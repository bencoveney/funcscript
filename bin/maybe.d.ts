export declare type Empty = undefined | null;
export declare class Maybe<Value> {
    private value;
    private constructor();
    static just<Value>(value: Value): Maybe<Value>;
    static nothing<Value>(): Maybe<Value>;
    static create<Value>(value: Value): Maybe<Value>;
    getOrElse(defaultValue: Value): Value;
    flatMap<Output>(mapper: (value: Value) => Maybe<Output>): Maybe<Output>;
    then<Output>(mapper: (value: Value) => Maybe<Output> | Output | Empty): Maybe<Output>;
}
