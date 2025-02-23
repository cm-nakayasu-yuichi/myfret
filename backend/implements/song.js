const { chromium } = require("playwright");
const express = require("express");
const router = express.Router();

exports.getSong = async (req, res) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        const songId = req.params.id;
        const url = `https://www.ufret.jp/song.php?data=${songId}`;
        console.log(`reading: ${url}`);

        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 10000,
        });

        await page.waitForTimeout(1000);
        console.log("reading completed.");

        // 基本情報の取得
        const data = await page.evaluate(() => {
            return {
                title:
                    document
                        .querySelector("span.show_name")
                        ?.textContent?.trim() || "",
                artist:
                    document
                        .querySelector("span.show_artist")
                        ?.textContent?.trim() || "",
                credit:
                    document
                        .querySelector("p.show_lyrics")
                        ?.textContent?.trim() || "",
            };
        });

        // コード譜の行を取得
        const rows = await page.evaluate(() => {
            const rowElements = document.querySelectorAll(
                "#my-chord-data > div.row"
            );
            const rows = [];

            rowElements.forEach((rowElement) => {
                const chords = [];
                const chordElements = rowElement.querySelectorAll("p.chord");

                chordElements.forEach((chordElement) => {
                    const chord = {
                        chordName:
                            chordElement
                                .querySelector("span > ruby > rt")
                                ?.textContent?.trim() || null,
                        cols: [],
                        lyric: "",
                    };

                    const colElements =
                        chordElement.querySelectorAll("span > span.col");
                    colElements.forEach((colElement) => {
                        const colText = colElement.textContent.trim();
                        chord.cols.push(colText);
                        chord.lyric += colText || " ";
                    });

                    chords.push(chord);
                });

                if (chords.length > 0) {
                    rows.push({ chords });
                }
            });

            return rows;
        });

        // カポ（キー）の取得
        const selectedCapoOption = await page.locator(
            'select[name="keyselect"] option[selected]'
        );
        let selectedCapo = 0;

        if ((await selectedCapoOption.count()) > 0) {
            const value = await selectedCapoOption.getAttribute("value");
            if (value) {
                const parsedKey = parseInt(value);
                // 有効な範囲（-9から+2）かチェック
                if (!isNaN(parsedKey) && parsedKey >= -9 && parsedKey <= 2) {
                    selectedCapo = parsedKey;
                }
            }
        }

        res.json({
            title: data.title,
            artist: data.artist,
            credit: data.credit,
            capo: selectedCapo,
            body: rows,
        });
    } catch (error) {
        res.status(500).json({
            error: "スクレイピングに失敗しました",
            details: error.message,
        });
    } finally {
        await browser.close();
    }
};

// /api/song/:id
router.get("/:id", this.getSong);

module.exports = router;
