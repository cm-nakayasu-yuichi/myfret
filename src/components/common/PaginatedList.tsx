import { Box, Pagination, PaginationItem, List } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { buildPaginationUrl } from "../../utils/buildPaginationUrl";

interface PaginatedListProps<T> {
    items: T[];
    currentPage: number;
    totalPages: number;
    onPageChange: (
        event: React.ChangeEvent<unknown> | null,
        page: number,
    ) => void;
    baseUrl: string;
    query?: string;
    renderItem: (item: T, index: number) => React.ReactNode;
}

export function PaginatedList<T>({
    items,
    currentPage,
    totalPages,
    onPageChange,
    baseUrl,
    query,
    renderItem,
}: PaginatedListProps<T>) {
    return (
        <>
            <Box
                sx={{
                    p: 2,
                    borderBottom: 1,
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    size="small"
                    onChange={onPageChange}
                    renderItem={(item) => (
                        <PaginationItem
                            component={RouterLink}
                            to={buildPaginationUrl(baseUrl, query, item.page)}
                            {...item}
                            sx={{
                                border: 1,
                                borderColor: "divider",
                                borderRadius: 1,
                            }}
                        />
                    )}
                />
            </Box>
            <List sx={{ p: 0 }}>
                {items.map((item, index) => renderItem(item, index))}
            </List>
        </>
    );
}
