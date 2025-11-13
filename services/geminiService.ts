
import { GoogleGenAI } from "@google/genai";

export const generatePlantDescription = async (plantName: string): Promise<string> => {
    try {
        // Assume process.env.API_KEY is made available by the deployment environment (e.g., Vercel).
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = 'gemini-2.5-flash';
        
        const prompt = `Create a short, luxurious, and enticing description for a rare plant called "${plantName}" for an elite collector's auction. Be creative and evocative. Max 50 words.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error generating plant description with Gemini API:", error);
        // Provide a graceful fallback if the API call fails for any reason (e.g., invalid key, network issue).
        return `A rare and beautiful ${plantName}, highly sought after by collectors worldwide. (Description generation failed)`;
    }
};
