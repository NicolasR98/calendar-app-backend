// Models
const User = require("../models/User");

// Modules
const bcrypt = require("bcryptjs");


const createUser = async (req, res) => {
    const { email, password } = req.body;

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

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

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

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect email',
            });
        };

        // Confirm the password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        };

        return res.json({
            ok: true,
            uid: user.id,
            name: user.name
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Auth error, please try again',
        });
    }
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