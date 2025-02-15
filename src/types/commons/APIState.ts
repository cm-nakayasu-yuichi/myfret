/** API状態 */
export interface APIState<T> {
    /** ローディング中かどうか */
    loading: boolean;
    /** エラー */
    error: string | null;
    /** APIリクエストの結果 */
    result: T | null;
}
