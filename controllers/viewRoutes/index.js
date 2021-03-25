const router = require("express").Router();
const { User, Song, Tag, Notes } = require("../../models");

// Get home page
router.get("/", (req, res) => {
    res.render("home", {
        loggedIn: req.session.loggedIn
    });
});

router.get("/login", (req, res) => {
    res.render("login", {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id
    });
});

router.get("/signup", (req, res) => {
    res.render("signup", {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id
    });
});

router.get("/noteForm", (req, res) => {
    res.render("noteForm", {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id
    });
});

router.get("/playlist", (req, res) => {
    res.render("playlist", {
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id
    });
});

router.get("/member", async (req, res) => {
    try {
        const userData = await User.findByPk(1);
        // Stuff for friends notes later.

        const userFriendNum = await userData.countFriend();

        const user = await userData.get({ plain: true });

        console.log(userFriendNum);

        res.render("memberHome", {
            user,
            userFriendNum,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/friends", async (req, res) => {
    try {
        // change to req.session.user_id after login is finished
        const user = await User.findByPk(1);

        const userFriends = await user.getFriend();

        const friends = userFriends.map(friend => friend.get({ plain: true }));

        res.render("friendsList", {
            friends,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;