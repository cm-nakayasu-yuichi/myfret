import { Paper } from "@mui/material";
import { ReactNode } from "react";
import { LoadingContent } from "./LoadingContent";
import { ErrorContent } from "./ErrorContent";
import { EmptyContent } from "./EmptyContent";

interface ListContainerProps {
    children: ReactNode;
    empty: boolean;
    loading: boolean;
    error: string | null;
}

export const ListContainer = ({ children, empty, loading, error }: ListContainerProps) => {
    if (loading) {
        return(
            <LoadingContent/>
        );
    }
    if (empty) {
        return(
            <EmptyContent/>
        );
    }
    if (error) {
        return(
            <ErrorContent/>
        );
    }
    return(
        <Paper sx={{ mb: 2 }}>
            {children}
        </Paper>
    );
}