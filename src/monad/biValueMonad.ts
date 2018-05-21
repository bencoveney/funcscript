import { Monad, MonadLike } from "./monad";

/**
 * A bi-value monad or something that can be turned into one.
 */
export type BiValueMonadLike<
	Value,
	NotValue,
	MonadType extends BiValueMonad<Value, NotValue> = BiValueMonad<Value, NotValue>
> = MonadLike<Value, MonadType> | NotValue;

/**
 * A monad which either has a value or doesnt.
 */
export interface BiValueMonad<Value, NotValue> extends Monad<Value> {
	/**
	 * Gets the value if it exists, otherwise returns the specified default.
	 * @param defaultValue The default value.
	 * @returns The value if it exists, otherwise the default.
	 */
	getOrElse(defaultValue: Value): Value;
	/**
	 * Returns true if the value exists, otherwise false.
	 * @returns True if the value exists, otherwise false.
	 */
	hasValue(): boolean;
	/**
	 * Maps the passed parameter across the current value to a new monad instance.
	 * If the mapper returns something that is not a mapper, one will be created.
	 * @param mapper The function to apply to the monad's value.
	 * @returns The mapped value as a new monad instance.
	 */
	lift<Output>(
		mapper: (value: Value) => BiValueMonadLike<Output, NotValue>
	): Monad<Output>;
	/**
	 * Calls one of the two passed parameters depending on whether the value exists.
	 * @param just The callback to apply if the value exists.
	 * @param nothing The callback to apply if the value does not exist.
	 * @returns.
	 */
	ifElse<Output>(
		just: (value: Value) => BiValueMonadLike<Output, NotValue>,
		nothing: () => BiValueMonadLike<Output, NotValue>
	): Monad<Output>;
}
