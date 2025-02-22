import { ChordPosition } from "./interfaces";

/**
 * 押さえる弦のフレット番号
 *
 * - [1弦, 2弦, 3弦, 4弦, 5弦, 6弦]
 *   - 0は開放弦を表す
 *   - -1はミュート弦を表す
 */
export const OPEN_POSITIONS: Record<
    string,
    Record<string, ChordPosition | null>
> = {
    "minor": {
        "C":  null,
        "C#": null,
        "D":  { frets: [1, 3, 2, 0, -1, -1] },
        "D#": null,
        "E":  { frets: [0, 0, 0, 2, 2, 0], barres: [{ fret: 0, strings: [1, 6] }] },
        "F":  null,
        "F#": null,
        "G":  null,
        "G#": null,
        "A":  { frets: [0, 1, 2, 2, 0, -1], barres: [{ fret: 0, strings: [1, 5] }] },
        "A#": null,
        "B":  null,
    },
    "7": {
        "C":  null,
        "C#": null,
        "D":  { frets: [2, 1, 2, 0, -1, -1] },
        "D#": null,
        "E":  { frets: [0, 0, 1, 0, 2, 0], barres: [{ fret: 0, strings: [1, 6] }] },
        "F":  null,
        "F#": null,
        "G":  { frets: [1, 0, 0, 0, 2, 3] },
        "G#": null,
        "A":  { frets: [0, 2, 0, 2, 0, -1], barres: [{ fret: 0, strings: [1, 5] }] },
        "A#": null,
        "B":  null,
    },
    "m7": {
        "C":  null,
        "C#": null,
        "D":  { frets: [1, 1, 2, 0, -1, -1] },
        "D#": null,
        "E":  { frets: [0, 0, 0, 0, 2, 0], barres: [{ fret: 0, strings: [1, 6] }] },
        "F":  null,
        "F#": null,
        "G":  null,
        "G#": null,
        "A":  { frets: [0, 1, 0, 2, 0, -1], barres: [{ fret: 0, strings: [1, 5] }] },
        "A#": null,
        "B":  null,
    },
    "maj7": {
        "C":  { frets: [0, 0, 0, 2, 3, 0] },
        "C#": null,
        "D":  null,
        "D#": null,
        "E":  { frets: [0, 0, 1, 1, 2, 0], barres: [{ fret: 0, strings: [1, 6] }] },
        "F":  null,
        "F#": null,
        "G":  { frets: [2, 0, 0, 0, 2, 3] },
        "G#": null,
        "A":  { frets: [0, 2, 1, 2, 0, -1], barres: [{ fret: 0, strings: [1, 5] }] },
        "A#": null,
        "B":  null,
    },
} as const;
