const router = require("express").Router();
const { Song, Tag, Notes, User } = require("../../models");


router.get("/",async(req,res)=>{
    const noteResults = await Notes.findAll({
        include:{
            model: User
        }
    });
    console.log(noteResults);

    const notes = noteResults.map(note => note.get({plain:true}))
    res.json(notes);
})



module.exports = router;
