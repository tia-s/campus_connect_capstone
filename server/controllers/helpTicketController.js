const helpTicketService = require('../services/helpTicketService');

exports.getTickets = async (req, res) => {
    try {
        const tickets = await helpTicketService.getTickets();
        return res.status(200).json(tickets);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTicket = async (req, res) => {
    try {
        const ticket = await helpTicketService.getTicket(req.params.id);
        return res.status(200).json(ticket);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

exports.createTicket = async (req, res) => {
    try {
        const ticket_response = await helpTicketService.createTicket(req.body);
        return res.status(201).json(ticket_response);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};
