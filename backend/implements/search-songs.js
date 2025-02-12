const express = require('express');

const {
    loadUrl,
    isSongListGroupItem,
    isDisplay,
    getSongName,
    getArtistNameOfSong,
    getSongId,
    getNumberOfSongs,
    hasExcludeBadge
} = require('../utils/cheerio');
    
const router = express.Router();

exports.searchSongs = async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const $ = await loadUrl(`https://www.ufret.jp/search.php?key=${keyword}`);
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
            
            if (!songId || !name || !artist) { return }

            songs.push({ 
                id: songId, 
                name: name,
                artist: artist,
                rank: 0
            });
        });

        const count = getNumberOfSongs($);

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

// /api/search/song/:keyword
router.get('/:keyword', this.searchSongs);

module.exports = router;