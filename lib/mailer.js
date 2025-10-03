import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
  connectionTimeout: 10000, // 10 seconds
  dns: { 
    // Use Google's public DNS as fallback
    servers: ["8.8.8.8", "8.8.4.4"]
  }
});

transporter.verify((err, success) => {
  if (err) {
    console.log("Zoho mailer error:", err);
  } else {  
    console.log("Zoho server is ready to take our messages");
  }
});

export default transporter;