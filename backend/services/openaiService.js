const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateExcuseText({
  scenario = "general",
  context = "",
  tone = "formal",
  language = "en",
}) {
  try {
    const prompt = `Generate a believable excuse message for a ${scenario} situation. Use a ${tone} tone and keep the message concise. Context: ${context}. Output the excuse text only.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an intelligent excuse generation assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.log(error);
    return "Error generating excuse";
  }
}

async function translateText({ text, target = "en" }) {
  try {
    const prompt = `Translate the following text into ${target} while preserving tone and meaning:\n\n${text}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a translation assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content?.trim() || text;
  } catch (error) {
    console.log(error);
    return text;
  }
}

module.exports = {
  generateExcuseText,
  translateText,
};
