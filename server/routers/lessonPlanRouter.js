const express = require('express');
const router = express.Router();
const lessonPlanController = require('../controllers/lessonPlanController');

router.get('/member/:id', lessonPlanController.getLessonPlans);
router.get('/plan/:id', lessonPlanController.getLessonPlan);
router.post('/plans', lessonPlanController.createLessonPlan);


module.exports = router;
