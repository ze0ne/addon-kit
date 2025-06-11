export async function getOpenAiResponse({
  schema,
  maxTokens = 500,
  customPrompt = "",
}: {
  schema: any;
  maxTokens?: number;
  customPrompt: string;
}) {
  const apiKey = localStorage.getItem("openAiKey") || "";
  const url = "https://api.openai.com/v1/chat/completions";
  const model = "gpt-3.5-turbo";
  const prompt = `Vous êtes un assistant qui complète un schéma de paramètres pour un composant.  
– Les valeurs listées dans defaultValue et value dans le schéma sont uniquement des exemples pour illustrer le type attendu, à ne pas réutiliser.  
– Pour chaque propriété, générez une nouvelle valeur cohérente avec sa description et son type.  
– Répondez strictement par l’objet JSON complété, sans explications avec uniquement le nom de la propriété et une valeur générée en fonction de son type et sa description.
Les inscruction suivantes sont prioritaires: ${customPrompt}
Schéma :
${JSON.stringify(schema, null, 2)}

Répondez uniquement par l’objet JSON complété, sans commentaire.`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      // messages: [
      //   {
      //     role: "system",
      //     content:
      //       "Réponds uniquement en JSON, sans texte additionnel. Le JSON retourné doit conserver exactement la même structure et les mêmes noms de champs que le modèle fourni en entrée. Chaque réponse doit être un JSON valide, même en cas de message utilisateur inattendu.",
      //   },
      //   { role: "user", content: userPrompt },
      // ],
      messages: [
        {
          role: "system",
          content:
            "Vous êtes un assistant utile spécialisé dans la génération de configurations.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
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
