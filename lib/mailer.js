import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // Removed 'service: "zoho"' to ensure explicit configuration
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // Changed from false to true for SSL/TLS
  auth: {
    // WARNING: Hardcoding credentials is not recommended for production environments.
    // It's generally safer to use environment variables (e.g., process.env.ZOHO_EMAIL).
    user: "contact@someninigltd.com",
    pass: "@Contactsomeni",
  },
  connectionTimeout: 10000, // Keep existing connection timeout
  socketTimeout: 15000,     // Added timeout for socket activity (e.g., 15 seconds)
  logger: true,             // Enable logging for more detailed output
  debug: true               // Enable debug mode for verbose output
});

transporter.verify((err, success) => {
  if (err) {
    console.error("Zoho mailer error:", err); // Changed to console.error and log full error object
  } else {
    console.log("Zoho server is ready to take our messages");
  }
});

export default transporter;