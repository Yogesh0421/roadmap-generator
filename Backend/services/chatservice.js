import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const chatWithAI = async (messages) => {
  const response = await groq.chat.completions.create({
    // Use the same model as your working roadmap endpoint.
    model: "openai/gpt-oss-safeguard-20b",

    messages: [
      {
        role: "system",
        content: `
          You are an AI learning assistant.

          Help users understand:
          - HTML, CSS and JavaScript
          - React and frontend development
          - Programming concepts
          - Learning roadmaps and career preparation

          Explain concepts in simple language.
          Use examples when helpful.
          Keep answers clear and beginner-friendly.
        `,
      },
      ...messages,
    ],
    temperature: 0.7,
    max_completion_tokens: 800,
  });

  return response.choices[0].message.content;
};
