import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000
});

transporter.verify((err, success) => {
  if (err) {
    console.log("Gmail mailer error:", err);
  } else {  
    console.log("Gmail server is ready to take our messages");
  }
});

export default transporter;