import { ListItem } from "@mui/material";
import { ReactNode } from "react";
import { Path, Link as RouterLink } from "react-router-dom";

interface NormalListItemProps {
    children: ReactNode,
    index: number,
    key: string | number | bigint | null | undefined;
    to: string | Partial<Path>;
}

// スタイルを生成する関数
const getStyles = (index: number) => ({
    bgcolor: (index + 1) % 2 === 0 ? "rgba(0, 0, 0, 0.02)" :  "inherit",
    "&:hover": {
        bgcolor: "rgba(0, 0, 0, 0.04)"
    },
    textDecoration: "none",
    color: "inherit",
});

export const NormalListItem = ({ 
    children,
    index,
    key,
    to
}: NormalListItemProps) => {
    return(
        <ListItem
            key={key}
            component={RouterLink}
            to={to}
            divider
            sx={getStyles(index)}
        >
            {children}
        </ListItem>
    );
}