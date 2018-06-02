import { Maybe, Either, BiValueMonad, Writer, ifElse, switchCase, Enumerable } from "./index";

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

const writeLog = <Value>(writer: Writer<Value>) => {
	const result = writer.get();
	console.log(`Value:
${result.value}
Log:
${result.log.join("\n")}`);
}

writeLog(
	Writer.writer(5)
		.flatMap(value => Writer.writer(value + 3, ["Added 3"]))
		.flatMap(value => Writer.writer(value / 2, ["Divided by 2"]))
		.flatMap(value => Writer.writer(value - 2, ["Subtracted 2"]))
);

writeLog(
	Writer.writer(5)
		.liftWithLog<number>(value => [value + 3, "Added 3"])
		.liftWithLog<number>(value => [value / 2, "Divided by 2"])
		.liftWithLog<number>(value => [value / 2, "Divided by 2"])
		.liftWithLog<number>(value => [value - 2, "Subtracted 2"])
);

console.log(
	ifElse(
		1 === 1,
		() => "True!",
		() => "False!"
	)
);

console.log(
	ifElse(
		1 === 2 as any,
		() => "True!",
		() => "False!"
	)
);

console.log(
	ifElse(
		1 === 1,
		() => "True!"
	)
);

console.log(
	ifElse(
		1 === 2 as any,
		() => "True!"
	)
);

console.log(
	switchCase(
		"dog",
		[
			["cat", "meow"],
			["dog", "woof"],
			["cow", "moo"],
		],
		"baa"
	)
);

console.log(
	switchCase(
		"sheep",
		[
			["cat", "meow"],
			["dog", "woof"],
			["cow", "moo"],
		],
		"baa"
	)
);

const justValues = Enumerable.from([1, 2, 3, 4, 5]);

for(const value of justValues) {
	console.log(value);
}

const mappedValues = Enumerable
	.from([1, 2, 3, 4, 5])
	.map((value) => value * 2);

for(const value of mappedValues) {
	console.log(value);
}

const filteredValues = Enumerable
	.from([1, 2, 3, 4, 5])
	.filter((value) => value < 2 || value  > 3);

for(const value of filteredValues) {
	console.log(value);
}
