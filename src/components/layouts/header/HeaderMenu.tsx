import { Box, Divider, IconButton, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { THEME, useThemeContext } from "../../../contexts/theme/ThemeContext";

export const HeaderMenu = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { mode, toggleTheme } = useThemeContext();
    const open = Boolean(anchorEl);
  
    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
  
    const onClose = () => {
        setAnchorEl(null);
    };

    const onThemeChange = (
        _event: React.MouseEvent<HTMLElement>,
        newTheme: THEME,
    ) => {
        if (newTheme !== null) {
            toggleTheme(newTheme);
        }
    };

    const onClickCodbbook = () => {
        navigate('/codebook');
        onClose();
    };
    
    const onClickHelp = () => {
        navigate('/help');
        onClose();
    };

    return (
        <>
            <IconButton color="inherit" onClick={onClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: {
                        width: '250px',
                    },
                }}
            >
                <MenuItem 
                    sx={{ 
                        py: 2,
                        '& .MuiTouchRipple-root': {
                            display: 'none',
                        },
                        '&:hover': {
                            backgroundColor: 'transparent',
                            cursor: 'default',
                        }, 
                    }}
                >
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>テーマ</Typography>
                        <ToggleButtonGroup
                            value={mode}
                            exclusive
                            onChange={onThemeChange}
                            aria-label="theme selection"
                            fullWidth
                            size="small"
                        >
                            <ToggleButton value="light">
                                ライト
                            </ToggleButton>
                            <ToggleButton value="dark">
                                ダーク
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem onClick={onClickCodbbook} sx={{ py: 2 }}>
                    <Typography variant="body1">コードブック</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={onClickHelp} sx={{ py: 2 }}>
                    <Typography variant="body1">ヘルプ</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};
