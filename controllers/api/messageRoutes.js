const { User } = require("../../models");

const router = require("express").Router();

router.post("/sendMessage/:id", async (req, res) => {
    try {
        const currentUser = await User.findByPk(req.session.user_id);
        const userToMessage = await User.findByPk(req.params.id);

        // see if both users exist
        if (currentUser && userToMessage) {
            // check if they have a chat history
            const checkMessage = await currentUser.hasReceiver(userToMessage);

            console.log(checkMessage);

            if (!checkMessage) {
                await currentUser.addReceiver(userToMessage);
                res.status(201).json({ message: "Created message" });
            } else {
                res.status(302).json({ message: "Messages found" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
            return;
        }

    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;