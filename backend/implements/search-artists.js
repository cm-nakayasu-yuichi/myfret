const express = require('express');

const { loadUrl } = require('../utils/http');

const router = express.Router();

exports.searchArtists = async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const $ = await loadUrl(`https://www.ufret.jp/search.php?key=${keyword}`);
        const artists = [];

        $('ul.c-card-artist li.c-card-artist__item').each((_, element) => {
            const link = $(element).find('a[href*="artist.php"]');
            const href = link.attr('href') || '';

            const artistId = href.match(/data=([^&]+)/)?.[1];
            const name = link.find('p.c-card-artist__artist').text().trim();

            if (!artistId || !name) { return; }

            artists.push({ id: artistId, name, rank: 0 });
        });

        res.json({
            artists,
            count: artists.length,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'スクレイピングに失敗しました',
            details: error.message
        });
    }
};

// /api/search/artists/:keyword
router.get('/:keyword', this.searchArtists);

module.exports = router;