import { Note, NOTE_MAPPINGS } from "./constants";
import { OPEN_POSITIONS } from "./data";
import { ChordParts, ChordPosition } from "./interfaces";

/**
 * 音階のインデックスを取得
 * @param note 音階（例: "C#", "E♭"）
 * @returns インデックス（0-11）、見つからない場合は-1
 */
const getNoteIndex = (note: string): number => {
    return NOTE_MAPPINGS.findIndex((notes: readonly string[]) =>
        notes.includes(note)
    );
};

/**
 * インデックスを正規化（循環）する
 * @param index 元のインデックス
 * @returns 0-11の範囲に正規化されたインデックス
 * @example
 * getNormalizedIndex(-1) => 11  // Aから1つ下がるとG#
 * getNormalizedIndex(-2) => 10  // Aから2つ下がるとG
 * getNormalizedIndex(12) => 0   // Aから12上がるとA
 * getNormalizedIndex(13) => 1   // Aから13上がるとA#
 */
export const getNormalizedIndex = (index: number): number => {
    return ((index % 12) + 12) % 12;
};

/**
 * 指定されたインデックスの音階を取得
 * @param index インデックス（転調後の位置）
 * @param originalNote 元の音階（表記方法を継承するため）
 * @returns 音階文字列
 */
export const getNoteByIndex = (
    index: number,
    originalNote?: string
): string => {
    const normalizedIndex = getNormalizedIndex(index);
    const notes = NOTE_MAPPINGS[normalizedIndex];

    // フラット記号を使用していた場合はフラット表記を優先
    if (originalNote?.includes("♭") && notes.length > 1) {
        const flatNote = notes[1];
        if (flatNote) {
            return flatNote;
        }
    }

    // それ以外は最初の表記（自然音またはシャープ）を使用
    return notes[0];
};

/**
 * コードを構成要素に分解
 * @param chord コード文字列 (例: "Cm/G")
 * @returns 分解されたコード情報
 */
export const parseChord = (chord: string): ChordParts | null => {
    if (!chord) return null;

    // スラッシュコードの分解
    const [mainPart, bassNote] = chord.split("/");

    // キー音とコード修飾の分離
    // より長い音階名（C#やB♭など）を先に検索するため、長さでソート
    const keyNote = NOTE_MAPPINGS.flat()
        .sort((a, b) => b.length - a.length)
        .find((note) => mainPart.startsWith(note));

    if (!keyNote) return null;

    const modifier = mainPart.slice(keyNote.length);

    return {
        keyNote,
        modifier,
        bassNote: bassNote || "",
    };
};

/**
 * コードを転調
 * @param chord コード文字列
 * @param semitones 半音の数（正: 上げる、負: 下げる）
 * @returns 転調後のコード文字列
 */
export const transposeChord = (
    chord: string | null,
    semitones: number
): string | null => {
    if (chord === null) return null;

    const parts = parseChord(chord);
    if (!parts) return chord; // パースできない場合は元の文字列を返す

    // キー音の転調
    const keyIndex = getNoteIndex(parts.keyNote);
    const newKeyNote = getNoteByIndex(keyIndex + semitones, parts.keyNote);

    // ベース音の転調
    let newBassNote = "";
    if (parts.bassNote) {
        const bassIndex = getNoteIndex(parts.bassNote);
        newBassNote =
            "/" + getNoteByIndex(bassIndex + semitones, parts.bassNote);
    }

    return newKeyNote + parts.modifier + newBassNote;
};

export const isValidNote = (note: string): note is Note => {
    return NOTE_MAPPINGS.flat().includes(note as Note);
};

/**
 * コードのポジションを取得する
 * @param chord コード文字列 (例: "Cm/G")
 * @returns ChordPositionの配列
 */
export const getChordPositions = (chord: string): ChordPosition[] => {
    const chordParts = parseChord(chord);
    if (chordParts === null) {
        return [];
    }
    const positions: ChordPosition[] = [];

    // オープンコードの取得
    const openPosition =
        OPEN_POSITIONS[chordParts.modifier]?.[chordParts.keyNote];
    if (openPosition) {
        positions.push(openPosition);
    }

    // 基本フォームを持つコードを探して派生系を作る
    const modifier = chordParts.modifier;
    for (const note of NOTES) {
        const position = OPEN_POSITIONS[modifier]?.[note];
        if (position?.barres?.length === 1) {
            // 基本フォームから目的のコードまでのフレット差を計算
            const offset = getNoteOffset(note, chordParts.keyNote);
            if (offset > 0) {
                // 派生系のポジションを作成
                positions.push(shiftPosition(position, offset));
            }
        }
    }

    return positions;
};

/**
 * フレット差分を計算する
 * @param from
 * @param to
 * @returns
 */
const getNoteOffset = (from: string, to: string): number => {
    const fromIndex = NOTES.indexOf(from);
    const toIndex = NOTES.indexOf(to);
    if (fromIndex === -1 || toIndex === -1) return 0;

    return (toIndex - fromIndex + 12) % 12;
};

/**
 * ポジションをシフトする
 * @param position
 * @param offset
 * @returns
 */
const shiftPosition = (
    position: ChordPosition,
    offset: number
): ChordPosition => {
    return {
        frets: position.frets.map((fret) => (fret >= 0 ? fret + offset : fret)),
        barres: position.barres?.map((barre) => ({
            fret: barre.fret + offset,
            strings: [...barre.strings],
        })),
    };
};
