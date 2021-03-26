const router = require("express").Router();
const { Song, Tag, Notes, User } = require("../../models");


router.get("/", async (req, res) => {
    const noteResults = await Notes.findAll({
        include: {
            model: User
        }
    });
    console.log(noteResults);

    const notes = noteResults.map(note => note.get({ plain: true }))
    res.json(notes);
})



router.post('/', async (req, res) => {
    try {
        const noteData = await Notes.create({
            // id: req.body.id,
            title: req.body.title,
            // artist: req.body.artist,
            // album: req.body.album,
            description: req.body.description,
            // playlist_id: req.body.playlist_id,
            user_id: req.session.user_id,
            // song_id: req.body.song_id,
            // tag_id: req.body.tag_id,

        });
        res.status(200).json(noteData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {

    try {
        const noteX = await Notes.update(
            {
                id: req.body.id,
                title: req.body.title,
                artist: req.body.artist,
                album: req.body.album,
                description: req.bodydescription,
                playlist_id: req.body.playlist_id,
                user_id: req.body.user_id,
                song_id: req.body.song_id,
                tag_id: req.body.tag_id,
            },
            {
                where: {
                    id: req.params.id,
                },
            });

        res.status(200).json(noteX);
    } catch (err) {
        res.status().json(err);
    };
});


module.exports = router;
