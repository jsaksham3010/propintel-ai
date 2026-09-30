const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");


const ADMIN_EMAIL = "propintelai2026@gmail.com";



// ==============================
// Role Helper
// ==============================

const getUserRole = (email, selectedRole)=>{


if(
email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
){

return "admin";

}


if(selectedRole === "builder"){

return "builder";

}


return "buyer";


};






// ==============================
// Generate JWT
// ==============================

const generateToken = (user)=>{


return jwt.sign(

{

id:user._id,

email:user.email,

role:user.role || "buyer"

},

process.env.JWT_SECRET,

{

expiresIn:"7d"

}

);


};









// ==============================
// Signup
// ==============================

exports.signup = async(req,res)=>{


try{


const {

fullName,

email,

password,

role:selectedRole,

companyName,

companyWebsite,

businessAddress

}=req.body;





if(!fullName || !email || !password){


return res.status(400).json({

success:false,

message:"All fields are required"

});


}







const existingUser = await User.findOne({

email

});





if(existingUser){


return res.status(409).json({

success:false,

message:"User already exists"

});


}







const hashedPassword = await bcrypt.hash(

password,

10

);







const role = getUserRole(

email,

selectedRole

);








const user = await User.create({


fullName,

email,

password:hashedPassword,


companyName: role==="builder"

? companyName

: null,


companyWebsite: role==="builder"

? companyWebsite

: null,


businessAddress: role==="builder"

? businessAddress

: null,



isVerified:true,


authProvider:"local",


role


});








const token = generateToken(user);







return res.status(201).json({

success:true,

message:"User registered successfully",

token,

user:{


id:user._id,

fullName:user.fullName,

email:user.email,

role:user.role,

companyName:user.companyName


}


});



}

catch(err){


console.error(err);



return res.status(500).json({

success:false,

message:"Internal Server Error"

});


}


};









// ==============================
// Login
// ==============================

exports.login = async(req,res)=>{


try{


const {

email,

password

}=req.body;





if(!email || !password){


return res.status(400).json({

success:false,

message:"Email and password are required"

});


}







const user = await User.findOne({

email

});






if(!user){


return res.status(404).json({

success:false,

message:"User not found"

});


}






const isPasswordValid = await bcrypt.compare(

password,

user.password

);






if(!isPasswordValid){


return res.status(401).json({

success:false,

message:"Invalid credentials"

});


}






if(

user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()

&&

user.role !== "admin"

){


user.role="admin";

await user.save();


}






if(!user.role){


user.role="buyer";

await user.save();


}








const token = generateToken(user);







return res.status(200).json({

success:true,

message:"Login successful",

token,


user:{


id:user._id,

fullName:user.fullName,

email:user.email,

role:user.role,

companyName:user.companyName


}


});



}

catch(err){


console.error(err);



return res.status(500).json({

success:false,

message:"Internal Server Error"

});


}


};









// ==============================
// Send OTP
// ==============================

exports.sendOTP = async(req,res)=>{


try{


const {email}=req.body;





if(!email){


return res.status(400).json({

success:false,

message:"Email is required"

});


}





const existingUser = await User.findOne({

email

});





if(existingUser){


return res.status(409).json({

success:false,

message:"User already exists"

});


}






const otp = Math.floor(

100000 + Math.random()*900000

).toString();





await OTP.findOneAndDelete({

email

});





await OTP.create({

email,

otp,


expiresAt:new Date(

Date.now()+10*60*1000

)

});





await sendEmail(

email,

otp

);





return res.status(200).json({

success:true,

message:"OTP sent successfully"

});


}


catch(err){


console.error(err);



return res.status(500).json({

success:false,

message:"Failed to send OTP"

});


}


};









// ==============================
// Verify OTP Register
// ==============================

exports.verifyOTP = async(req,res)=>{


try{


const {

fullName,

email,

password,

otp,

role:selectedRole,

companyName,

companyWebsite,

businessAddress

}=req.body;







const otpRecord = await OTP.findOne({

email,

otp

});





if(!otpRecord){


return res.status(400).json({

success:false,

message:"Invalid OTP"

});


}





if(otpRecord.expiresAt < new Date()){


return res.status(400).json({

success:false,

message:"OTP expired"

});


}







const hashedPassword = await bcrypt.hash(

password,

10

);







const role = getUserRole(

email,

selectedRole

);








const user = await User.create({


fullName,

email,

password:hashedPassword,



companyName: role==="builder"

? companyName

: null,


companyWebsite: role==="builder"

? companyWebsite

: null,


businessAddress: role==="builder"

? businessAddress

: null,



isVerified:true,


authProvider:"local",


role


});







await OTP.deleteOne({

email

});








const token = generateToken(user);







return res.status(201).json({

success:true,

message:"Registration successful",

token,

user:{


id:user._id,

fullName:user.fullName,

email:user.email,

role:user.role,

companyName:user.companyName


}


});



}

catch(err){


console.error(err);



return res.status(500).json({

success:false,

message:"Verification failed"

});


}


};









// ==============================
// Current User
// ==============================

exports.getCurrentUser = async(req,res)=>{


try{


const user = await User.findById(

req.user.id

)

.select("-password");





return res.status(200).json({

success:true,

message:"Authenticated successfully",

user

});


}

catch(err){


console.error(err);



return res.status(500).json({

success:false,

message:"Internal Server Error"

});


}


};