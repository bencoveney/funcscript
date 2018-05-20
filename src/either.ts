import { BiValueMonad, BiValueMonadLike } from "./biValueMonad";

export type OrError<Value> = Value | Error;
export type EitherLike<Value> = BiValueMonadLike<Value, Error, Either<Value>>;

interface State<Value> {
	hasValue: boolean;
	store: Value | Error;
}

interface ValueState<Value> extends State<Value> {
	hasValue: true;
	store: Value;
}

interface ErrorState<Value> extends State<Value> {
	hasValue: false;
	store: Error;
}

type States<Value> = ValueState<Value> | ErrorState<Value>;

export class Either<Value> implements BiValueMonad<Value, Error> {
	private constructor(
		private readonly state: States<Value>,
	) { }

	public static left<Value>(error: Error): Either<Value> {
		return new Either<Value>({ hasValue: false, store: error });
	}

	public static right<Value>(value: Value): Either<Value> {
		return new Either<Value>({ hasValue: true, store: value });
	}

	public static from<Value>(value: EitherLike<Value>): Either<Value> {
		if (value instanceof Either) {
			return value;
		}
		return this.create(value as OrError<Value>);
	}

	public static tryFrom<Value>(mightFail: () => EitherLike<Value>): Either<Value> {
		try {
			return Either.from(mightFail());
		} catch (error) {
			return Either.left<Value>(error);
		}
	}

	public static create<Value>(value: OrError<Value>): Either<Value> {
		return Either.isError(value) ? Either.left(value) : Either.right(value);
	}

	public static tryCreate<Value>(mightFail: () => OrError<Value>): Either<Value> {
		try {
			return Either.create(mightFail());
		} catch (error) {
			return Either.left<Value>(error);
		}
	}

	private static isError<Value>(value: Value | Error): value is Error {
		return value instanceof Error;
	}

	public getOrElse(defaultValue: Value) {
		return this.state.hasValue ? this.state.store : defaultValue;
	}

	public hasValue(): boolean {
		return this.state.hasValue;
	}

	public flatMap<Output>(
		mapper: (value: Value) => Either<Output>
	): Either<Output> {
		if (this.state.hasValue) {
			const value = this.state.store;
			return Either.tryFrom(() => mapper(value));
		} else {
			return Either.left(this.state.store);
		}
	}

	public lift<Output>(
		mapper: (value: Value) => EitherLike<Output>
	): Either<Output> {
		return this.ifElse(
			mapper,
			(error) => Either.left<Output>(error)
		);
	}

	public ifElse<Output>(
		right: (value: Value) => EitherLike<Output>,
		left: (error: Error) => EitherLike<Output>
	): Either<Output> {
		if (this.state.hasValue) {
			const value = this.state.store;
			return Either.tryFrom(() => right(value));
		} else {
			const error = this.state.store;
			return Either.tryFrom(() => left(error));
		}
	}

	public caseOf<Output>(
		cases: {
			right: (value: Value) => EitherLike<Output>,
			left: (error: Error) => EitherLike<Output>
		}
	): Either<Output> {
		return this.ifElse(
			cases.right,
			cases.left
		);
	}
}
