declare global {
    interface Window {
        chordClickHandler?: (chordName: string) => void;
    }
}

export {};
