const router = require("express").Router();
const { Playlist, User, Song } = require("../../models");


router.get("/", async (req, res) => {
    try {
        const playlistResults = await Playlist.findAll({
            include: {
                model: User,
            },
            where: {
                user_id: req.session.user_id
            }
        });

        const playlists = playlistResults.map(playlist => playlist.get({ plain: true }));
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

router.delete('/:id', async (req, res) => {
    try {
        const deletePlaylist = await Playlist.destroy(
            {
                where: {
                    id: req.params.id
                }
            });
        res.status(200).json(deletePlaylist)
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;