import { Maybe } from "./index";

type MightHaveProps = any;

const value: MightHaveProps = { first: { second: { third: "Hello World!" } } };

const logIt = (maybe: Maybe<any>) => {
	console.log(maybe.getOrElse("Not Found :("));
}

logIt(
	Maybe.just(value)
		.flatMap((value) => Maybe.create(value.first))
		.flatMap((value) => Maybe.create(value.second))
		.flatMap((value) => Maybe.create(value.third))
);

logIt(
	Maybe.just(value)
		.flatMap((value) => Maybe.create(value.first))
		.flatMap((value) => Maybe.create(value.second))
		.flatMap((value) => Maybe.create(value.numberThree))
);

logIt(
	Maybe.just(value)
		.lift((value) => value.first)
		.lift((value) => value.second)
		.lift((value) => value.third)
);

logIt(
	Maybe.just(value)
		.lift((value) => value.first)
		.lift((value) => value.second)
		.lift((value) => value.numberThree)
);
