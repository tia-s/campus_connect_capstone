const express = require('express');
const { json } = require('express');
const router = express.Router();

const protectedRoute = require('../middleware/protectedRoute');

router.use(json());


const authRoutes = require('./authRouter');
const memberRoutes = require('./memberRouter');
const lessonPlanRoutes = require('./lessonPlanRouter');
const eventRoutes = require('./eventRouter');
const ticketRoutes = require('./helpTicketRouter');
const matchRoutes = require('./matchRouter');
// const reviewRoutes = require('./reviewRouter');
// const matchRoutes = require('./matchRouter');



router.use('/', authRoutes);
router.use('/member', memberRoutes);
router.use('/lesson', lessonPlanRoutes);
router.use('/event', eventRoutes);
router.use('/ticket', ticketRoutes);
router.use('/match', matchRoutes);


// router.use('/review', reviewRoutes);
// router.use('/match', matchRoutes);

module.exports = router;

/*
/GET items
/GET items/<id>
/POST items
/POST items/<id> : or whatever the update method is
/DELETE items/<id>

*/