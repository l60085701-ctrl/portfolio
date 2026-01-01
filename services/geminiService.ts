
import { GoogleGenAI } from "@google/genai";
import { PROJECTS } from "../constants";

const SYSTEM_INSTRUCTION = `
You are the personal AI assistant for Lina, a Level 2 Computer Engineering student. 
Lina is highly motivated, proficient in C#, C++, OOP, and IoT (ESP32).
You have detailed knowledge about her two primary projects:
1. Object-Oriented Book Management System (C#): Focuses on OOP principles like classes, objects, and inheritance.
2. ESP32 Smart Home System (IoT): Uses ESP32, LDR, IR sensors, and Blynk for remote control.

Your goal is to answer questions from potential recruiters or interested visitors about Lina's skills, projects, and education.
Be professional, concise, and enthusiastic about Lina's technical background. 
If asked about contact info, refer them to her Email, LinkedIn, or GitHub (available in the header).

Projects Context:
${JSON.stringify(PROJECTS, null, 2)}
`;

export async function getChatResponse(message: string, history: { role: 'user' | 'model', text: string }[]) {
  // Initialize right before making an API call as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    // Access the .text property directly
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to Lina's knowledge base right now. Please try again in a moment!";
  }
}
