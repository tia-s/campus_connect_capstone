const eventService = require('../services/eventService');

exports.getEvents = async (req, res) => {
    try {
        const events = await eventService.getEvents(req.params.id);
        return res.status(200).json(events);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getEvent = async (req, res) => {
    try {
        const event = await eventService.getEvent(req.params.id);
        return res.status(200).json(event);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

exports.createEvent = async (req, res) => {
    try {
        await eventService.createEvent(req.body);
        return res.status(200).json({"Success": "Event created"});
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

exports.startEvent = async (req, res) => {
    try {
        const event_response = await eventService.startEvent(req.body);
        return res.status(200).json(event_response);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};
