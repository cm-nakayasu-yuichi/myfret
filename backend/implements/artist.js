const express = require('express');

const {
    loadUrl,
    isDisplay,
    getArtistName,
    isSongListGroupItem,
    getSongId,
    hasExcludeBadge
} = require('../utils/cheerio');
    
const router = express.Router();

exports.getSongsOfArtist = async (req, res) => {
    try {
        const artistName = req.params.name;
        const $ = await loadUrl(`https://www.ufret.jp/artist.php?data=${artistName}`);
        
        const songs = [];

        $('a.list-group-item').each((_, element) => {
            // 楽曲以外は無視する
            if (!isSongListGroupItem($(element))) { return }
            // 見えていない要素は無視する
            if (!isDisplay($(element))) { return }
            // 除外対象の場合は無視する
            if (hasExcludeBadge($(element))) { return }

            const songId = getSongId($(element));
            const name = getArtistName($(element));
            
            if (!songId || !name) { return }

            songs.push({ 
                id: songId, 
                name: name,
                rank: 0
            });
        });

        const count = songs.length;

        res.json({
            songs: songs,
            count: count,
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