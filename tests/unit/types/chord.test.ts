import { describe, test, expect } from "vitest";
import {
    getNormalizedIndex,
    getNoteByIndex,
    isValidNote,
    parseChord,
    transposeChord,
} from "../../../src/types";

describe("インデックスの正規化(getNormalizedIndex)のテスト", () => {
    describe("正の数の場合", () => {
        test("0を渡すと0が返る（A）", () => {
            expect(getNormalizedIndex(0)).toBe(0);
        });

        test("1を渡すと1が返る（A#）", () => {
            expect(getNormalizedIndex(1)).toBe(1);
        });

        test("11を渡すと11が返る（G#）", () => {
            expect(getNormalizedIndex(11)).toBe(11);
        });

        test("12を渡すと0が返る（1周してA）", () => {
            expect(getNormalizedIndex(12)).toBe(0);
        });

        test("13を渡すと1が返る（1周してA#）", () => {
            expect(getNormalizedIndex(13)).toBe(1);
        });

        test("25を渡すと1が返る（2周してA#）", () => {
            expect(getNormalizedIndex(25)).toBe(1);
        });
    });

    describe("負の数の場合", () => {
        test("-1を渡すと11が返る（G#）", () => {
            expect(getNormalizedIndex(-1)).toBe(11);
        });

        test("-2を渡すと10が返る（G）", () => {
            expect(getNormalizedIndex(-2)).toBe(10);
        });

        test("-12を渡すと0が返る（1周下がってA）", () => {
            expect(getNormalizedIndex(-12)).toBe(0);
        });

        test("-13を渡すと11が返る（1周と1つ下がってG#）", () => {
            expect(getNormalizedIndex(-13)).toBe(11);
        });

        test("-25を渡すと11が返る（2周と1つ下がってG#）", () => {
            expect(getNormalizedIndex(-25)).toBe(11);
        });
    });
});

describe("音階の取得(getNoteByIndex)のテスト", () => {
    describe("基本的な音階の取得", () => {
        test("インデックス0を渡すとAが返る", () => {
            expect(getNoteByIndex(0)).toBe("A");
        });

        test("インデックス3を渡すとCが返る", () => {
            expect(getNoteByIndex(3)).toBe("C");
        });

        test("インデックス7を渡すとEが返る", () => {
            expect(getNoteByIndex(7)).toBe("E");
        });
    });

    describe("シャープを含む音階の取得", () => {
        test("インデックス1を渡すとA#が返る", () => {
            expect(getNoteByIndex(1)).toBe("A#");
        });

        test("インデックス4を渡すとC#が返る", () => {
            expect(getNoteByIndex(4)).toBe("C#");
        });

        test("インデックス6を渡すとD#が返る", () => {
            expect(getNoteByIndex(6)).toBe("D#");
        });
    });

    describe("フラット記号の継承", () => {
        test("インデックス1とB♭を渡すとB♭が返る", () => {
            expect(getNoteByIndex(1, "B♭")).toBe("B♭");
        });

        test("インデックス4とD♭を渡すとD♭が返る", () => {
            expect(getNoteByIndex(4, "D♭")).toBe("D♭");
        });

        test("インデックス6とE♭を渡すとE♭が返る", () => {
            expect(getNoteByIndex(6, "E♭")).toBe("E♭");
        });
    });

    describe("インデックスの循環", () => {
        test("インデックス12を渡すとAが返る（1周）", () => {
            expect(getNoteByIndex(12)).toBe("A");
        });

        test("インデックス-1を渡すとG#が返る（後ろから1つ目）", () => {
            expect(getNoteByIndex(-1)).toBe("G#");
        });

        test("インデックス-12を渡すとAが返る（1周戻る）", () => {
            expect(getNoteByIndex(-12)).toBe("A");
        });
    });

    describe("フラット記号の継承と循環の組み合わせ", () => {
        test("インデックス13とB♭を渡すとB♭が返る（1周してインデックス1）", () => {
            expect(getNoteByIndex(13, "B♭")).toBe("B♭");
        });

        test("インデックス-11とE♭を渡すとB♭が返る（後ろから11番目）", () => {
            expect(getNoteByIndex(-11, "E♭")).toBe("B♭");
        });
    });
});

describe("コード文字列の解析(parseChord)のテスト", () => {
    describe("基本的なコード", () => {
        test("Cを渡すと、キー音C、修飾子なし、ベース音なしが返る", () => {
            expect(parseChord("C")).toEqual({
                keyNote: "C",
                modifier: "",
                bassNote: "",
            });
        });

        test("Aを渡すと、キー音A、修飾子なし、ベース音なしが返る", () => {
            expect(parseChord("A")).toEqual({
                keyNote: "A",
                modifier: "",
                bassNote: "",
            });
        });
    });

    describe("シャープを含むコード", () => {
        test("C#を渡すと、キー音C#、修飾子なし、ベース音なしが返る", () => {
            expect(parseChord("C#")).toEqual({
                keyNote: "C#",
                modifier: "",
                bassNote: "",
            });
        });

        test("F#mを渡すと、キー音F#、修飾子m、ベース音なしが返る", () => {
            expect(parseChord("F#m")).toEqual({
                keyNote: "F#",
                modifier: "m",
                bassNote: "",
            });
        });
    });

    describe("フラットを含むコード", () => {
        test("B♭を渡すと、キー音B♭、修飾子なし、ベース音なしが返る", () => {
            expect(parseChord("B♭")).toEqual({
                keyNote: "B♭",
                modifier: "",
                bassNote: "",
            });
        });

        test("E♭mを渡すと、キー音E♭、修飾子m、ベース音なしが返る", () => {
            expect(parseChord("E♭m")).toEqual({
                keyNote: "E♭",
                modifier: "m",
                bassNote: "",
            });
        });
    });

    describe("コード修飾を含むコード", () => {
        test("Cmを渡すと、キー音C、修飾子m、ベース音なしが返る", () => {
            expect(parseChord("Cm")).toEqual({
                keyNote: "C",
                modifier: "m",
                bassNote: "",
            });
        });

        test("DM7を渡すと、キー音D、修飾子M7、ベース音なしが返る", () => {
            expect(parseChord("DM7")).toEqual({
                keyNote: "D",
                modifier: "M7",
                bassNote: "",
            });
        });

        test("Esus4を渡すと、キー音E、修飾子sus4、ベース音なしが返る", () => {
            expect(parseChord("Esus4")).toEqual({
                keyNote: "E",
                modifier: "sus4",
                bassNote: "",
            });
        });
    });

    describe("ベース音を含むコード", () => {
        test("C/Gを渡すと、キー音C、修飾子なし、ベース音Gが返る", () => {
            expect(parseChord("C/G")).toEqual({
                keyNote: "C",
                modifier: "",
                bassNote: "G",
            });
        });

        test("Dm/Fを渡すと、キー音D、修飾子m、ベース音Fが返る", () => {
            expect(parseChord("Dm/F")).toEqual({
                keyNote: "D",
                modifier: "m",
                bassNote: "F",
            });
        });

        test("E♭/B♭を渡すと、キー音E♭、修飾子なし、ベース音B♭が返る", () => {
            expect(parseChord("E♭/B♭")).toEqual({
                keyNote: "E♭",
                modifier: "",
                bassNote: "B♭",
            });
        });
    });

    describe("無効なコード", () => {
        test("空文字を渡すとnullが返る", () => {
            expect(parseChord("")).toBeNull();
        });

        test("存在しない音階Hを渡すとnullが返る", () => {
            expect(parseChord("H")).toBeNull();
        });

        test("N.C.を渡すとnullが返る", () => {
            expect(parseChord("N.C.")).toBeNull();
        });
    });
});

describe("コードの転調(transposeChord)のテスト", () => {
    describe("基本的な転調", () => {
        test("Cを1つ上げるとC#になる", () => {
            expect(transposeChord("C", 1)).toBe("C#");
        });

        test("Cを2つ上げるとDになる", () => {
            expect(transposeChord("C", 2)).toBe("D");
        });

        test("Cを1つ下げるとBになる", () => {
            expect(transposeChord("C", -1)).toBe("B");
        });
    });

    describe("シャープ付きコードの下方転調", () => {
        test("C#を1つ下げるとCになる", () => {
            expect(transposeChord("C#", -1)).toBe("C");
        });

        test("D#を1つ下げるとDになる", () => {
            expect(transposeChord("D#", -1)).toBe("D");
        });

        test("F#を1つ下げるとFになる", () => {
            expect(transposeChord("F#", -1)).toBe("F");
        });

        test("G#を1つ下げるとGになる", () => {
            expect(transposeChord("G#", -1)).toBe("G");
        });

        test("A#を1つ下げるとAになる", () => {
            expect(transposeChord("A#", -1)).toBe("A");
        });
    });

    describe("シャープ付きコードの2度下方転調", () => {
        test("C#を2つ下げるとBになる", () => {
            expect(transposeChord("C#", -2)).toBe("B");
        });

        test("F#を2つ下げるとEになる", () => {
            expect(transposeChord("F#", -2)).toBe("E");
        });
    });

    describe("コード修飾を含む転調", () => {
        test("Cmを1つ上げるとC#mになる", () => {
            expect(transposeChord("Cm", 1)).toBe("C#m");
        });

        test("CM7を2つ上げるとDM7になる", () => {
            expect(transposeChord("CM7", 2)).toBe("DM7");
        });

        test("Csus4を1つ下げるとBsus4になる", () => {
            expect(transposeChord("Csus4", -1)).toBe("Bsus4");
        });
    });

    describe("ベース音を含むコードの転調", () => {
        test("C/Gを1つ上げるとC#/G#になる", () => {
            expect(transposeChord("C/G", 1)).toBe("C#/G#");
        });

        test("Dm/Fを2つ上げるとEm/Gになる", () => {
            expect(transposeChord("Dm/F", 2)).toBe("Em/G");
        });

        test("Em/Bを1つ下げるとD#m/A#になる", () => {
            expect(transposeChord("Em/B", -1)).toBe("D#m/A#");
        });
    });

    describe("フラット記号を含むコードの転調", () => {
        test("E♭を1つ上げるとEになる", () => {
            expect(transposeChord("E♭", 1)).toBe("E");
        });

        test("B♭mを2つ上げるとCmになる", () => {
            expect(transposeChord("B♭m", 2)).toBe("Cm");
        });

        test("A♭/E♭を1つ下げるとG/Dになる", () => {
            expect(transposeChord("A♭/E♭", -1)).toBe("G/D");
        });
    });

    describe("12音循環での転調", () => {
        test("Cを12個上げると元のCに戻る", () => {
            expect(transposeChord("C", 12)).toBe("C");
        });

        test("Dmを24個上げると元のDmに戻る", () => {
            expect(transposeChord("Dm", 24)).toBe("Dm");
        });

        test("E/Bを12個下げると元のE/Bに戻る", () => {
            expect(transposeChord("E/B", -12)).toBe("E/B");
        });
    });

    describe("特殊なケース", () => {
        test("N.C.は転調してもN.C.のまま", () => {
            expect(transposeChord("N.C.", 1)).toBe("N.C.");
        });

        test("空文字は転調しても空文字のまま", () => {
            expect(transposeChord("", 1)).toBe("");
        });

        test("不正な文字列XXXは転調してもXXXのまま", () => {
            expect(transposeChord("XXX", 1)).toBe("XXX");
        });
    });

    describe("表記の継承", () => {
        test("E♭を1つ下げるとDになる", () => {
            expect(transposeChord("E♭", -1)).toBe("D");
        });

        test("Dを1つ下げるとC#になる", () => {
            expect(transposeChord("D", -1)).toBe("C#");
        });

        test("B♭/E♭を2つ上げるとC/Fになる", () => {
            expect(transposeChord("B♭/E♭", 2)).toBe("C/F");
        });
    });
});

describe("音階の妥当性チェック(isValidNote)のテスト", () => {
    describe("シャープを含む有効な音階", () => {
        test("Aを渡すとtrueが返る", () => {
            expect(isValidNote("A")).toBe(true);
        });

        test("C#を渡すとtrueが返る", () => {
            expect(isValidNote("C#")).toBe(true);
        });

        test("F#を渡すとtrueが返る", () => {
            expect(isValidNote("F#")).toBe(true);
        });

        test("G#を渡すとtrueが返る", () => {
            expect(isValidNote("G#")).toBe(true);
        });
    });

    describe("フラットを含む有効な音階", () => {
        test("B♭を渡すとtrueが返る", () => {
            expect(isValidNote("B♭")).toBe(true);
        });

        test("E♭を渡すとtrueが返る", () => {
            expect(isValidNote("E♭")).toBe(true);
        });

        test("A♭を渡すとtrueが返る", () => {
            expect(isValidNote("A♭")).toBe(true);
        });
    });

    describe("無効な音階", () => {
        test("空文字を渡すとfalseが返る", () => {
            expect(isValidNote("")).toBe(false);
        });

        test("存在しない音階Hを渡すとfalseが返る", () => {
            expect(isValidNote("H")).toBe(false);
        });

        test("異なるフラット記号Bbを渡すとfalseが返る", () => {
            expect(isValidNote("Bb")).toBe(false);
        });

        test("重複したシャープC##を渡すとfalseが返る", () => {
            expect(isValidNote("C##")).toBe(false);
        });

        test("無効な文字Xを渡すとfalseが返る", () => {
            expect(isValidNote("X")).toBe(false);
        });
    });

    describe("コード修飾を含む文字列", () => {
        test("Cmを渡すとfalseが返る", () => {
            expect(isValidNote("Cm")).toBe(false);
        });

        test("D7を渡すとfalseが返る", () => {
            expect(isValidNote("D7")).toBe(false);
        });

        test("F#m7を渡すとfalseが返る", () => {
            expect(isValidNote("F#m7")).toBe(false);
        });
    });

    describe("特殊なケース", () => {
        test("N.C.を渡すとfalseが返る", () => {
            expect(isValidNote("N.C.")).toBe(false);
        });

        test("先頭に空白のある音階 Aを渡すとfalseが返る", () => {
            expect(isValidNote(" A")).toBe(false);
        });

        test("小文字のaを渡すとfalseが返る", () => {
            expect(isValidNote("a")).toBe(false);
        });
    });
});
