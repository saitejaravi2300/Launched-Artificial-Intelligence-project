const History = require('../models/History');

async function addHistory(req, res){
  try{
    const { userId, excuseText, medium } = req.body;
    const record = await History.create({ userId, excuseText, medium });
    return res.json({ success: true, record });
  }catch(err){
    console.error(err);
    return res.status(500).json({ success: false, message: 'History save failed' });
  }
}

async function listHistory(req, res){
  try{
    const { userId } = req.query;
    const query = userId ? { userId: String(userId) } : {};
    const results = await History.find(query).sort({ createdAt: -1 });
    return res.json({ success: true, history: results });
  }catch(err){
    console.error(err);
    return res.status(500).json({ success: false, message: 'History fetch failed' });
  }
}

module.exports = { addHistory, listHistory };
