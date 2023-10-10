// Imports Express router
const router = require("express").Router();
// Imports Comment models
const { BlogPost, User, Comment } = require("../../models");
// Imports the authorize middleware
const withAuth = require("../../utils/auth");

// Create a new comment
router.post("/", withAuth, async (req, res) => {
    console.log("Within router.post");
    try {
        console.log(req.body);

        const newComment = await Comment.create({
            ...req.body, // Includes the comment text and the post-id that the comment belongs to
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;