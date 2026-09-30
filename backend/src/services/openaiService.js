const OpenAI = require("openai");
const sharp = require("sharp");


const client = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY,

});





async function analyzePropertyImages(imageUrls){


console.log(
"OPENAI ANALYSIS START:",
imageUrls.length,
"images"
);





const prompt = `

You are an expert real estate property inspector and investment analyst.

Analyze these property images.

Return ONLY valid JSON.

No markdown.
No explanation.


Generate detailed report:

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







const selectedImages =
imageUrls.slice(0,3);






const imageContent =
await Promise.all(

selectedImages.map(
async(url)=>{


const response =
await fetch(url);


const buffer =
Buffer.from(
await response.arrayBuffer()
);




const compressed =
await sharp(buffer)

.resize({

width:768,

withoutEnlargement:true

})

.jpeg({

quality:70

})

.toBuffer();





return {

type:"image_url",

image_url:{


url:

`data:image/jpeg;base64,${compressed.toString("base64")}`


}


};



}

)

);







const response = await client.chat.completions.create({

model:"gpt-4.1-mini",


temperature:0.2,


response_format:{

type:"json_object"

},


messages:[

{

role:"system",

content:

"You are a professional real estate AI inspector."

},


{

role:"user",

content:[


{

type:"text",

text:prompt

},


...imageContent


]


}


]


});






return response.choices[0].message.content;



}





module.exports={

analyzePropertyImages

};