const express = require('express');

const {
    loadUrl,
    isDisplay,
    getRankingNumber,
    isArtistListGroupItem,
    getArtistId,
    getArtistName
} = require('../utils/cheerio');
    
const router = express.Router();

exports.rankingArtists = async (req, res) => {
    try {
        const $ = await loadUrl(`https://www.ufret.jp/rank_artist.php`);
        const artists = [];

        $('a.list-group-item').each((_, element) => {
            // アーティスト以外は無視する
            if (!isArtistListGroupItem($(element))) { return }
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

// /api/ranking/artists/
router.get('/', this.rankingArtists);

module.exports = router;