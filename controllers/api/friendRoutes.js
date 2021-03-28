const router = require("express").Router();
const { User, Friend } = require("../../models");

router.param("userId", async (req, res, next, id) => {
    const userData = await User.findByPk(id);
    req.user = userData;
    next();
});

router.get("/", async (req, res) => {
    try {
        const user = await User.findByPk(1);
        const user2 = await User.findByPk(2);
        const user3 = await User.findByPk(3);
        const user4 = await User.findByPk(4);
        const user5 = await User.findByPk(5);

        await user.addFriend([user2, user4]);
        await user3.addFriend([user5, user2]);

        const userFriends = await user.getFriend();

        res.json(userFriends);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post("/request/:userId", async (req, res) => {
    try {
        const requester = await User.findByPk(5);
        const requestee = req.user;

        const check = await requestee.hasFriend(requester);

        if (!check && !(requester.username === requestee.username)) {
            requestee.addRequester(requester);
        }

        res.status(200).json("Successfully requested");
    } catch (e) {
        res.status(500).json(e);
    }
});

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

module.exports = router;