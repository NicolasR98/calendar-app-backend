/**
 * Events route
 * host + /api/events
 */
const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/events");

const router = Router();

router.use(validateJWT);

// Get events
router.get('/', getEvents);

// Create event
router.post('/', createEvent);

// Update event
router.put('/:id', updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;