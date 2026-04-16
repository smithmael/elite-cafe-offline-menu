import {Injectable} from '@angular/core';
import {GoogleGenAI} from "@google/genai";

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // GEMINI_API_KEY is injected at runtime from AI Studio Secrets
    // and declared in src/globals.d.ts
    this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }

  async generateMenuDescription(itemName: string, language: 'en' | 'am') {
    const model = "gemini-3-flash-preview";
    const prompt = language === 'en' 
      ? `Write a short, poetic, and appetizing description for a cafe menu item named "${itemName}". Keep it under 20 words.`
      : `ለካፌ ሜኑ "${itemName}" የሚል አጭር፣ ግጥማዊ እና የምግብ ፍላጎት የሚቀሰቅስ መግለጫ በአማርኛ ጻፍ። ከ20 ቃላት በታች ይሁን።`;

    try {
      const response = await this.ai.models.generateContent({
        model: model,
        contents: prompt,
      });
      return response.text || (language === 'en' ? 'A delicious choice.' : 'በጣም የሚጣፍጥ ምርጫ።');
    } catch (error) {
      console.error('Gemini API Error:', error);
      return language === 'en' ? 'A premium artisanal selection.' : 'ልዩ ጥበባዊ ምርጫ።';
    }
  }

  getAppUrl() {
    // APP_URL is injected at runtime and declared in src/globals.d.ts
    return APP_URL;
  }
}
