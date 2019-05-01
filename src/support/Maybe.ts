export class Maybe<T> {
    public static some<T>(value: T) {
        if (!value) {
            throw Error('Provided value must not be empty');
        }
        return new Maybe(value);
    }

    public static none<T>() {
        return new Maybe<T>(null);
    }

    public static fromValue<T>(value: T) {
        return value ? Maybe.some(value) : Maybe.none<T>();
    }
    private constructor(private value: T | null) {}

    public getOrElse(defaultValue: T) {
        return this.value === null ? defaultValue : this.value;
    }
    public map<R>(f: (wrapped: T) => R): Maybe<R> {
        if (this.value === null) {
            return Maybe.none<R>();
        } else {
            return Maybe.some(f(this.value));
        }
    }
}
