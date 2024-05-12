const lessonPlanService = require('../services/lessonPlanService');

exports.getLessonPlans = async (req, res) => {
    try {
        const lessonPlans = await lessonPlanService.getLessonPlans(req.params.id);
        return res.status(200).json(lessonPlans);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getLessonPlan = async (req, res) => {
    try {
        const lessonPlan = await lessonPlanService.getLessonPlan(req.params.id);
        return res.status(200).json(lessonPlan);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

exports.createLessonPlan = async (req, res) => {
    try {
        await lessonPlanService.createLessonPlan(req.body);
        return res.status(201).json({"Success": "Lesson Plan Created."});
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};
