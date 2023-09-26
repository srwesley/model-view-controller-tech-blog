// Imports Express router
const router = require("express").Router();

// Importing routes
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

// Makes routes use paths
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;