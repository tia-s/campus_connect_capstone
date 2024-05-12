const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerMember);
router.post('/login', authController.startSession);
router.post('/logout', authController.endSession);

module.exports = router;