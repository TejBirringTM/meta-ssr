export const errorsMap = {
    a: {
        source: "server",
        factory: (test: string) => ({
            message: test,
            data: null,
        }),
    },
    b: {
        source: "client",
        factory: (a: string, b: string) => ({
            message: "test",
            data: null,
        }),
    },
} as const satisfies Record<
    string,
    {
        source: "server" | "client";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        factory: (...args: any[]) => {
            message: string;
            data: unknown;
        };
    }
>;

export type ErrorsMap = typeof errorsMap;

export type ErrorCode = keyof ErrorsMap;
