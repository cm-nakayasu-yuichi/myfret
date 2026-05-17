const express = require('express');

const { loadUrl } = require('../utils/http');

const router = express.Router();

exports.rankingArtists = async (req, res) => {
    try {
        const $ = await loadUrl(`https://www.ufret.jp/rank_artist.php`);
        const artists = [];
        let rank = 0;

        $('ul.c-list--rank li.c-list__item').each((_, element) => {
            const link = $(element).find('a.c-list__link');
            const href = link.attr('href') || '';

            // アーティスト以外は除外
            if (!href.includes('artist.php')) { return; }

            const artistId = href.match(/data=([^&]+)/)?.[1];
            const name = link.find('p.c-list__title').text().trim();

            rank++;

            if (!artistId || !name) { return; }

            artists.push({ id: artistId, name, rank });
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

// /api/ranking/artists/
router.get('/', this.rankingArtists);

module.exports = router;