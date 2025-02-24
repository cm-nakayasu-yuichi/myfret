import { Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { HeaderSearchInput } from "./HeaderSearchInput";
import { HeaderSearchType } from "./HeaderSearchType";
import { useNavigate } from "react-router-dom";
import { getSearchUrl } from "../../../types";
import { useState } from "react";

export const HeaderSearch = () => {
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('song');
    const navigate = useNavigate();

    const onClickHandler = () => {
        const keyword = searchText.trim();
        if (!keyword) {
            return;
        }

        const url = getSearchUrl(keyword, searchType);
        if (!url) {
            return;
        }

        navigate(url);
    };

    return (
        <Paper
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "500px",
                mr: 2,
            }}
        >
            <HeaderSearchInput
                value={searchText}
                type={searchType}
                onChange={setSearchText}
            />
            <HeaderSearchType value={searchType} onChange={setSearchType} />
            <IconButton onClick={onClickHandler}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};
