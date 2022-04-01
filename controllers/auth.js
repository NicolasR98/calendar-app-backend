// Models
const User = require("../models/User");

const createUser = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists in the db
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'The requested email is already in use'
            });
        };

        // If it does not exist, then save it into the db
        user = new User(req.body);
        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Auth error, please try again',
        });
    }

};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    res.status(200).json({
        ok: true,
        msg: 'login',
        email,
        password
    });
};

const renewToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'renew',
    });
};

module.exports = {
    createUser,
    loginUser,
    renewToken,
};