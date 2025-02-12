const express = require('express');

const {
    loadUrl,
    isArtistListGroupItem,
    isDisplay,
    getArtistName,
    getArtistNameOfSong,
    getArtistId,
    getNumberOfSongs
} = require('../utils/cheerio');
    
const router = express.Router();

exports.searchArtists = async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const $ = await loadUrl(`https://www.ufret.jp/search.php?key=${keyword}`);
        const artists = [];

        $('a.artist_list').each((_, element) => {
            // アーティスト以外は無視する
            if (!isArtistListGroupItem($(element))) { return }

            const artistId = getArtistId($(element));
            const name = $(element).text().trim();
            
            if (!artistId || !name) { return }

            artists.push({ 
                id: artistId, 
                name: name,
                rank: 0
            });
        });

        const count = artists.length;

        res.json({
            artists: artists,
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

// /api/search/artists/:keyword
router.get('/:keyword', this.searchArtists);

module.exports = router;