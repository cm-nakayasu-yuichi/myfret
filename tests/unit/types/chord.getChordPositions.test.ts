// tests/unit/data/chord.test.ts
import { describe, test, expect } from "vitest";
import { getChordPositions } from "../../../src/data/chord";

describe("コードポジション取得のテスト", () => {
    describe("メジャーコードの正常系テスト", () => {
        test("Cを渡すとCのオープンコードが含まれている", () => {
            const positions = getChordPositions("C");
            expect(positions).toContainEqual({
                frets: [0, 1, 0, 2, 3, 0],
                barres: [{ fret: 0, strings: [1, 5] }],
            });
        });
        test("Cを渡すとAから派生したコードが含まれている", () => {
            const positions = getChordPositions("C");
            expect(positions).toContainEqual({
                frets: [0, 3, 3, 3, 0, -1],
                barres: [{ fret: 3, strings: [1, 5] }],
            });
        });
        test("Cを渡すとEから派生したコードが含まれている", () => {
            const positions = getChordPositions("C");
            expect(positions).toContainEqual({
                frets: [0, 0, 1, 2, 2, 0],
                barres: [{ fret: 8, strings: [1, 6] }],
            });
        });
    });
    describe("不正な値のテスト", () => {
        test("不正な値を渡すと空の配列が返る", () => {
            const positions = getChordPositions("Invalid");
            expect(positions).toEqual([]);
        });
    });
});
