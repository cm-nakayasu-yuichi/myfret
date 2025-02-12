import { TextField } from "@mui/material";
import { getSearchTypePlaceholder } from "../../../types";

interface HeaderSearchInputProps {
    value: string;
    type: string;
    onChange: (value: string) => void;
}

export const HeaderSearchInput = ({
    value,
    type,
    onChange,
}: HeaderSearchInputProps) => {
    return (
        <TextField
            size="small"
            placeholder={getSearchTypePlaceholder(type)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            sx={{
                flex: 1,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
        />
    );
};
