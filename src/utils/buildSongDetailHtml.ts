import { SongResponse } from "../types";

export const buildSongDetailHtml = (data: SongResponse) => {
    if (!data || !data.body) return '';

    return `
      <div class="chord-sheet">
        ${data.body.map(row => `
          <div class="chord-row">
            ${row.chords.map(chord => `
              <p class="chord${!chord.chordName ? ' no-chord' : ''}">
                <span class="chord-name">
                  ${chord.chordName ? `<ruby><rt>${chord.chordName}</rt></ruby>` : ''}
                </span>
                <span class="chord-cols">
                  ${chord.cols.map(col => `
                    <span class="col">${col || '&nbsp;'}</span>
                  `).join('')}
                </span>
              </p>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;
};
