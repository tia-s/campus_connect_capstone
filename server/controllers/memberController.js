const memberService = require('../services/memberService');

exports.getMembers = async (req, res) => {
    try {
        const members = await memberService.getMembers();
        return res.status(200).json(members);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getMember = async (req, res) => {
    try {
        const member = await memberService.getMember(req.params.id);
        return res.status(200).json(member);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

exports.createMember = async (req, res) => {
    try {
        const member = await memberService.createMember(req.body);
        return res.status(200).json(member);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
};

// exports.updateMember = async (req, res) => {
//     try {
//         const member = await memberService.updateMember(req.params.id, req.body);
//         return res.status(200).json(member);    
//     } catch (err) {
//         console.error('Error:', err);
//         return res.status(500).json({ error: 'Internal Server Error'});
//     }
// };

// exports.deleteMember = async (req, res) => {
//     try {
//         const member = await memberService.deleteMember(req.params.id);
//         return res.status(200).json(member);    
//     } catch (err) {
//         console.error('Error:', err);
//         return res.status(500).json({ error: 'Internal Server Error'});
//     }
// };