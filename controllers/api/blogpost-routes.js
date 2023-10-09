// Imports Express router
const router = require("express").Router();
// Imports models
const { BlogPost, User, Comment } = require("../../models");
// Imports authorize middleware
const withAuth = require("../../utils/auth");

// Get all blog posts
router.get("/", withAuth, async (req, res) => {
    try {
        // Get all blog posts and join with user data
        const blogData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                },
            ],
        });

        console.log(blogData);

        // Serialize data so the template can read it
        const blogPosts = blogData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into the homepage template
        res.render("dashboard", {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new blog post
router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete a blog post
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: "No blog post found with this ID!" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update/Put a blog post
router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatedData = {
            ...req.body,
        };

        const [affectedRows] = await BlogPost.update(updatedData, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (affectedRows === 0) {
            res.status(400).json({ message: "No blog post found with this ID!" });
            return;
        }

        res.status(200).json({ message: "Blog post updated successfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;