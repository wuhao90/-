import { GoogleGenAI } from "@google/genai";
import { Profile } from "../types";

// Helper to ensure we don't crash if API key is missing during dev
const getAIClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is missing. Gemini features will be mocked or fail.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const analyzeProfile = async (profile: Profile): Promise<string> => {
  const ai = getAIClient();
  if (!ai) {
    return "Gemini API Key missing. Please configure the environment.";
  }

  try {
    const prompt = `
      Analyze the following browser profile configuration for potential security risks or optimization suggestions.
      Keep the response concise (under 50 words) and professional.
      
      Profile Data:
      Name: ${profile.name}
      Platform: ${profile.platform}
      Browser: ${profile.browser}
      Proxy: ${profile.proxy}
      Location: ${profile.proxyLocation}
      Tags: ${profile.tags.join(', ')}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Failed to analyze profile. Please try again later.";
  }
};
