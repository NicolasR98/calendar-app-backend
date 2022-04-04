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

const updateEvent = (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'updateEvent'
    });
};

const deleteEvent = (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'deleteEvent',
    });
};


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};