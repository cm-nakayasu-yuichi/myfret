import {
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { getSearchTypeOptions } from "../../../types";

interface HeaderSearchTypeProps {
    value: string;
    onChange: (value: string) => void;
}

export const HeaderSearchType = ({
    value,
    onChange,
}: HeaderSearchTypeProps) => {
    const onChangeHandler = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <FormControl
            size="small"
            sx={{
                minWidth: 120,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            }}
        >
            <Select value={value} onChange={onChangeHandler}>
                {getSearchTypeOptions().map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
