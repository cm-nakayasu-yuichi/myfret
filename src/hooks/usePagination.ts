import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildPaginationUrl } from "../utils/buildPaginationUrl";

interface PaginationConfig {
    itemsPerPage: number;
    baseUrl: string;
    currentUrlPage?: string;
    query?: string;
}

interface PaginationResult<T> {
    currentItems: T[];
    currentPage: number;
    totalPages: number;
    handlePageChange: (
        event: React.ChangeEvent<unknown> | null,
        newPage: number,
    ) => void;
}

export function usePagination<T>(
    items: T[],
    config: PaginationConfig,
): PaginationResult<T> {
    const { itemsPerPage, baseUrl, currentUrlPage, query } = config;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(
        currentUrlPage ? parseInt(currentUrlPage) : 1,
    );

    // URLのページパラメータが変更されたら現在のページを更新
    useEffect(() => {
        if (currentUrlPage) {
            setCurrentPage(parseInt(currentUrlPage));
        } else {
            setCurrentPage(1);
        }
    }, [currentUrlPage]);

    // キーボードイベントの処理
    useEffect(() => {
        const totalPages = Math.ceil(items.length / itemsPerPage);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft" && currentPage > 1) {
                handlePageChange(null, currentPage - 1);
            } else if (event.key === "ArrowRight" && currentPage < totalPages) {
                handlePageChange(null, currentPage + 1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentPage, items.length, itemsPerPage]);

    const handlePageChange = (
        event: React.ChangeEvent<unknown> | null,
        newPage: number,
    ) => {
        const url = buildPaginationUrl(baseUrl, query, newPage);
        navigate(url);
        setCurrentPage(newPage);
    };

    // ページネーション用の計算
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    return {
        currentItems,
        currentPage,
        totalPages,
        handlePageChange,
    };
}
