export default function nonenumerable(target: any, key: string) {
    // first property defined in prototype, that's why we use getters/setters
    // (otherwise assignment in object will override property in prototype)
    Object.defineProperty(target, key, {
        get: () => undefined,
        set(this: any, val) {
            // here we have reference to instance and can set property directly to it
            Object.defineProperty(this, key, {
                enumerable: false,
                value: val,
                writable: true,
            });
        },

        enumerable: false,
    });
}
