// Models
const User = require("../models/User");

// Modules
const bcrypt = require("bcryptjs");

// Helpers
const { generateJWT } = require("../helpers/jwt");


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

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
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
                msg: 'Incorrect email or password',
            });
        };

        // Confirm the password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect email or password'
            });
        };

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        return res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Auth error, please try again',
        });
    }
};

const renewToken = async (req, res) => {
    const { uid, name } = req;

    // Generate new JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        msg: 'renew',
        token,
        uid,
        name,
    });
};

module.exports = {
    createUser,
    loginUser,
    renewToken,
};