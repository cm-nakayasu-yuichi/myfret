export interface AppTheme {
    background: {
        default: string;
        paper: string;
    };
    header: {
        background: string;
        text: string;
        icon: string;
    };
    text: {
        primary: string;
        secondary: string;
        accent: string;
    };
    chordDiagram: {
        main: string;
        position: string;
        number: string;
    };
    chordSheet: {
        chord: string;
        lyric: string;
    };
    rankingNumber: {
        gold: {
            background: string;
            text: string;
        };
        silver: {
            background: string;
            text: string;
        };
        bronze: {
            background: string;
            text: string;
        };
        other: {
            background: string;
            text: string;
        };
    };
};