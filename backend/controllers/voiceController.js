const { generateVoice } = require('../utils/voiceGenerator');

async function createVoice(req, res){
  try{
    const { text, language } = req.body;
    const voice = generateVoice({ text, language });
    return res.json({ success: true, voice });
  }catch(err){
    console.error(err);
    return res.status(500).json({ success: false });
  }
}

module.exports = { createVoice };
