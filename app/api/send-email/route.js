import transporter from "@/lib/mailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, text, html, name } = body;

    // Validate required fields
    if (!to || !subject || (!text && !html)) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: to, subject, and text or html",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send original message to company
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL, // Changed from process.env.EMAIL_USER to match authenticated user
      to: process.env.EMAIL_FROM || "contact@someninigltd.com",
      subject: `Contact Form: ${subject}`,
      text,
      html,
    });

    // Branded, engaging thank you message
    const responseMessage = `Hi ${name || "there"},\n\nThank you for reaching out to Someni Nigeria Limited! We appreciate your interest in our engineering and specialist services. Our team has received your message and will respond as soon as possible.\n\nIf your inquiry is urgent, please call us at 08068472444 or 08030646966 for immediate assistance.\n\nBest regards,\nSomeni Nigeria Limited\nPlot 1 Effurun / DSC Express Way, Effurun, Delta State, Nigeria\nwww.someninig.com`;

    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL, // Changed from process.env.EMAIL_USER to match authenticated user
      to,
      subject: "Thank you for contacting Someni Nigeria Limited",
      text: responseMessage,
      html: `<p>Hi <strong>${name || "there"}</strong>,</p>
             <p>Thank you for reaching out to <strong>Someni Nigeria Limited</strong>! We appreciate your interest in our engineering and specialist services. Our team has received your message and will respond as soon as possible.</p>
             <p>If your inquiry is urgent, please call us at <a href="tel:08068472444">08068472444</a> or <a href="tel:08030646966">08030646966</a> for immediate assistance.</p>
             <p>Best regards,<br/>
             <strong>Someni Nigeria Limited</strong><br/>
             Plot 1 Effurun / DSC Express Way, Effurun, Delta State, Nigeria<br/>
             <a href="https://www.someninig.com">www.someninig.com</a></p>`,
    });

    return new Response(
      JSON.stringify({
        message: "Email sent successfully",
        responseMessage,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Send email error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}