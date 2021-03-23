const router = require("express").Router();
const songRoutes = require("./songRoutes");

router.use("/songs", songRoutes);

module.exports = router;