export declare class Enumerable<Type> implements Iterator<Type>, Iterable<Type> {
    private readonly iterator;
    private constructor();
    static from<Type>(arrayLike: ArrayLike<Type>): Enumerable<Type>;
    static generate<Type>(generator: () => IterableIterator<Type>): Enumerable<Type>;
    static wrap<Type>(iterator: Iterator<Type>): Enumerable<Type>;
    filter(predicate: (item: Type) => boolean): Enumerable<Type>;
    map<Transformed>(transform: (item: Type) => Transformed): Enumerable<Transformed>;
    next(): IteratorResult<Type>;
    [Symbol.iterator](): Iterator<Type>;
}
