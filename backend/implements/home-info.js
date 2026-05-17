const express = require('express');

const { loadUrl } = require('../utils/cheerio');

const router = express.Router();

exports.getHomeInfo = async (req, res) => {
    try {
        const $ = await loadUrl(`https://www.ufret.jp/`);
        const songs = [];
        const artists = [];
        let songRank = 0;
        let artistRank = 0;

        // 曲ランキング（ul.c-card-song の最初のブロックのみ＝今週のランキング）
        $('ul.c-card-song').first().find('li.c-card-song__item').each((_, element) => {
            const link = $(element).find('a[href*="song.php"]');
            const href = link.attr('href') || '';

            // 初心者バッジがある場合は除外
            if (link.find('div.c-card-song__badge span.badge-info').length > 0) { return; }

            const songId = href.match(/data=([^&]+)/)?.[1];
            const name = link.find('p.c-card-song__title').text().trim();
            const artist = link.find('p.c-card-song__artist').text().trim();

            songRank++;

            if (!songId || !name || !artist) { return; }

            songs.push({ id: songId, name, artist, rank: songRank });
        });

        // アーティストランキング（ul.c-card-artist）
        $('ul.c-card-artist li.c-card-artist__item').each((_, element) => {
            const link = $(element).find('a[href*="artist.php"]');
            const href = link.attr('href') || '';

            const artistId = href.match(/data=([^&]+)/)?.[1];
            const name = link.find('p.c-card-artist__artist').text().trim();

            artistRank++;

            if (!artistId || !name) { return; }

            artists.push({ id: artistId, name, rank: artistRank });
        });

        res.json({
            song_ranking: songs,
            artist_ranking: artists
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'スクレイピングに失敗しました',
            details: error.message
        });
    }
};

// /api/home-info
router.get('/', this.getHomeInfo);

module.exports = router;