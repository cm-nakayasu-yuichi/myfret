export const encodeURIWithPlus = (str: string) => {
    return encodeURIComponent(str)
    .replace(/%20/g, '+')  // 空白を+に変換
    .replace(/%2B/g, '+')  // エンコードされた+記号を+に戻す
    .replace(/%28/g, '(')  // 括弧をデコード
    .replace(/%29/g, ')'); // 括弧をデコード
}
