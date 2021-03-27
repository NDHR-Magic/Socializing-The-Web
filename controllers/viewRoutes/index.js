const router = require("express").Router();
const { User, Song, Tag, Notes, Playlist } = require("../../models");
const SongPlaylist = require("../../models/Song-playlist");

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

router.get("/member", async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id);
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
        const user = await User.findByPk(req.session.user_id);

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
});

// Get user profiles (not for loggedIn user's own profile but a generic page for anyones that you search).
router.get("/profile/:id", async (req, res) => {
    try {
        const userInfo = await User.findByPk(req.session.user_id);

        const otherUserInfo = await User.findOne({
            where: { id: req.params.id },
            attributes: { exclude: ['password', 'email', 'last_name'] }
        });

        //check if user and otherUser are friends.
        const areFriends = await userInfo.hasFriend(otherUserInfo);

        // Get number of friends for otherUser
        const otherUserFriendNum = await otherUserInfo.countFriend();

        const user = userInfo.get({ plain: true });
        const otherUser = otherUserInfo.get({ plain: true });

        // Check if this page beglongs to the user
        let sameUser = false;
        if (user.username === otherUser.username) {
            sameUser = true;
        }

        res.render("allProfiles", {
            otherUser,
            areFriends,
            otherUserFriendNum,
            sameUser,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/playlists", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            },
            include: {
                model: Playlist
            }
        });
        const user = userData.get({ plain: true });
        console.log(user)
        res.render("playlists", {
            user,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

// get user Notes(profile page) there will be a div and well slap only this persons notes, and since its our 
// router.get("userProfile", async (req, res) => {
//     try {
//         const userData = await User.findOne({
//             where: {
//                 id: req.session.user_id
//             },
//             include: {
//                 model: Playlist
//             }
//         });
//         const user = userData.get({ plain: true });
//         console.log(user)
//         res.render("playlists", {
//             user,
//             loggedIn: req.session.loggedIn,
//             user_id: req.session.user_id
//         })
//     } catch (e) {
//         res.status(500).json(e);
//     }
// });


module.exports = router;