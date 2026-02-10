
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateEventDescription = async (title: string, category: string, keyPoints: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a professional and engaging event description for an event titled "${title}" in the ${category} category. Key highlights to include: ${keyPoints}. Keep it under 200 words and use a persuasive, modern tone.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please try again manually.";
  }
};

export const suggestEvents = async (userInterests: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Based on a user who is interested in ${userInterests}, suggest 5 creative event titles they might like. Return only a JSON array of strings.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        });
        return JSON.parse(response.text || "[]");
    } catch (error) {
        return ["Tech Hackathon", "Networking Gala", "Skill Workshop"];
    }
}
