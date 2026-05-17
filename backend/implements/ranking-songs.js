const express = require('express');

const { loadUrl } = require('../utils/http');

const router = express.Router();

exports.rankingSongs = async (req, res) => {
    try {
        const $ = await loadUrl(`https://www.ufret.jp/rank.php`);
        const songs = [];
        let rank = 0;

        // 表示中のタブ（週間ランキング）のコンテナを取得
        const activeTabCont = $('div.js-tab-cont').filter((_, el) => {
            const style = $(el).attr('style') || '';
            return !style.includes('display: none') && !style.includes('display:none');
        }).first();

        activeTabCont.find('li.c-list__item').each((_, element) => {
            const li = $(element);

            // 初心者verは除外
            if (li.hasClass('beginner-chord')) { return; }

            const link = li.find('a.c-list__link');
            const href = link.attr('href') || '';

            // 曲以外は除外
            if (!href.includes('song.php')) { return; }

            const songId = href.match(/data=([^&]+)/)?.[1];
            // 子要素（初心者verバッジ等）を除いたテキストだけ取得
            const name = link.find('p.c-list__title').clone().children().remove().end().text().trim();
            const artist = link.find('p.c-list__artist').text().trim();

            rank++;

            if (!songId || !name || !artist) { return; }

            songs.push({ id: songId, name, artist, rank });
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

// /api/ranking/songs/
router.get('/', this.rankingSongs);

module.exports = router;