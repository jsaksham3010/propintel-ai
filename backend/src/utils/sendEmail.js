const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },

});


const sendEmail = async (email, otp) => {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: email,

    subject: "PropIntel AI Email Verification OTP",

    text: `Your PropIntel AI verification OTP is ${otp}. It is valid for 10 minutes.`,

  });

};


module.exports = sendEmail;
