const router = require("express").Router();
const songRoutes = require("./songRoutes");
const userRoutes = require("./userRoutes");
const noteRoutes = require("./noteRoutes");

router.use("/songs", songRoutes);
router.use("/users", userRoutes);
router.use("/notes", noteRoutes);

module.exports = router;