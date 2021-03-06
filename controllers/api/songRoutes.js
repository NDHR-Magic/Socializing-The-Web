const router = require("express").Router();
const { Song, Tag, SongTag, Playlist } = require("../../models");
const SongPlaylist = require("../../models/Song-playlist");

router.get("/", async (req, res) => {
    try {
        const songResults = await Song.findAll({
            include: [{
                model: Tag,
            }]
        });

        const songs = songResults.map(song => song.get({ plain: true }));

        console.log(songs);

        res.status(200).json(songs);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const oneSong = await Song.findOne(
            {
                where: {
                    id: req.params.id
                }
            });
        res.status(200).json(oneSong);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.post('/addtoPlaylist/:id', async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id)
        const playlist = await Playlist.findOne({
            where: {
                id: req.body.playlistID
            }
        });

        //check if song already in playlist.
        const isInPlaylist = await playlist.hasSong(song);

        if (isInPlaylist) {
            res.status(304).json({ message: "Song alrready in playlist" });
            return;
        }

        await playlist.addSong(song)
        const playlistSongs = await playlist.getSongs();

        res.status(200).json(playlistSongs);
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;