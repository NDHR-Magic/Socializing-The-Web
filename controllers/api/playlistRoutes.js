const router = require("express").Router();
const { Playlist } = require("../../models");

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

module.exports = router;