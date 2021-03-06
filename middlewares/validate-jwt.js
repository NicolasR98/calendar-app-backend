const { response, request } = require("express");
const jwt = require("jsonwebtoken");


const validateJWT = (req = request, res = response, next) => {
    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the request',
        });
    };

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
        );
        req.uid = uid;
        req.name = name;

    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Non valid token'
        });
    };

    next();
};


module.exports = {
    validateJWT,
};