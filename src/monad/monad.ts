/**
 * A monad or something that can be turned into one.
 */
export type MonadLike<
	Value,
	MonadType extends Monad<Value>
> = Monad<Value> | Value;

/**
 * A monad.
 */
export interface Monad<Value> {
	/**
	 * Maps the passed parameter across the current value to a new monad instance.
	 * @param mapper The function to apply to the monad's value.
	 * @returns The mapped value as a new monad instance.
	 */
	flatMap<Output>(mapper: (value: Value) => Monad<Output>): Monad<Output>;
}
