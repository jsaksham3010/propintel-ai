const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);


exports.googleLogin = async (req, res) => {
  try {

    console.log("GOOGLE BODY:", req.body);

    const { token } = req.body;


    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token missing",
      });
    }


    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });


    const payload = ticket.getPayload();

    console.log("GOOGLE PAYLOAD:", payload);


    const {
      email,
      name,
      picture,
      sub: googleId,
    } = payload;



    let user = await User.findOne({ email });



    // New Google User
    if (!user) {

      const hashedPassword = await bcrypt.hash(
        Math.random().toString(36),
        10
      );


      user = await User.create({

        fullName: name,

        email,

        password: hashedPassword,

        googleId,

        profileImage: picture,

        isVerified: true,

      });

    }


    // Generate JWT

    const jwtToken = jwt.sign(

      {
        id: user._id,
        email: user.email,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );



    return res.status(200).json({

      success: true,

      message: "Google login successful",

      token: jwtToken,

      user: {

        id: user._id,

        fullName: user.fullName,

        email: user.email,

      },

    });



  } catch (error) {


    console.log(
      "GOOGLE ERROR:",
      error.message
    );


    return res.status(401).json({

      success: false,

      message: "Google authentication failed",

    });


  }
};