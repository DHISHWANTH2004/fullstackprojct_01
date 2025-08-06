
import { GoogleGenAI, Type } from "@google/genai";
import { MenuItem } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getMealSuggestion = async (menu: MenuItem[], preference: string): Promise<any> => {
    if (!process.env.API_KEY) {
        throw new Error("API Key is not configured.");
    }

    const model = 'gemini-2.5-flash';

    const prompt = `
      Based on the following restaurant menu (prices are in INR), suggest a 3-course meal (Appetizer, Main Course, Dessert) for a customer with the following preference: "${preference}".
      
      Menu:
      ${menu.map(item => `- ${item.name} (${item.category}): ${item.price.toFixed(2)}`).join('\n')}

      Please provide your suggestion in a structured JSON format. The response should be an object with three keys: 'appetizer', 'mainCourse', and 'dessert'. Each key should correspond to an object containing the 'name' and 'description' of the suggested menu item. Also add a 'suggestionRationale' that explains why this combination works well.
    `;
    
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        appetizer: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING }
          }
        },
        mainCourse: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING }
          }
        },
        dessert: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING }
          }
        },
        suggestionRationale: {
          type: Type.STRING
        }
      }
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error getting meal suggestion from Gemini:", error);
        throw new Error("Failed to generate a meal suggestion. Please try again.");
    }
};