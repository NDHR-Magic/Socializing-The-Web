const router = require("express").Router();
const songRoutes = require("./songRoutes");
const userRoutes = require("./userRoutes");

router.use("/songs", songRoutes);
router.use("/users", userRoutes);

module.exports = router;