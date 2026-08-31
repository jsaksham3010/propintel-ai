const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});



async function analyzePropertyImages(imageUrls) {


  const prompt = `
You are an expert real estate property inspector.

Analyze the property images carefully.

Return ONLY valid JSON.

Format:

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



  const imageParts = await Promise.all(

    imageUrls.map(async (url) => {


      const response = await fetch(url);


      const buffer = await response.arrayBuffer();


      const base64 = Buffer
        .from(buffer)
        .toString("base64");



      const mimeType =
        response.headers.get("content-type")
        || "image/jpeg";



      return {

        inlineData: {

          data: base64,

          mimeType,

        },

      };


    })

  );




  const result = await ai.models.generateContent({

    model: "gemini-3.6-flash",

    contents: [

      {

        role: "user",

        parts: [

          {
            text: prompt
          },

          ...imageParts,

        ],

      },

    ],

  });



  return result.text;

}



module.exports = {

  ai,

  analyzePropertyImages,

};