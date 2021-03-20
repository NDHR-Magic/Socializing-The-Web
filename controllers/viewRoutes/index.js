const router = require("express").Router();

// Get home page
router.get("/", (req, res) => {
    res.render("home", {
        loggedIn: req.session.loggedIn
    })
});


module.exports = router;