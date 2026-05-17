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
