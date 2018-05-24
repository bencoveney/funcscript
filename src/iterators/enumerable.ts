export class Enumerable<Type> implements Iterator<Type>, Iterable<Type> {
	private constructor(
		private readonly iterator: Iterator<Type>
	) {}

	public static from<Type>(arrayLike: ArrayLike<Type>): Enumerable<Type> {
		return Enumerable.generate(
			function* () {
				for (let index = 0; index < arrayLike.length; index++) {
					yield arrayLike[index];
				}
			},
		)
	}

	public static generate<Type>(generator: () => IterableIterator<Type>): Enumerable<Type> {
		return new Enumerable<Type>(generator());
	}

	public static wrap<Type>(iterator: Iterator<Type>) {
		return new Enumerable<Type>(iterator);
	}

	public filter(predicate: (item: Type) => boolean): Enumerable<Type> {
		const that = this;
		return Enumerable.generate(
			function* () {
				let result = that.iterator.next();
				while (!result.done) {
					if (predicate(result.value)) {
						yield result.value;
					}
					result = that.iterator.next();
				}
			}
		);
	}

	public map<Transformed>(transform: (item: Type) => Transformed): Enumerable<Transformed> {
		const that = this;
		return Enumerable.generate(
			function* () {
				let result = that.iterator.next();
				while (!result.done) {
					yield transform(result.value);
					result = that.iterator.next();
				}
			}
		);
	}

	public next(): IteratorResult<Type> {
		return this.iterator.next();
	}

	public [Symbol.iterator](): Iterator<Type> {
		return this;
	}
}
