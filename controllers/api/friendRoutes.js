const router = require("express").Router();
const { User, Friend } = require("../../models");

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
})

module.exports = router;