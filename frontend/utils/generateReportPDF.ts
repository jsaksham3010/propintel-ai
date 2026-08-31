import jsPDF from "jspdf";



export const generateReportPDF = async (

  report:any,

  property:any

)=>{


const doc = new jsPDF();


let y = 20;



doc.setFontSize(22);

doc.setFont("helvetica","bold");


doc.text(
  "PropIntel AI",
  20,
  y
);



doc.setFontSize(12);

doc.setFont("helvetica","normal");


doc.text(
 "Smart Real Estate Investment Report",
 20,
 y+8
);


y += 25;





// Property Image

if(property.images?.[0]?.url){


try{


const img = await fetch(
 property.images[0].url
);


const blob = await img.blob();


const reader = new FileReader();


const base64 = await new Promise((resolve)=>{


reader.onloadend=()=>resolve(reader.result);


reader.readAsDataURL(blob);


});



doc.addImage(
 base64 as string,
 "JPEG",
 20,
 y,
 70,
 45
);


y += 55;


}catch(e){

console.log(
"Image skipped"
);

}



}







doc.setFontSize(16);

doc.setFont("helvetica","bold");


doc.text(
"Property Details",
20,
y
);


y += 10;



doc.setFontSize(12);

doc.setFont("normal");



[
`Name: ${property.title || "-"}`,
`Location: ${property.city || "-"}, ${property.state || "-"}`,
`Type: ${property.propertyType || "-"}`,
`Area: ${property.area || "-"} sq.ft`,
`Price: ₹ ${Number(property.price || 0).toLocaleString("en-IN")}`

].forEach((text)=>{


doc.text(
 text,
20,
y
);


y+=8;


});





y+=10;



doc.setFontSize(16);

doc.setFont("bold");


doc.text(
"AI Analysis",
20,
y
);


y+=10;



doc.setFontSize(12);

doc.setFont("normal");



[
`Score: ${report.overallScore || 0}/100`,
`Risk: ${report.riskLevel || "-"}`,
`Condition: ${report.condition || "-"}`,
`Paint: ${report.paintCondition || "-"}`,
`Floor: ${report.floorCondition || "-"}`,
`Lighting: ${report.lighting || "-"}`,
`Maintenance: ${report.estimatedMaintenanceCost || "-"}`

].forEach((text)=>{


doc.text(
text,
20,
y
);


y+=8;


});





y+=10;


doc.setFontSize(16);

doc.setFont("bold");


doc.text(
"Summary",
20,
y
);



y+=10;


doc.setFontSize(12);

doc.setFont("normal");


doc.text(

doc.splitTextToSize(
report.summary || "-",
170
),

20,

y

);





y+=30;



doc.setFontSize(16);

doc.setFont("bold");


doc.text(
"Recommendations",
20,
y
);


y+=10;



doc.setFontSize(12);


(report.recommendations || [])
.forEach((item:string)=>{


doc.text(
`• ${item}`,
20,
y
);


y+=8;


});





doc.save(

`${property.title || "Property"}-AI-Report.pdf`

);


};