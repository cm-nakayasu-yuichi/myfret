// tests/unit/data/chord.test.ts
import { describe, test, expect } from "vitest";
import { getChordPositions } from "../../../src/data/chord";

describe("コードポジション取得のテスト", () => {
    describe("メジャーコードの正常系テスト", () => {
        test("Cを渡すとCのオープンコードが含まれている", () => {
            const positions = getChordPositions("C");
            expect(positions).toContainEqual({
                frets: [0, 1, 0, 2, 3, -1],
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
                frets: [0, 0, 2, 3, 3, 0],
                barres: [{ fret: 8, strings: [1, 6] }],
            });
        });
    });
    describe("順番が正しいかのテスト", () => {
        test("Gを渡すと3つ以上の配列が返る", () => {
            const positions = getChordPositions("G");
            expect(positions.length).toBeGreaterThanOrEqual(3);
        });
        test("Gを渡すとGのオープンコードが先頭にある", () => {
            const positions = getChordPositions("G");
            expect(positions[0]).toEqual({
                frets: [3, 0, 0, 0, 2, 3]
            });
        });
        test("Gを渡すとEの派生コードが2番目にある", () => {
            const positions = getChordPositions("G");
            expect(positions[1]).toEqual({
                frets: [0, 0, 2, 3, 3, 0],
                barres: [{ fret: 3, strings: [1, 6] }],
            });
        });
        test("Gを渡すとAの派生コードが3番目にある", () => {
            const positions = getChordPositions("G");
            expect(positions[2]).toEqual({
                frets: [0, 3, 3, 3, 0, -1],
                barres: [{ fret: 10, strings: [1, 5] }],
            });
        });
        test("Dを渡すと3つ以上の配列が返る", () => {
            const positions = getChordPositions("D");
            expect(positions.length).toBeGreaterThanOrEqual(3);
        });
        test("Dを渡すとDのオープンコードが先頭にある", () => {
            const positions = getChordPositions("D");
            expect(positions[0]).toEqual({
                frets: [2, 3, 2, 0, -1, -1],
                barres: [{ fret: 0, strings: [4, 4] }],
            });
        });
        test("Dを渡すとAの派生コードが2番目にある", () => {
            const positions = getChordPositions("D");
            expect(positions[1]).toEqual({
                frets: [0, 3, 3, 3, 0, -1],
                barres: [{ fret: 5, strings: [1, 5] }],
            });
        });
        test("Dを渡すとEの派生コードが3番目にある", () => {
            const positions = getChordPositions("D");
            expect(positions[2]).toEqual({
                frets: [0, 0, 2, 3, 3, 0],
                barres: [{ fret: 10, strings: [1, 6] }],
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
