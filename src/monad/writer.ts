import { Monad, MonadLike } from "./monad";

export type WithLog<Value> = [Value] | [Value, string];

export type WriterLike<Value> = MonadLike<Value, Writer<Value>>;

export interface Written<Value> {
	value: Value,
	log: string[]
}

export class Writer<Value> implements Monad<Value> {
	private constructor(
		private readonly state: Written<Value>,
	) { }

	public static writer<Value>(value: Value, log?: string[]): Writer<Value> {
		return new Writer({
			value,
			log: log || [],
		});
	}

	public flatMap<Output>(
		mapper: (value: Value) => Writer<Output>
	): Writer<Output> {
		const mapped = mapper(this.state.value);
		return Writer.writer(
			mapped.get().value,
			this.state.log.concat(mapped.get().log)
		)
	}

	public lift<Output>(
		mapper: (value: Value) => WriterLike<Output>
	): Writer<Output> {
		const mapped = mapper(this.state.value);
		if (mapped instanceof Writer) {
			return this.flatMap(() => mapped);
		} else {
			return Writer.writer(
				mapped as Output,
				this.state.log
			)
		}
	}

	public liftWithLog<Output>(
		mapper: (value: Value) => WriterLike<WithLog<Output>>
	): Writer<Output> {
		const mapped = mapper(this.state.value);
		if (mapped instanceof Writer) {
			// Potentially "Output" type could be a log/array, which whill break the
			return this.flatMap(() => mapped);
		} else {
			const mappedArray = mapped as WithLog<Output>;
			const [value] = mappedArray;
			const logged: string[] = mappedArray.length > 1 ? [mappedArray[1] as string] : [];
			return Writer.writer.apply(
				null,
				[value, this.state.log.concat(logged)]
			);
		}
	}

	public get(): Written<Value> {
		return this.state;
	}
}
