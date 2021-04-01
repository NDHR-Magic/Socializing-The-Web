const router = require("express").Router();
const { authCheck } = require("../../middlewares");
const { User, Song, Tag, Notes, Playlist, Friend } = require("../../models");
const SongPlaylist = require("../../models/Song-playlist");
const FriendClass = require("../../utils/classes");

router.param("userId", async (req, res, next, id) => {
    const userData = await User.findByPk(id);
    req.user = userData;
    next();
});

// Get home page
router.get("/", (req, res) => {
    res.render("home", {
        loggedIn: req.session.loggedIn,
        requests: req.requests
    });
});
// Login page
router.get("/login", (req, res) => {
    res.render("login", {
        loggedIn: req.session.loggedIn,
        requests: req.requests,
        user_id: req.session.user_id
    });
});
// Sign up page
router.get("/signup", (req, res) => {
    res.render("signup", {
        loggedIn: req.session.loggedIn,
        requests: req.requests,
        user_id: req.session.user_id
    });
});
// Create note form
router.get("/noteForm", authCheck, (req, res) => {
    res.render("noteForm", {
        loggedIn: req.session.loggedIn,
        requests: req.requests,
        user_id: req.session.user_id
    });
});

// View specific note
router.get("/viewNote/:id", authCheck, async (req, res) => {
    try {
        const noteData = await Notes.findByPk(req.params.id);

        if (!noteData) {
            res.status(404).json({ message: "Could not find note" });
        }

        const note = noteData.get({ plain: true });

        res.render("viewNote", {
            note,
            loggedIn: true,
            requests: req.requests,
            user_id: req.session.user_id
        });
    } catch (e) {
        res.status(500).json(e);
    }
})

// member page
router.get("/member", authCheck, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id);

        //get friend notes
        const userFriendNotes = await userData.getFriend();
        const friendList = [];

        for (const friend of userFriendNotes) {
            // Make friend class
            const newFriend = new FriendClass(friend.username);
            // Get the notes for this friend. Order by newest and limit 2 notes.
            const note = await friend.getNotes({
                order: [
                    ['created_at', "DESC"]
                ],
                limit: 1
            });
            // Get plain version of each note.
            if (note.length > 0) {
                const plainNote = note[0].get({ plain: true });
                // Add note to friend note array
                newFriend.addNote(plainNote);
                // Add friend to friendList array
                friendList.push(newFriend);
            }
        }
        //Sort friends list
        const sortedFriends = friendList.slice().sort((a, b) => b.note.created_at - a.note.created_at);
        // Get only top 6 of friendList.
        const friendsToDisplay = sortedFriends.splice(0, 6);
        const friendPostsLength = friendsToDisplay.length;

        const userFriendNum = await userData.countFriend();

        const user = await userData.get({ plain: true });

        res.render("memberHome", {
            user,
            userFriendNum,
            friendsToDisplay,
            friendPostsLength,
            requests: req.requests,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        });
    } catch (e) {
        res.status(500).json(e);
    }
});
// View your friend list
router.get("/friends", authCheck, async (req, res) => {
    try {
        // change to req.session.user_id after login is finished
        const user = await User.findByPk(req.session.user_id);

        const userFriends = await user.getFriend();

        const friends = userFriends.map(friend => friend.get({ plain: true }));

        res.render("friendsList", {
            friends,
            loggedIn: req.session.loggedIn,
            requests: req.requests,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

// Get user profiles (not for loggedIn user's own profile but a generic page for anyones that you search).
router.get("/profile/:userId", authCheck, async (req, res) => {
    try {
        const userInfo = await User.findByPk(req.session.user_id);

        const otherUserInfo = req.user;

        //check if user and otherUser are friends.
        const areFriends = await userInfo.hasFriend(otherUserInfo);

        // Get number of friends for otherUser
        const otherUserFriendNum = await otherUserInfo.countFriend();

        // Check if you have a pending friend request for them / from them.
        const userRequested = await otherUserInfo.hasRequester(userInfo);
        const otherRequested = await userInfo.hasRequester(otherUserInfo);

        let requested = false;
        if (userRequested || otherRequested) {
            requested = true;
        }

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
            requested,
            requests: req.requests,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        });
    } catch (e) {
        res.status(500).json(e);
    }
});
// Page for displaying all songs
router.get("/songs", authCheck, async (req, res) => {
    try {
        const songData = await Song.findAll({

        });
        const songs = songData.map(song => song.get({ plain: true }));
        console.log(songs)

        res.render("songSearch", {
            songs,
            loggedIn: req.session.loggedIn,
            requests: req.requests,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).json(e);
    }
});
// Page for getting a specific song
router.get("/songs/:id", authCheck, async (req, res) => {
    const getSong = await Song.findByPk(req.params.id);

    const song = getSong.get({ plain: true });

    res.render("songPage", {
        song,
        requests: req.requests,
        loggedIn: req.session.loggedIn,
        user_id: req.session.user_id
    })
})
// Page to display playlist
router.get("/playlists", authCheck, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            },
            include: {
                model: Playlist,
            }
        });
        const user = userData.get({ plain: true });
        console.log(user)
        res.render("playlists", {
            user,
            loggedIn: req.session.loggedIn,
            requests: req.requests,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/playlists/:id", authCheck, async (req, res) => {
    try {
        const playlistData = await Playlist.findByPk(req.params.id);
        const songsData = await playlistData.getSongs();

        const songs = songsData.map(song => song.get({ plain: true }));
        const playlists = playlistData.get({ plain: true });

        res.render("playlistID", {
            playlists,
            songs,
            requests: req.requests,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/friendRequests", authCheck, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id);

        const userRequests = await userData.getRequesters();

        const friendRequests = userRequests.map(request => request.get({ plain: true }));

        res.render("friendRequests", {
            friendRequests,
            requests: req.requests,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).json(e);
    }
});
// chat page
router.get("/chat", authCheck, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            },
            attributes: ['username']
        });

        const user = userData.get({ plain: true });

        res.render("chat", {
            user,
            loggedIn: req.session.loggedIn,
            requests: req.requests,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/privateMessages", authCheck, async (req, res) => {
    try {
        const currrentUser = await User.findByPk(req.session.user_id);

        const receiversData = await currrentUser.getReceiver();

        const receivers = receiversData.map(receiver => receiver.get({ plain: true }));

        res.render("privateMessages", {
            receivers,
            loggedIn: req.session.loggedIn,
            requests: req.requests,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

// get user Notes(profile page) there will be a div and well slap only this persons notes, and since its outr  

router.get("/userProfile", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            },
            include: {
                model: Notes,
            }
        });
        const user = userData.get({ plain: true });

        res.render("userProfile", {
            user,
            loggedIn: req.session.loggedIn,
            requests: req.requests,
            user_id: req.session.user_id
        })
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get("/updatepassword", authCheck, (req, res) => {
    res.render("updatePassword", {
        loggedIn: req.session.loggedIn,
        requests: req.requests,
        user_id: req.session.user_id
    });
});



module.exports = router;