const router = require("express").Router();
const { Song, Tag, SongTag } = require("../../models");

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

module.exports = router;