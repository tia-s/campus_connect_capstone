const express = require('express');
const router = express.Router();
const helpTicketController = require('../controllers/helpTicketController');


router.get('/', helpTicketController.getTickets);
router.get('/:id', helpTicketController.getTicket);
router.post('/', helpTicketController.createTicket);

module.exports = router;
