/**
 * ページネーション用のURLを構築する
 * @param {string} baseUrl - ベースとなるURL（末尾スラッシュなし）
 * @param {string} [query] - 検索クエリ（省略可）
 * @param {number | null} [page=null] - ページ番号（省略可）
 * @returns {string} 構築されたURL
 * @example
 * // クエリあり
 * buildPaginationUrl('/search', 'keyword', 1)  // => '/search/keyword'
 * buildPaginationUrl('/search', 'keyword', 2)  // => '/search/keyword/2'
 *
 * // クエリなし
 * buildPaginationUrl('/items', undefined, 1)   // => '/items'
 * buildPaginationUrl('/items', undefined, 2)   // => '/items/2'
 */
export const buildPaginationUrl = (
    baseUrl: string,
    query?: string,
    page: number | null = null,
) => {
    if (query) {
        return page === 1 ? `${baseUrl}/${query}` : `${baseUrl}/${query}/${page}`;
    }
    return page === 1 ? baseUrl : `${baseUrl}/${page}`;
};
