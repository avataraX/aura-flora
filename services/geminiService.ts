
import { GoogleGenAI } from "@google/genai";

export const generatePlantDescription = async (plantName: string): Promise<string> => {
    // This is a mock-up because process.env is not available in the browser.
    // In a real application, this API call should be made from a secure backend server.
    if (!process.env.API_KEY) {
        console.warn("API_KEY environment variable not set. Using fallback description.");
        return `A truly magnificent specimen of ${plantName}. Its leaves shimmer with an inner light, a testament to the care it has received. A prized possession for any discerning collector.`;
    }

    try {
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
        return `A rare and beautiful ${plantName}, highly sought after by collectors worldwide.`;
    }
};
