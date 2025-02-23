import { ListItem } from "@mui/material";
import { Path, Link as RouterLink } from "react-router-dom";

interface MoreListItemProps {
    to: string | Partial<Path>
}

export const MoreListItem = ({ to }: MoreListItemProps) => {
    return(
        <ListItem
            component={RouterLink}
            to={to}
            divider
            sx={{
                justifyContent: "center",
                color: "primary.main",
                textDecoration: "none",
                py: 2,
                "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                },
            }}
        >
            もっと見る
        </ListItem>
    );
}