const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');


router.get('/', matchController.matchMember);
router.get('/:id', matchController.scoreMember);
router.get('/:id/validate', matchController.validateMember);
router.get('/:id/preference', matchController.buildPreferenceMatrix);




module.exports = router;
