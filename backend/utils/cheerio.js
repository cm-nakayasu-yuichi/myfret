const axios = require('axios');
const cheerio = require('cheerio');
/**
 * URLを読み込む (axios+cheerio)
 * @param {string} url - URL文字列
 * @returns {cheerio.CheerioAPI}
 */
exports.loadUrl = async (url) => {
    try {
        console.log(`reading: ${url}`);
        const response = await axios.get(url);
        console.log('reading completed.');
        
        return cheerio.load(response.data);
    } catch (error) {
        console.error('failed:', error);
        throw error;
    }
}
/**
 * 要素が表示されているか (display != none) であるかどうかを返す
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {boolean} 表示されていいればtrue
 */
exports.isDisplay = (element) => {
    const style = element.attr('style');
    if (!style) return true;  // style属性がない場合は表示されているとみなす

    return !style.includes('display:none') && !style.includes('display: none');
}
/**
 * 要素にランキング番号が配置されているかどうかを返す
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {boolean} 
 */
exports.hasRankNumber = (element) => {
    return element.find('span[style*="color:red"]').length > 0;
}
/**
 * 要素が楽曲のものかどうかを返す
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {boolean} 
 */
exports.isSongListGroupItem = (element) => {
    const href = element.attr('href');
    if (!href) return false;  // href属性がない場合はfalse
    
    return href.includes('song.php');
}
/**
 * 要素がアーティストのものかどうかを返す
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {boolean} 
 */
exports.isArtistListGroupItem = (element) => {
    const href = element.attr('href');
    if (!href) return false;  // href属性がない場合はfalse
    
    return href.includes('artist.php');
}
/**
 * 除外するバッジがあるかどうか(弾き語りTAB譜など)
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {boolean} 
 */
exports.hasExcludeBadge = (element) => {
    // こういうバッジがある場合は除外する
    // <span class="badge badge-pill badge-warning">弾き語りTAB譜</span>
    return element.find('span.badge-pill').length > 0;
}
/**
 * 要素から楽曲IDを取得する
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {string | null} 楽曲ID
 */
exports.getSongId = (element) => {
    const href = element.attr('href') || '';
    return href.match(/data=([^&]+)/)?.[1];
}
/**
 * 要素からアーティストIDを取得する
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {string | null} 楽曲ID
 */
exports.getArtistId = (element) => {
    const href = element.attr('href') || '';
    return href.match(/data=([^&]+)/)?.[1];
}
/**
 * 要素からt楽曲名を取得する
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {string | null} 楽曲名
 */
exports.getSongName = (element) => {
    return element.find('strong').text().trim();
}
/**
 * 要素からアーティスト名を取得する
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {string | null} 楽曲名
 */
exports.getArtistName = (element) => {
    return element.find('strong').text().trim();
}
/**
 * 要素から楽曲のアーティスト名を取得する
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {string | null} アーティスト名
 */
exports.getArtistNameOfSong = (element) => {
    return element.find('span[style*="font-size:12px"]').text().trim();
}
/**
 * 要素から楽曲のランキング番号を取得する
 * @param {cheerio.Cheerio<Element>} element - 要素
 * @returns {number | null} ランキング番号
 */
exports.getRankingNumber = (element) => {
    const text = element.find('span[style*="color:red"]').text().trim();
    if (!text) return null;
    
    const number = parseInt(text);
    return isNaN(number) ? null : number;
};
/**
 * ページから検索結果の曲数を取得する
 * @param {cheerio.Cheerio<Element>} $ - 要素
 * @returns {int} 検索結果数
 */
exports.getNumberOfSongs = ($) => {
    var ret = 0
    $('h5 span').each((_, element) => {
        console.log( $(element).text())
        const match = $(element).text().match(/(\d+)曲/);
        if (match) {
            ret = parseInt(match[1]) ?? 0;
            return
        }
    });
    return ret;
}

