import { List } from "@mui/material";
import { ReactNode } from "react";

interface NormalListProps {
    children: ReactNode
}

export const NormalList = ({ children }: NormalListProps) => {
    return (
        <List sx={{ p: 0 }}>
            {children}
        </List>
    );
}