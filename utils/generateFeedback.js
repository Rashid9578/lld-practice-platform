const fetch = require('node-fetch');

/**
 * Sends the user's design submission to Claude and asks for structured LLD feedback.
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

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Claude API error: ${response.status} ${errText}`);
  }

  const data = await response.json();
  const textBlock = data.content.find((block) => block.type === 'text');
  return textBlock ? textBlock.text : 'No feedback generated.';
}

module.exports = generateFeedback;
