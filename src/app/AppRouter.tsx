import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routeElement } from "../utils/routeElement";
import {
    HomeRoute,
    SearchSongsRoute,
    NotFoundRoute,
    SearchArtistsRoute,
    RankingSongsRoute,
    RankingArtistsRoute,
    ArtistRoute,
    SongRoute,
    CodebookRoute,
    HelpRoute,
    TestRoute,
} from "./routes";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={routeElement(<HomeRoute />)} />
                <Route
                    path="/artist/:name"
                    element={routeElement(<ArtistRoute />)}
                />
                <Route
                    path="/artist/:name/:page"
                    element={routeElement(<ArtistRoute />)}
                />
                <Route
                    path="/song/:songId"
                    element={routeElement(<SongRoute />)}
                />
                <Route
                    path="/search/songs/:keyword"
                    element={routeElement(<SearchSongsRoute />)}
                />
                <Route
                    path="/search/artists/:keyword"
                    element={routeElement(<SearchArtistsRoute />)}
                />
                <Route
                    path="/search/artists/:keyword/:page"
                    element={routeElement(<SearchArtistsRoute />)}
                />
                <Route
                    path="/ranking/songs/"
                    element={routeElement(<RankingSongsRoute />)}
                />
                <Route
                    path="/ranking/songs/:page"
                    element={routeElement(<RankingSongsRoute />)}
                />
                <Route
                    path="/ranking/artists/"
                    element={routeElement(<RankingArtistsRoute />)}
                />
                <Route
                    path="/ranking/artists/:page"
                    element={routeElement(<RankingArtistsRoute />)}
                />
                <Route
                    path="/codebook"
                    element={routeElement(<CodebookRoute />)}
                />
                <Route
                    path="/help"
                    element={routeElement(<HelpRoute />)}
                />
                <Route
                    path="/test"
                    element={routeElement(<TestRoute />, true)}
                />
                <Route
                    path="*"
                    element={routeElement(<NotFoundRoute />, true)}
                />
            </Routes>
        </Router>
    );
};
