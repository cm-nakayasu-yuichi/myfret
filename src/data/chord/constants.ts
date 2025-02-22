/** 音階の定義（異名同音を含む） */
export const NOTE_MAPPINGS: ReadonlyArray<ReadonlyArray<string>> = [
    ["A"],
    ["A#", "B♭"],
    ["B"],
    ["C"],
    ["C#", "D♭"],
    ["D"],
    ["D#", "E♭"],
    ["E"],
    ["F"],
    ["F#", "G♭"],
    ["G"],
    ["G#", "A♭"],
] as const;

// 型定義を追加
type NoteMapping = (typeof NOTE_MAPPINGS)[number];
export type Note = NoteMapping[number];
