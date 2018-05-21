import { BiValueMonad, BiValueMonadLike } from "./biValueMonad";

export type Empty = undefined | null;
export type MaybeLike<Value> = BiValueMonadLike<Value, Empty, Maybe<Value>>;

export class Maybe<Value> implements BiValueMonad<Value, Empty> {
	private constructor(
		private readonly value: Value | Empty
	) { }

	public static just<Value>(value: Value) {
		if (Maybe.IsEmpty(value)) {
			throw Error("Cannot call Just on an empty value. Try Create().");
		}
		return new Maybe(value);
	}

	public static nothing<Value>() {
		return new Maybe<Value>(null);
	}

	public static from<Value>(value: MaybeLike<Value>): Maybe<Value> {
		if (Maybe.IsEmpty(value)) {
			return Maybe.nothing();
		}
		if (value instanceof Maybe) {
			return value;
		}
		return Maybe.just(value as Value);
	}

	private static IsEmpty<Value>(value: Value | Empty): value is Empty {
		return value === undefined || value === null;
	}

	public getOrElse(defaultValue: Value) {
		return Maybe.IsEmpty(this.value) ? defaultValue : this.value;
	}

	public hasValue(): boolean {
		return !Maybe.IsEmpty(this.value);
	}

	public flatMap<Output>(
		mapper: (value: Value) => Maybe<Output>
	): Maybe<Output> {
		return this.ifElse(
			mapper,
			() => Maybe.nothing()
		);
	}

	public lift<Output>(
		mapper: (value: Value) => MaybeLike<Output>
	): Maybe<Output> {
		return this.ifElse(
			(value) => Maybe.from(mapper(value)),
			() => Maybe.nothing()
		);
	}

	public ifElse<Output>(
		just: (value: Value) => MaybeLike<Output>,
		nothing: () => MaybeLike<Output>
	): Maybe<Output> {
		return Maybe.from(
			Maybe.IsEmpty(this.value) ? nothing() : just(this.value)
		);
	}

	public caseOf<Output>(
		cases: {
			just: (value: Value) => MaybeLike<Output>,
			nothing: () => MaybeLike<Output>
		}
	): Maybe<Output> {
		return this.ifElse(
			cases.just,
			cases.nothing
		);
	}
}
