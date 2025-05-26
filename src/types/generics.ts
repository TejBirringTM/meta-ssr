export type KeysWithTrueValue<T> = {
    [K in keyof T]: T[K] extends true ? K : never;
}[keyof T];

export type Optional<T> = T | undefined | null;

// Helper type to ensure exact object match
export type Exact<T> = T extends object
    ? {
          [K in keyof T]: T[K];
      } & {
          [K in string]: never;
      }
    : T;

/**
 * Maps keys from T1 to their corresponding values in T2,
 * ensuring that only keys from T1 are allowed in the result.
 *
 * @template T1 - Source object type that provides the keys
 * @template T2 - Target object type that provides the values
 */
export type MapExact<T1 extends object, T2 extends object> = {
    [K in keyof T1]: K extends keyof T2 ? T2[K] : never;
} & {
    [K in keyof T2 as K extends keyof T1 ? never : K]?: never;
};

export type AbstractConstructor<T = object> = abstract new (
    ...args: unknown[]
) => T;
