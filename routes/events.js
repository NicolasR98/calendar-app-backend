/**
 * Events route
 * host + /api/events
 */
const { Router } = require("express");
const { check } = require("express-validator");

const { validateJWT } = require("../middlewares/validate-jwt");
const { fieldValidator } = require("../middlewares/field-validators");

const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/events");
const isDate = require("../helpers/isDate");

const router = Router();

const middlewares = {
    createEvents: [
        check('title', 'The title is required').not().isEmpty(),
        check('start', 'The start date is requred').custom(isDate),
        check('end', 'The end date is required').custom(isDate),
        fieldValidator,
    ],
};

router.use(validateJWT);

// Get events
router.get('/', getEvents);

// Create event
router.post(
    '/',
    middlewares.createEvents,
    createEvent
);

// Update event
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;