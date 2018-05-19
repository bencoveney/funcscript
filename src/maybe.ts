export type Empty = undefined | null;
export type MaybeLike<Value> = Maybe<Value> | Value | Empty;

function IsEmpty(value: any): value is Empty {
	return value === undefined || value === null;
}

export class Maybe<Value> {
	private constructor(
		private value: Value | Empty
	) { }

	public static just<Value>(value: Value) {
		if (IsEmpty(value)) {
			throw Error("Cannot call Just on an empty value. Try Create().");
		}
		return new Maybe(value);
	}

	public static nothing<Value>() {
		return new Maybe<Value>(null);
	}

	public static create<Value>(value: MaybeLike<Value>): Maybe<Value> {
		if (IsEmpty(value)) {
			return Maybe.nothing();
		}
		if (value instanceof Maybe) {
			return value;
		}
		return Maybe.just(value);
	}

	public getOrElse(defaultValue: Value) {
		return IsEmpty(this.value) ? defaultValue : this.value;
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
			(value) => Maybe.create(mapper(value)),
			() => Maybe.nothing()
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

	public ifElse<Output>(
		just: (value: Value) => MaybeLike<Output>,
		nothing: () => MaybeLike<Output>
	): Maybe<Output> {
		return Maybe.create(
			IsEmpty(this.value) ? nothing() : just(this.value)
		);
	}
}
