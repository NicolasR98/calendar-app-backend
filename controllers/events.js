const { response } = require("express");
const Event = require("../models/Event");


const getEvents = async (req, res = response) => {
    try {
        // Get all events from db and search for the user uid references and get only name
        const events = await Event
            .find()
            .populate('user', 'name');

        return res.status(200).json({
            ok: true,
            events,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: 'false',
            msg: 'Talk with the admin'
        });
    }
};

const createEvent = async (req, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const savedEvent = await event.save();
        res.status(200).json({
            ok: true,
            event: savedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk with the admin',
        });
    };
};

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const { uid } = req;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'The requested event does not exist in the database',
            });
        };

        if (event.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'You do not have privileges to update this event',
            });
        };

        const newEvent = {
            ...req.body,
            user: uid,
        };

        // Get updated event to return it `{ new: true }`
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        return res.status(200).json({
            ok: true,
            event: updatedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk with the admin',
        });
    }
};

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const { uid } = req;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'The requested event does not exist in the database',
            });
        }

        if (event.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'You do not have privileges to update this event',
            });
        };

        const deletedEvent = await Event.findByIdAndRemove(eventId);

        return res.status(200).json({
            ok: true,
            event: deletedEvent,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk with the admin',
        });
    }
};


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};