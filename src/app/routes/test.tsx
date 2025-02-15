import { Container } from "@mui/material";
import { transposeChord } from "../../types";

export const TestRoute = () => {

    return (
        <Container sx={{ my: 4 }} >
            {transposeChord("C#", 3)}<br />
            {transposeChord("B♭", 10)}<br />
            {transposeChord("A♭sus4/E♭", 0)}<br />
        </Container>
    );
};
