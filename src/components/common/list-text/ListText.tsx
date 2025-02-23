import { Typography } from "@mui/material";

interface ListTextProps {
    text: string
}

export const ListText = ({ text }: ListTextProps) => {
    return(
        <Typography sx={{ fontWeight: "bold" }}>{text}</Typography>
    );
}