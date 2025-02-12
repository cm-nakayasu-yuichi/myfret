import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ChordSheetBox = styled(Box)`
    ${({ theme }) => `
        .chord-sheet {
            margin-top: 1rem !important;
        }
        .chord-row {
            margin-left: 0 !important;
            margin-right: 0 !important;
            display: flex;
            flex-wrap: wrap;
        }
        .chord {
            margin-right: 6px;
            margin-bottom: 8px;
            display: inline-flex;
            margin-top: 0;
        }
        .chord-name {
            pointer-events: none;
            display: block;
        }
        .chord-name ruby {
            display: inline-table;
            margin: 2px 0 0 2px;
            padding: 0;
            border: none;
            white-space: nowrap;
            text-indent: 0;
            vertical-align: text-bottom;
        }
        .chord-name ruby rt {
            text-align: left;
            font-weight: bold !important;
            font-size: 16px;
            display: table-header-group;
            color: #444444;
            margin: 0;
            padding: 0;
            border: none;
            font: inherit;
            line-height: 100%;
            text-decoration: none;
        }
        .chord-cols {
            padding-top: 20px;
            display: block;
        }
        .col {
            padding-left: 0;
            padding-right: 0;
            font-weight: bold;
            color: #B22222;
            outline: none;
            font-size: 16px;
        }
        .chord:not(.no-chord) .chord-cols .col:first-of-type {
            margin-left: -18px;
        }
    `}
`;