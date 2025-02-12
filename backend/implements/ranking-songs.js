const express = require('express');

const {
    loadUrl,
    isSongListGroupItem,
    isDisplay,
    getSongName,
    getArtistNameOfSong,
    getSongId,
    getRankingNumber,
    hasExcludeBadge
} = require('../utils/cheerio');
    
const router = express.Router();

exports.rankingSongs = async (req, res) => {
    try {
        const $ = await loadUrl(`https://www.ufret.jp/rank.php`);
        const songs = [];

        $('a.list-group-item').each((_, element) => {
            // 楽曲以外は無視する
            if (!isSongListGroupItem($(element))) { return }
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
        });

        const count = songs.length;

        res.json({
            songs: songs,
            count: count,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'スクレイピングに失敗しました',
            details: error.message 
        });
    }
};

// /api/ranking/songs/
router.get('/', this.rankingSongs);

module.exports = router;