import { describe, it, expect } from "vitest";

function sum(a: number, b: number) {
    return a + b;
}

describe("Sum function", () => {
    it("should correctly add two numbers", () => {
        expect(sum(1, 2)).toEqual(3); // Describes behaviour
    });
});
