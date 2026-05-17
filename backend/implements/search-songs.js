const express = require('express');

const { loadUrl } = require('../utils/http');

const router = express.Router();

exports.searchSongs = async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const $ = await loadUrl(`https://www.ufret.jp/search.php?key=${keyword}`);
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
            const artist = link.find('p.c-list__artist').text().trim();

            if (!songId || !name || !artist) { return; }

            songs.push({ id: songId, name, artist, rank: 0 });
        });

        res.json({
            songs,
            count: songs.length,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'スクレイピングに失敗しました',
            details: error.message
        });
    }
};

// /api/search/song/:keyword
router.get('/:keyword', this.searchSongs);

module.exports = router;