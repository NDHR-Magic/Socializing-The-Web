const router = require("express").Router();
const songRoutes = require("./songRoutes");
const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");
const playlistRoutes = require("./playlistRoutes");
const friendRoutes = require("./friendRoutes");
const messageRoutes = require("./messageRoutes");


router.use("/songs", songRoutes);
router.use("/users", userRoutes);
router.use("/notes", noteRoutes);
router.use("/playlist", playlistRoutes);
router.use("/friends", friendRoutes);
router.use("/messages", messageRoutes);

module.exports = router;