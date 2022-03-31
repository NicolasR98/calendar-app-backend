const createUser = (req, res) => {
    const { email, name, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'register',
        email,
        name,
        password,
    });
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