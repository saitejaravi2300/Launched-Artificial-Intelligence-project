// Minimal translator stub. Hook into translation API (Google, DeepL, etc.) later.
function translateText({text, target='en'}){
  return { text, language: target, note: 'Translation placeholder' };
}

module.exports = { translateText };
