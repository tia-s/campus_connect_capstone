const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.get('/member/:id', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post('/', eventController.createEvent);
router.post('/start', eventController.startEvent);



module.exports = router;
