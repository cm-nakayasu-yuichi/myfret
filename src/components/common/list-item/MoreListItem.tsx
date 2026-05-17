import { ListItem, useTheme } from "@mui/material";
import { Path, Link as RouterLink } from "react-router-dom";

interface MoreListItemProps {
    to: string | Partial<Path>
}

export const MoreListItem = ({ to }: MoreListItemProps) => {
    const theme = useTheme();

    return(
        <ListItem
            component={RouterLink}
            to={to}
            divider
            sx={{
                justifyContent: "center",
                color: theme.palette.text.primary,
                textDecoration: "none",
                py: 2,
                "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.1)",
                },
            }}
        >
            もっと見る
        </ListItem>
    );
}