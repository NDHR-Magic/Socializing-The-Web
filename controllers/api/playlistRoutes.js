const router = require("express").Router();
const { Playlist, User, Song } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const playlistResults = await Playlist.findAll({
            include: {
                model: User,
            }
        });

        const playlists = playlistResults.map(playlist => playlist.get({ plain: true }));
        res.json(playlists)
        console.log(playlists);

        res.status(200).json(playlists);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.post('/', async (req, res) => {
    try {
        const newPlaylist = await Playlist.create({
            ...req.body,
        });

        res.status(200).json(newPlaylist);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/playlist-test', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(2);
        const song = await Song.findByPk(3)

        await playlist.addSong(song)
        const playlistSongs = await playlist.getSongs();
        res.json(playlistSongs)

    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;