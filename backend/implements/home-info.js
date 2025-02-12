const express = require('express');

const {
    loadUrl,
    isDisplay,
    getArtistName,
    isSongListGroupItem,
    getSongId,
    isArtistListGroupItem,
    getRankingNumber,
    getSongName,
    getArtistNameOfSong,
    getArtistId,
    hasExcludeBadge
} = require('../utils/cheerio');
    
const router = express.Router();

exports.getHomeInfo = async (req, res) => {
    try {
        const $ = await loadUrl(`https://www.ufret.jp/`);
        const songs = [];
        const artists = [];

        $('a.list-group-item').each((_, element) => {
            if (isSongListGroupItem($(element))) {
                // 見えていない要素は無視する
                if (!isDisplay($(element))) { return }
                // 除外対象の場合は無視する
                if (hasExcludeBadge($(element))) { return }

                const songId = getSongId($(element));
                const name = getSongName($(element));
                const artist = getArtistNameOfSong($(element));
                const rank = getRankingNumber($(element));

                if (!songId || !name || !artist || !rank) { return }

                songs.push({ 
                    id: songId, 
                    name: name,
                    artist: artist,
                    rank: rank
                });
            }
            if (isArtistListGroupItem($(element))) {
                // 見えていない要素は無視する
                if (!isDisplay($(element))) { return }

                const artistId = getArtistId($(element));
                const name = getArtistName($(element));
                const rank = getRankingNumber($(element));

                if (!artistId || !name || !rank) { return }

                artists.push({ 
                    id: artistId, 
                    name: name,
                    rank: rank
                });
            }
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