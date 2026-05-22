const { generateExcuseText } = require('../services/openaiService');

async function generateExcuse({scenario='general', context='', tone='formal', language='en'}){
  if(process.env.OPENAI_API_KEY){
    const text = await generateExcuseText({ scenario, context, tone, language });
    const apology = tone === 'casual' ? 'Sorry for the inconvenience.' : 'I apologize for any inconvenience this causes.';
    let ranking = 0.6;
    if((context||'').toLowerCase().includes('sick')) ranking = 0.95;
    if((context||'').toLowerCase().includes('traffic')) ranking = 0.75;
    return { text, apology, ranking, scenario, language };
  }

  const baseText = context ? `I'm sorry, I can't attend due to ${context}.` : `I'm sorry, I can't attend due to an unexpected situation.`;
  const apology = tone === 'casual' ? "Sorry for the inconvenience." : "I apologize for any inconvenience this causes.";
  const text = `${baseText} ${apology}`;
  let ranking = 0.6;
  if((context||'').toLowerCase().includes('sick')) ranking = 0.95;
  if((context||'').toLowerCase().includes('traffic')) ranking = 0.75;
  return { text, apology, ranking, scenario, language };
}

module.exports = { generateExcuse };
