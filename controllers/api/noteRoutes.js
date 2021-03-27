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
