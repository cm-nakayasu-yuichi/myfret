const express = require('express');

const { loadUrl } = require('../utils/cheerio');

const router = express.Router();

exports.getSongsOfArtist = async (req, res) => {
    try {
        const artistName = req.params.name;
        const $ = await loadUrl(`https://www.ufret.jp/artist.php?data=${artistName}`);

        const songs = [];

        $('ul.c-list li.c-list__item').each((_, element) => {
            const li = $(element);

            // 初心者ver・動画プラスは除外
            if (!li.hasClass('normal-chord')) { return; }

            const link = li.find('a.c-list__link');
            const href = link.attr('href') || '';

            if (!href.includes('song.php')) { return; }

            const songId = href.match(/data=([^&]+)/)?.[1];
            const name = link.find('p.c-list__title').clone().children().remove().end().text().trim();

            if (!songId || !name) { return; }

            songs.push({ id: songId, name, rank: 0 });
        });

        res.json({
            songs,
            count: songs.length,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'スクレイピングに失敗しました',
            details: error.message
        });
    }
};

// /api/artist/:name
router.get('/:name',this.getSongsOfArtist);

module.exports = router;