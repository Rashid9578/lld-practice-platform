const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Sends the user's design submission to OpenAI
 * and asks for structured LLD feedback.
 * Returns a feedback string (markdown-ish) to store and render.
 */
async function generateFeedback(problem, designText) {
  const prompt = `You are an expert Low-Level Design (LLD) interviewer reviewing a candidate's solution.

Problem: ${problem.title}
Description: ${problem.description}
Requirements:
${problem.requirements.map((r) => `- ${r}`).join('\n')}

Candidate's submitted design/code:
"""
${designText}
"""

Evaluate the submission and respond with:
1. A short overall verdict (1-2 sentences)
2. Strengths (bullet points)
3. Issues or gaps (bullet points) — cover things like SOLID violations, missing edge cases, poor extensibility, tight coupling
4. 2-3 concrete suggestions to improve the design

Keep the response concise and actionable, formatted in plain markdown.`;

  try {
    const response = await client.responses.create({
      model: 'gpt-5-mini',
      input: prompt,
      max_output_tokens: 800
    });

    return response.output_text || 'No feedback generated.';
  } catch (error) {
    throw new Error(`OpenAI API error: ${error.message}`);
  }
}

module.exports = generateFeedback;