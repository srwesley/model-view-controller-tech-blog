// Imports Express router
const router = require("express").Router();

// Imports routes
const userRoutes = require("./user-routes");
const blogPostRoutes = require("./blogpost-routes");
const commentRoutes = require("./comment-routes");

// Makes routes use paths
router.use("/users", userRoutes);
router.use("/blogPost", blogPostRoutes);
router.use("/comments", commentRoutes);

module.exports = router;