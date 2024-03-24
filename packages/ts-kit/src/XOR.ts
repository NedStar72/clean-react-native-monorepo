type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<U, V> = U extends object ? Without<Exclude<V, U>, U> & U : U;
