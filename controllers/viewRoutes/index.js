const router = require("express").Router();

// Get home page
router.get("/", (req, res) => {
    res.render("home", {
        loggedIn: req.session.loggedIn
    })
});

router.get("/login", (req,res)=> {
    res.render("login", {
        loggedIn: req.session.loggedIn
    })
});

router.get("/signup", (req,res)=> {
    res.render("signup", {
        loggedIn: req.session.loggedIn
    })
});


module.exports = router;