export async function getOpenAiResponse({
  userPrompt,
  maxTokens = 500,
}: {
  userPrompt: string;
  maxTokens?: number;
}) {
  const apiKey = "";
  const url = "https://api.openai.com/v1/chat/completions";
  const model = "gpt-3.5-turbo";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: "Réponds uniquement en JSON, sans texte additionnel.",
        },
        { role: "user", content: userPrompt },
      ],
      max_tokens: maxTokens,
      temperature: 1,
      top_p: 0.9,
      frequency_penalty: 0.5,
      n: 1,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `OpenAI API error: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  // Vérifier que la génération s'est terminée complètement
  const finishReason = data.choices?.[0]?.finish_reason;
  if (finishReason !== "stop") {
    throw new Error(
      `La réponse est incomplète (finish_reason: ${finishReason}). Veuillez ajuster maxTokens ou réessayer.`,
    );
  }

  const text = data.choices?.[0]?.message?.content;
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("La réponse de l'API n'est pas un JSON valide : " + text);
  }
}
