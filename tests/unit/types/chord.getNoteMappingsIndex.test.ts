// tests/unit/data/chord.test.ts
import { describe, test, expect } from "vitest";
import { getNoteMappingsIndex } from "../../../src/data/chord";

describe("コードのマッピングのテスト", () => {
    test("Aを渡すと0が返る", () => {
        expect(getNoteMappingsIndex("A")).toBe(0);
    });
    test("A#を渡すと1が返る", () => {
        expect(getNoteMappingsIndex("A#")).toBe(1);
    });
    test("B♭を渡すと1が返る", () => {
        expect(getNoteMappingsIndex("B♭")).toBe(1);
    });
    test("Bを渡すと2が返る", () => {
        expect(getNoteMappingsIndex("B")).toBe(2);
    });
    test("Cを渡すと3が返る", () => {
        expect(getNoteMappingsIndex("C")).toBe(3);
    });
    test("C#を渡すと4が返る", () => {
        expect(getNoteMappingsIndex("C#")).toBe(4);
    });
    test("D♭を渡すと4が返る", () => {
        expect(getNoteMappingsIndex("D♭")).toBe(4);
    });
    test("不正な値を渡すと-1が返る", () => {
        expect(getNoteMappingsIndex("X")).toBe(-1);
    });
});
