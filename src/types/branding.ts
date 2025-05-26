declare const brand: unique symbol;

export type Brand<T, BrandName> = T & {
    [brand]: BrandName;
};
