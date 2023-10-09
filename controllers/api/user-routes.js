// Imports Express router
const router = require("express").Router();
// Imports model
const { User } = require("../../models");

// Creates a new user, adds their record to the users table in the database, and starts a user session upon successful creation 
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Validates if email and password exist in the database, and returns an error 400 if not valid
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { name: req.body.name } });

        if (!userData) {
            res
                .status(400)
                .json({ message: "Incorrect name or password, please try again" });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: "Incorrect name or password, please try again" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Logs a user out
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;