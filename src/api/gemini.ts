import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({});

export const summarizer = async (message: string) => {
	const response = await gemini.models.generateContent({
		model: "gemini-3-flash-preview",
		config: {
			systemInstruction:
				"Você é um especialista em redações. O seu papel fundamental é resumir todos os texto o máximo que puder. Deve resumir em até 5 linhas e caso o texto tenha menos linhas, resuma o máximo que puder.",
		},
		contents: message,
	});

	return response.text;
};
