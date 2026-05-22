const { generateProof } = require('../utils/proofGenerator');

async function createProof(req, res){
  try{
    const { type, context } = req.body;
    const proof = generateProof({ type, context });
    return res.json({ success: true, proof });
  }catch(err){
    console.error(err);
    return res.status(500).json({ success: false });
  }
}

module.exports = { createProof };
