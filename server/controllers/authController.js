const authService = require('../services/authService');

exports.registerMember = async (req, res) => {
  try {
    const newMember = await authService.registerMember(req.body);
    return res.status(201).json(newMember);
  } catch (err) {
      console.error('Error creating member:', err);
      return res.status(500).json({ error: 'Internal Server Error'});
  }
};

exports.startSession = async (req, res) => {
    try {
        const session = await authService.startSession(req.session, req.body);
        return res.status(session.status).json(session.data);
    } catch (err){
        console.error('Error starting session:', err)
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

exports.endSession = async (req, res) => {
    try {
        const session = await authService.endSession(req.session);
        return res.status(session.status).json(session.data);
    } catch (err){
        console.error('Error ending session:', err)
        return res.status(500).json({error: 'Internal Server Error'});
    }
}