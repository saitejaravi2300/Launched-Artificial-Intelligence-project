const { generateExcuse } = require('../utils/aiGenerator');
const Excuse = require('../models/Excuse');

async function createExcuse(req, res){
  try{
    const { scenario, context, tone, language } = req.body;
    const result = await generateExcuse({ scenario, context, tone, language });
    const excuse = await Excuse.create({ scenario, context, tone, language, text: result.text, apology: result.apology, ranking: result.ranking });
    return res.json({ success: true, excuse: { ...result, id: excuse._id } });
  }catch(err){
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = { createExcuse };
