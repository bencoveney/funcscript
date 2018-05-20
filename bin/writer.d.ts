import { Monad, MonadLike } from "./monad";
export declare type WithLog<Value> = [Value] | [Value, string];
export declare type WriterLike<Value> = MonadLike<Value, Writer<Value>>;
export interface Written<Value> {
    value: Value;
    log: string[];
}
export declare class Writer<Value> implements Monad<Value> {
    private readonly state;
    private constructor();
    static writer<Value>(value: Value, log?: string[]): Writer<Value>;
    flatMap<Output>(mapper: (value: Value) => Writer<Output>): Writer<Output>;
    lift<Output>(mapper: (value: Value) => WriterLike<Output>): Writer<Output>;
    liftWithLog<Output>(mapper: (value: Value) => WriterLike<WithLog<Output>>): Writer<Output>;
    get(): Written<Value>;
}
