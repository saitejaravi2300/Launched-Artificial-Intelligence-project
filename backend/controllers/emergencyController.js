const { sendEmergencyMessage } = require('../services/twilioService');

async function sendEmergency(req, res){
  try{
    const { to, from, body } = req.body;
    const result = await sendEmergencyMessage({ to, from, body });
    return res.json({ success: true, result });
  }catch(err){
    console.error(err);
    return res.status(500).json({ success: false, message: 'Emergency send failed' });
  }
}

module.exports = { sendEmergency };
