import { FormControl, InputLabel } from "@mui/material";
import { Pulldown, PulldownProps } from "./Pulldown";

export const PulldownContainer = <T extends number>({
    label,
    value,
    options,
    text,
    onChange
}: PulldownProps<T>) => {
    return (
        <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>{label}</InputLabel>
            <Pulldown
                label={label}
                value={value}
                options={options}
                text={text}
                onChange={onChange}
            />
        </FormControl>
    );
};