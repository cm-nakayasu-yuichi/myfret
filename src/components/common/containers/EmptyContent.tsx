import { List, ListItem } from "@mui/material";

export const EmptyContent = () => {
    return(
        <List sx={{ p: 0 }}>
            <ListItem
                sx={{
                    bgcolor: "inherit",
                    textDecoration: "none",
                    color: "inherit",
                }}
            >
                データがありませんでした
            </ListItem>
        </List>
    );
}