const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(

{
    

fullName: {

type:String,

required:true,

trim:true,

},





email: {

type:String,

required:true,

unique:true,

lowercase:true,

trim:true,

},





password: {

type:String,

required:true,

},





phone: {

type:String,

default:null,

},






// Builder / Company Details

companyName: {

type:String,

default:null,

trim:true,

},





companyWebsite: {

type:String,

default:null,

trim:true,

},





businessAddress: {

type:String,

default:null,

trim:true,

},







googleId: {

type:String,

default:null,

},





profileImage: {

type:String,

default:null,

},





isVerified: {

type:Boolean,

default:false,

},





authProvider: {

type:String,

enum:[

"local",

"google"

],

default:"local",

},







// Role Based Access

role: {

type:String,

enum:[

"admin",

"builder",

"buyer"

],

default:"buyer",

required:true,

index:true,

},



},



{

timestamps:true,

}

);




module.exports = mongoose.model(

"User",

userSchema

);