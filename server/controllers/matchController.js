const matchService = require('../services/matchService');

exports.buildPreferenceMatrix = async (req, res) => {
    try {
        const members = await matchService.buildPreferenceMatrix(req.params.id);
        return res.status(200).json(members);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.validateMember = async (req, res) => {
    try {
        const members = await matchService.validateMember(req.params.id);
        return res.status(200).json(members);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.scoreMember = async (req, res) => {
    try {
        const members = await matchService.scoreMember(req.params.id);
        return res.status(200).json(members);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.matchMember = async (req, res) => {
    try {
        const members = await matchService.matchMember();
        return res.status(200).json(members);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
