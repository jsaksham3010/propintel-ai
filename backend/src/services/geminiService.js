const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzePropertyImages(imageUrls) {
  const prompt = `
You are an expert real estate property inspector.

Analyze the uploaded property images carefully.

Return ONLY valid JSON in this exact format:

{
  "overallScore": 0,
  "condition": "",
  "wallCondition": "",
  "paintCondition": "",
  "floorCondition": "",
  "lighting": "",
  "cleanliness": "",
  "estimatedMaintenanceCost": "",
  "riskLevel": "",
  "recommendations": [],
  "summary": ""
}
`;

  const contents = [
    {
      text: prompt,
    },
    ...imageUrls.map((url) => ({
      fileData: {
        fileUri: url,
      },
    })),
  ];

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents,
  });

  return response.text;
}

module.exports = {
  ai,
  analyzePropertyImages,
};