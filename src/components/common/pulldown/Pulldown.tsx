import { MenuItem, Select } from "@mui/material";

export interface PulldownProps<T extends number> {
    label: string,
    value: T;
    options: T[];
    text: (value: T) => string;
    onChange: (value: T) => void;
}

export const Pulldown = <T extends number>({
    label,
    value,
    options,
    text,
    onChange
}: PulldownProps<T>) => {
    return (
        <Select<T>
            label={label}
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
        >
            {options.map((option) => (
                <MenuItem
                    key={option}
                    value={option}
                >
                    {text(option)}
                </MenuItem>
            ))}
        </Select>
    );
};