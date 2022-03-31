/**
 * User's route
 * host + /api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');

const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');

const middlewares = {
    createUser: [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be 6 char minimum').isLength({ min: 6 }),
        fieldValidator,
    ],
    login: [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password must be 6 char minimum').isLength({ min: 6 }),
        fieldValidator,
    ]
};

// Login
router.post(
    '/',
    middlewares.login,
    loginUser
);

// Register
router.post(
    '/new',
    middlewares.createUser,
    createUser,
);

// Renew token
router.get('/renew', renewToken);

module.exports = router;