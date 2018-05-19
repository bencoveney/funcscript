import { BiValueMonad, BiValueMonadLike } from "./biValueMonad";
export declare type OrError<Value> = Value | Error;
export declare type EitherLike<Value> = BiValueMonadLike<Value, Error>;
export declare class Either<Value> implements BiValueMonad<Value, Error> {
    private readonly state;
    private constructor();
    static left<Value>(error: Error): Either<Value>;
    static right<Value>(value: Value): Either<Value>;
    static from<Value>(value: EitherLike<Value>): Either<Value>;
    static tryFrom<Value>(mightFail: () => EitherLike<Value>): Either<Value>;
    static create<Value>(value: OrError<Value>): Either<Value>;
    static tryCreate<Value>(mightFail: () => OrError<Value>): Either<Value>;
    private static isError<Value>(value);
    getOrElse(defaultValue: Value): Value;
    hasValue(): boolean;
    flatMap<Output>(mapper: (value: Value) => Either<Output>): Either<Output>;
    lift<Output>(mapper: (value: Value) => EitherLike<Output>): Either<Output>;
    ifElse<Output>(right: (value: Value) => EitherLike<Output>, left: (error: Error) => EitherLike<Output>): Either<Output>;
    caseOf<Output>(cases: {
        right: (value: Value) => EitherLike<Output>;
        left: (error: Error) => EitherLike<Output>;
    }): Either<Output>;
}
