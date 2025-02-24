import { AppBar, Toolbar, Box } from "@mui/material";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderMenu } from "./HeaderMenu";

export const Header = () => {
    return (
        <AppBar position="static" sx={{ bgcolor: "grey.800" }}>
            <Toolbar>
                <HeaderLogo />
                <Box sx={{ flexGrow: 1 }} />
                <HeaderSearch />
                <HeaderMenu />
            </Toolbar>
        </AppBar>
    );
};
