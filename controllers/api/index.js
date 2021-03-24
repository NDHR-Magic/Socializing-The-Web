const router = require("express").Router();
const songRoutes = require("./songRoutes");
const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");
const playlistRoutes = require("./playlistRoutes");

router.use("/songs", songRoutes);
router.use("/users", userRoutes);
router.use("/notes", noteRoutes);
router.use("/playlist", playlistRoutes);

module.exports = router;