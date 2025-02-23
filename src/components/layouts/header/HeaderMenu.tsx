import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderMenuProps {
    onClick?: () => void;
}

export const HeaderMenu = ({ onClick }: HeaderMenuProps) => {
    return (
        <IconButton color="inherit" onClick={onClick}>
            <MenuIcon />
        </IconButton>
    );
};
