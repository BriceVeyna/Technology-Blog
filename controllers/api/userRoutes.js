const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(404).json({ message: 'Login failed. Please try again.' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Login failed. Please try again.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json({ message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;