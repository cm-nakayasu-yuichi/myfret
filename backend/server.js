const express = require('express');
const cors = require('cors');
const homeInfoRoutes = require('./implements/home-info');
const artistRoutes = require('./implements/artist');
const songRoutes = require('./implements/song');
const searchSongsRoutes = require('./implements/search-songs');
const searchArtistsRoutes = require('./implements/search-artists');
const rankingSongsRoutes = require('./implements/ranking-songs');
const rankingArtistsRoutes = require('./implements/ranking-artists');

const app = express();
app.use(cors());

// ルートの登録
app.use('/api/home-info', homeInfoRoutes);
app.use('/api/artist', artistRoutes);
app.use('/api/song', songRoutes);
app.use('/api/search/songs', searchSongsRoutes);
app.use('/api/search/artists', searchArtistsRoutes);
app.use('/api/ranking/songs', rankingSongsRoutes);
app.use('/api/ranking/artists', rankingArtistsRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`サーバーが起動しました - http://localhost:${PORT}`);
});