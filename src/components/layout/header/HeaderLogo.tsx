import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const HeaderLogo = () => {
    return (
        <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                    opacity: 0.8,
                },
            }}
        >
            myfret
        </Typography>
    );
};
