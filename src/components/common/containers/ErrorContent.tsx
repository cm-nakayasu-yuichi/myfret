import { List, ListItem } from "@mui/material";

export const ErrorContent = () => {
    return(
        <List sx={{ p: 0 }}>
            <ListItem
                sx={{
                    bgcolor: "inherit",
                    textDecoration: "none",
                    color: "inherit",
                }}
            >
                取得に失敗しました
            </ListItem>
        </List>
    );
}