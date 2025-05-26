import { errorsMap, type ErrorCode, type ErrorsMap } from "./errors-map";

export class AppError<Code extends ErrorCode> extends Error {
    public readonly source: ErrorsMap[ErrorCode]["source"];
    public readonly data: unknown;

    constructor(
        public readonly code: Code,
        factoryArgs: Parameters<ErrorsMap[Code]["factory"]>
    ) {
        const errorSpec = errorsMap[code];

        // @ts-expect-error factory function not inferred precisely
        const out = errorSpec["factory"](...factoryArgs);

        // Set error data
        super(out.message);
        this.source = errorSpec.source;
        this.data = out.data;

        // Set the prototype explicitly to ensure instanceof works correctly
        Object.setPrototypeOf(this, AppError.prototype);

        // Set instance error name from constructor
        // this.name = this.constructor.name;
    }

    /**
     * Converts the error to a plain object representation
     */
    public toJSON(): Record<string, unknown> {
        return {
            name: this.name,
            code: this.code,
            source: this.source,
            message: this.message,
            data: this.data,
            stack: this.stack,
        };
    }
}
