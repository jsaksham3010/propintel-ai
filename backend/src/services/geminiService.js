const { GoogleGenAI } = require("@google/genai");
const sharp = require("sharp");


const ai = new GoogleGenAI({

  apiKey: process.env.GEMINI_API_KEY,

});





function sleep(ms){

  return new Promise(

    resolve => setTimeout(resolve, ms)

  );

}





function timeoutPromise(ms){

  return new Promise((_,reject)=>{

    setTimeout(()=>{

      reject(
        new Error(
          "Gemini request timeout"
        )
      );

    },ms);


  });

}









async function callGemini(

  prompt,

  imageParts

){


return await Promise.race([


ai.models.generateContent({

model:"gemini-3.6-flash",


contents:[

{

role:"user",

parts:[

{

text:prompt

},

...imageParts

]

}

]


}),


timeoutPromise(90000)


]);


}









async function callGeminiWithRetry(

prompt,

imageParts

){


const retries = 2;



for(
let attempt=1;
attempt<=retries;
attempt++
){


try{


console.log(
`GEMINI ATTEMPT ${attempt}`
);



const result =

await callGemini(

prompt,

imageParts

);



return result;



}

catch(error){


console.log(

`Gemini Attempt ${attempt} Failed:`,

error.message

);



if(attempt===retries){

throw error;

}



await sleep(8000);


}



}



}









async function analyzePropertyImages(

imageUrls,

propertyContext={}

){



console.log(

"AI ANALYSIS START:",

imageUrls.length,

"images"

);






const prompt = `


You are an expert real estate property inspector,
investment analyst and valuation consultant.


Analyze ALL provided property images together.

Do not judge from a single image.

Compare rooms, walls, flooring, ceiling,
lighting, finishing quality and overall condition.



Property Information:

Title:
${propertyContext.title || "-"}


Location:
${propertyContext.city || "-"},
${propertyContext.state || "-"}


Property Type:
${propertyContext.propertyType || "-"}


Area:
${propertyContext.area || "-"} sq.ft


Listed Price:
₹ ${propertyContext.price || "-"}



Generate a professional property intelligence report.



Return ONLY valid JSON.

No markdown.

No explanation.



JSON FORMAT:


{

"overallScore":0,


"propertyOverview":{

"condition":"",
"estimatedAge":"",
"propertyQuality":""

},


"structuralAnalysis":{

"wallCondition":"",
"floorCondition":"",
"ceilingCondition":"",
"structuralRisk":""

},


"interiorAnalysis":{

"paintCondition":"",
"lighting":"",
"ventilation":"",
"cleanliness":""

},


"maintenanceAnalysis":{

"estimatedMaintenanceCost":"",
"urgentRepairs":[],
"futureMaintenance":[]

},


"investmentAnalysis":{

"investmentRating":"",
"rentalPotential":"",
"resalePotential":"",
"recommendation":""

},


"riskAnalysis":{

"riskLevel":"",
"riskFactors":[],
"concerns":[]

},


"recommendations":[],

"summary":""

}


`;










// Analyze maximum 8 images

const selectedImages =

imageUrls.slice(0,8);









const imageParts =

await Promise.all(


selectedImages.map(

async(url)=>{


const response = await fetch(url);



const buffer = Buffer.from(

await response.arrayBuffer()

);





const compressedBuffer =

await sharp(buffer)

.resize({

width:640,

withoutEnlargement:true

})

.jpeg({

quality:60

})

.toBuffer();





return {


inlineData:{


data:

compressedBuffer.toString("base64"),


mimeType:"image/jpeg"


}


};



}


)


);









console.log(

"IMAGES READY:",

imageParts.length

);







console.log(

"SENDING REQUEST TO GEMINI"

);







const result =

await callGeminiWithRetry(

prompt,

imageParts

);







console.log(

"GEMINI RESPONSE RECEIVED"

);







return result.text;



}








module.exports = {


ai,


analyzePropertyImages


};