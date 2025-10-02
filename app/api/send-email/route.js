import transporter from "@/lib/mailer";

export async function POST(request) {
  try {
    // Parse incoming JSON
    const data = await request.json();
    
    // Validate required fields
    if (!data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Email and message are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Send email using nodemailer
    await transporter.sendMail({
      from: data.email,
      to: process.env.ZOHO_EMAIL, // Your Zoho email address
      subject: data.subject || "Contact Form Submission",
      text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.message}`,
    });
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Email sent successfully'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Failed to process request'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}