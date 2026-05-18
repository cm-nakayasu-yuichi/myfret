import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routeElement } from "../utils/routeElement";
import {
    HomePage,
    SearchSongsPage,
    NotFoundPage,
    SearchArtistsPage,
    RankingSongsPage,
    RankingArtistsPage,
    ArtistPage,
    SongPage,
    CodebookPage,
    HelpPage,
    TestPage,
} from "../components/pages";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={routeElement(<HomePage />)} />
                <Route
                    path="/artist/:name"
                    element={routeElement(<ArtistPage />)}
                />
                <Route
                    path="/artist/:name/:page"
                    element={routeElement(<ArtistPage />)}
                />
                <Route
                    path="/song/:songId"
                    element={routeElement(<SongPage />)}
                />
                <Route
                    path="/search/songs/:keyword"
                    element={routeElement(<SearchSongsPage />)}
                />
                <Route
                    path="/search/artists/:keyword"
                    element={routeElement(<SearchArtistsPage />)}
                />
                <Route
                    path="/search/artists/:keyword/:page"
                    element={routeElement(<SearchArtistsPage />)}
                />
                <Route
                    path="/ranking/songs"
                    element={routeElement(<RankingSongsPage />)}
                />
                <Route
                    path="/ranking/songs/:page"
                    element={routeElement(<RankingSongsPage />)}
                />
                <Route
                    path="/ranking/artists"
                    element={routeElement(<RankingArtistsPage />)}
                />
                <Route
                    path="/ranking/artists/:page"
                    element={routeElement(<RankingArtistsPage />)}
                />
                <Route
                    path="/codebook"
                    element={routeElement(<CodebookPage />)}
                />
                <Route
                    path="/help"
                    element={routeElement(<HelpPage />)}
                />
                <Route
                    path="/test"
                    element={routeElement(<TestPage />, true)}
                />
                <Route
                    path="*"
                    element={routeElement(<NotFoundPage />, true)}
                />
            </Routes>
        </Router>
    );
};
