const router = require("express").Router();
const { User, Friend } = require("../../models");

router.param("userId", async (req, res, next, id) => {
    const userData = await User.findByPk(id);
    req.user = userData;
    next();
});

router.post("/request/:userId", async (req, res) => {
    try {
        const requester = await User.findByPk(5);
        const requestee = req.user;

        // Check if already friends
        const checkFriend = await requestee.hasFriend(requester);
        // Check if already requested
        const checkRequested = await requestee.hasRequester(requester);

        if (!checkFriend && !(requester.username === requestee.username) && !checkRequested) {
            requestee.addRequester(requester);
        } else {
            res.status(412).json("Could not add user");
            return;
        }

        res.status(200).json("Successfully requested");
    } catch (e) {
        res.status(500).json(e);
    }
});
// Delete friend request
router.delete("/request/:userId", async (req, res) => {
    try {
        const requester = req.user;
        const requestee = await User.findByPk(req.session.user_id);

        const checkRequest = await requestee.hasRequester(requester);

        let requests;
        if (checkRequest) {
            requestee.removeRequester(requester);
            requests = await requestee.getRequesters();
        }

        res.status(200).json({ requests, message: "Successfully declined friend request" });

    } catch (e) {
        res.status(500).json(e);
    }
});
// Unfriend user
router.delete("/friend/:userId", async (req, res) => {
    try {
        const currentUser = await User.findByPk(req.session.user_id);
        const friendData = req.user;

        // Check if actually friends
        const checkFriend = await currentUser.hasFriend(friendData);

        let friend;
        if (checkFriend) {
            currentUser.removeFriend(friendData);
            friend = friendData.get({ plain: true });
        }

        res.status(200).json("Successfully removed " + friend.username + " from your friends list.");

    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;