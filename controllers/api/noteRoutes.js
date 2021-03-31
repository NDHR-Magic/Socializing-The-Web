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
});

router.post('/', async (req, res) => {
    try {
        const noteData = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id,

        });

        res.status(200).json(noteData)
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add song to notes
router.post("/addSong", async (req, res) => {
    try {
        const { songName, noteId } = req.body

        const songData = await Song.findOne({
            where: {
                name: songName
            }
        });

        const noteData = await Notes.findOne({
            where: {
                id: noteId
            }
        });

        if (!songData) {
            res.status(404).json({ message: "Could not find song" });
            return;
        }

        await songData.addNotes(noteData);
        const check = await songData.hasNotes(noteData);
        console.log(check);

        res.status(200).json({ message: "Successfully added song to note" });

    } catch (e) {
        res.status(500).json(e);
    }
})

router.put('/:id', async (req, res) => {

    try {
        const noteX = await Notes.update(
            {
                title: req.body.title,
                description: req.bodydescription,
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

// route to delete Note

router.delete("/:id", async (req, res) => {
    try {
        const noteDelete = await Notes.destroy(
            {
                where: {
                    id: req.params.id
                },
            });
        res.status(200).json(noteDelete)
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
