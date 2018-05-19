import { Maybe, Either, BiValueMonad } from "./index";

type MightHaveProps = any;

const logIt = (maybe: BiValueMonad<any, any>) => {
	try {
		console.log(maybe.getOrElse("No result"));
	} catch {
		console.log("Error during evaluation");
	}
}

const value: MightHaveProps = { first: { second: { third: "Hello World!" } } };

logIt(
	Maybe
		.just(value)
		.flatMap((value) => Maybe.from(value.first))
		.flatMap((value) => Maybe.from(value.second))
		.flatMap((value) => Maybe.from(value.third))
);

logIt(
	Maybe
		.just(value)
		.flatMap((value) => Maybe.from(value.first))
		.flatMap((value) => Maybe.from(value.second))
		.flatMap((value) => Maybe.from(value.numberThree))
);

logIt(
	Maybe
		.just(value)
		.lift((value) => value.first)
		.lift((value) => value.second)
		.lift((value) => value.third)
);

logIt(
	Maybe
		.just(value)
		.lift((value) => value.first)
		.lift((value) => value.second)
		.lift((value) => value.numberThree)
);

const decrementWithoutThrow = (value: number): number | Error => {
	return value <= 0 ? Error("Value too low") : value - 1;
};

logIt(
	Either
		.right(3)
		.flatMap((value) => Either.from(decrementWithoutThrow(value)))
		.flatMap((value) => Either.from(decrementWithoutThrow(value)))
		.flatMap((value) => Either.from(decrementWithoutThrow(value)))
);

logIt(
	Either
		.right(3)
		.flatMap((value) => Either.from(decrementWithoutThrow(value)))
		.flatMap((value) => Either.from(decrementWithoutThrow(value)))
		.flatMap((value) => Either.from(decrementWithoutThrow(value)))
		.flatMap((value) => Either.from(decrementWithoutThrow(value)))
);

logIt(
	Either
		.right(3)
		.lift(decrementWithoutThrow)
		.lift(decrementWithoutThrow)
		.lift(decrementWithoutThrow)
);

logIt(
	Either
		.right(3)
		.lift(decrementWithoutThrow)
		.lift(decrementWithoutThrow)
		.lift(decrementWithoutThrow)
		.lift(decrementWithoutThrow)
);

const decrementWithThrow = (value: number): number => {
	if (value <= 0) {
		throw Error("Value too low")
	}
	return value - 1;
};

logIt(
	Either
		.right(3)
		.flatMap((value) => Either.from(decrementWithThrow(value)))
		.flatMap((value) => Either.from(decrementWithThrow(value)))
		.flatMap((value) => Either.from(decrementWithThrow(value)))
);

logIt(
	Either
		.right(3)
		.flatMap((value) => Either.from(decrementWithThrow(value)))
		.flatMap((value) => Either.from(decrementWithThrow(value)))
		.flatMap((value) => Either.from(decrementWithThrow(value)))
		.flatMap((value) => Either.from(decrementWithThrow(value)))
);

logIt(
	Either
		.right(3)
		.lift(decrementWithThrow)
		.lift(decrementWithThrow)
		.lift(decrementWithThrow)
);

logIt(
	Either
		.right(3)
		.lift(decrementWithThrow)
		.lift(decrementWithThrow)
		.lift(decrementWithThrow)
		.lift(decrementWithThrow)
);