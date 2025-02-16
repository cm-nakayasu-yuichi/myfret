import { useState, useRef, useEffect } from "react";
import {
    Typography,
    Box,
    Paper,
    IconButton,
    Container,
    CircularProgress,
    Alert,
    Button,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
    CapoValue,
    capoValueOptions,
    getCapoValueText,
    isValidCapoValue,
    SongKeyValue,
    songKeyValueOptions,
    getSongKeyValueText,
    ChordRow,
    transposeChord,
} from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSong } from "../../hooks/useGetSong";
import { buildSongDetailHtml } from "../../utils/buildSongDetailHtml";
import { ChordSheetBox } from "../../styles/ChordSheetBox";
import { PulldownContainer } from "../common/pulldown";

interface ScrollContainerRef {
    scrollHeight: number;
    clientHeight: number;
    scrollTop: number;
    scrollTo: (options: { top: number; behavior: ScrollBehavior }) => void;
}

export const SongPage = () => {
    const navigate = useNavigate();
    const { songId = "" } = useParams<{ songId: string }>();
    const { loading, error, result } = useGetSong(songId);
    const [capo, setCapo] = useState<CapoValue>(0);
    const [songKey, setSongKey] = useState<SongKeyValue>(0);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = (direction: "up" | "down") => {
        const container =
            scrollContainerRef.current as unknown as ScrollContainerRef;
        if (!container) return;

        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        const currentScroll = container.scrollTop;
        const moveDistance = clientHeight * 0.7;

        if (direction === "down") {
            const targetPosition = currentScroll + moveDistance;
            const maxScroll = scrollHeight - clientHeight;

            container.scrollTo({
                top: Math.min(targetPosition, maxScroll),
                behavior: "smooth",
            });
        } else {
            const targetPosition = currentScroll - moveDistance;

            container.scrollTo({
                top: Math.max(targetPosition, 0),
                behavior: "smooth",
            });
        }
    };

    const transpose = (semitones: number) => {
        if (!result?.body) return;
        result.body = result.body.map((row) => {
            return {
                chords: row.chords.map((chord) => {
                    return {
                        chordName: transposeChord(chord.chordName, semitones),
                        cols: chord.cols,
                        lyric: chord.lyric
                    };
                })
            };
        });
    }

    const capoChangeHandler = (value: CapoValue) => {
        const semitones = value - capo;
        transpose(semitones);
        setCapo(value);
    };

    const songKeyChangeHandler = (value: SongKeyValue) => {
        const semitones = value - songKey;
        transpose(semitones);
        setSongKey(value);
    };

    // キーボードイベントの処理を追加
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowUp") {
                handleScroll("up");
            } else if (event.key === "ArrowDown") {
                handleScroll("down");
            }
        };

        // イベントリスナーを追加
        window.addEventListener("keydown", handleKeyDown);

        // クリーンアップ関数でイベントリスナーを削除
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []); // 空の依存配列でマウント時のみ実行

    // カポの初期位置を設定
    useEffect(() => {
        if (result && isValidCapoValue(result.capo)) {
            setCapo(result.capo);
        }
    }, [result]);

    if (loading) {
        return (
            <Container
                sx={{ my: 4, display: "flex", justifyContent: "center" }}
            >
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ my: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!result || !result.body.length) {
        return (
            <Container sx={{ my: 4 }}>
                <Typography variant="h2">404</Typography>
                <Typography variant="h5">楽曲が見つかりません</Typography>
                <Button variant="contained" onClick={() => navigate("/")}>
                    ホームに戻る
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
            {/* メインコンテンツエリア */}
            <Box
                sx={{
                    flex: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* 固定ヘッダー */}
                <Paper
                    sx={{
                        p: 1.2,
                        borderRadius: 0,
                        boxShadow: 0,
                        borderBottom: 1,
                        borderColor: "divider",
                        bgcolor: "#f5f5f5",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "baseline",
                            mb: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: "1.25rem",
                                mr: 1,
                            }}
                        >
                            {result.title}
                        </Typography>
                        <Typography
                            sx={{
                                color: "text.secondary",
                                fontSize: "1rem",
                            }}
                        >
                            {result.artist}
                        </Typography>
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.625rem" }}
                    >
                        {result.credit}
                    </Typography>
                </Paper>

                {/* スクロール可能なコード譜エリア */}
                <Box
                    ref={scrollContainerRef}
                    sx={{
                        flex: 1,
                        overflow: "auto",
                        p: 3,
                        bgcolor: "#f5f5f5",
                        position: "relative",
                    }}
                >
                    {/* 左側のナビゲーションボタン */}
                    <Box
                        sx={{
                            position: "fixed",
                            left: 0,
                            top: "calc(64px + 72px)",
                            height: "calc(100vh - 64px - 96px)",
                            width: "40px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            bgcolor: "#f5f5f5",
                            p: 1,
                            zIndex: 1,
                        }}
                    >
                        <IconButton
                            onClick={() => handleScroll("up")}
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: "white",
                                "&:hover": {
                                    bgcolor: "grey.100",
                                },
                            }}
                        >
                            <KeyboardArrowUpIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => handleScroll("down")}
                            sx={{
                                width: 40,
                                height: 40,
                                bgcolor: "white",
                                "&:hover": {
                                    bgcolor: "grey.100",
                                },
                            }}
                        >
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    </Box>

                    {/* コード譜のサンプル */}
                    <ChordSheetBox
                        className="chord-sheet-box"
                        sx={{ ml: 6 }}
                        dangerouslySetInnerHTML={{
                            __html: buildSongDetailHtml(result)
                        }}
                    />
                </Box>
            </Box>

            {/* 右側のサイドバー */}
            <Paper
                sx={{
                    width: 240,
                    p: 2,
                    borderRadius: 0,
                    borderLeft: 1,
                    borderColor: "divider",
                    bgcolor: "#f5f5f5",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <PulldownContainer
                    label="カポ"
                    value={capo}
                    options={capoValueOptions}
                    text={getCapoValueText}
                    onChange={capoChangeHandler}
                />
                <PulldownContainer
                    label="曲のキー"
                    value={songKey}
                    options={songKeyValueOptions}
                    text={getSongKeyValueText}
                    onChange={songKeyChangeHandler}
                />
                {/* キャンバスエリア */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box
                        sx={{
                            width: "100%",
                            paddingBottom: "100%",
                            position: "relative",
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                            mb: 1,
                        }}
                    />
                    <Typography variant="caption" sx={{ textAlign: "center" }}>
                        コードをクリックすると、ここに押さえ方が表示されます
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};
