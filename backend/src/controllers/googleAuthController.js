const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

exports.googleLogin = async (req, res) => {
  try {

    console.log("GOOGLE BODY:", req.body);

    const { token } = req.body;

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


    if (!user) {
      user = await User.create({
        fullName: name,
        email,
        googleId,
        profileImage: picture,
        isVerified: true,
      });
    }


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


    res.status(200).json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });


  } catch (error) {

    console.log("GOOGLE ERROR:", error.message);

    res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });

  }
};