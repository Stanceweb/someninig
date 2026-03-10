import { NextResponse } from "next/server";

export async function POST(request) {
    let payload;

    try {
        payload = await request.json();
    } catch (error) {
        return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
    }

    const fullName = payload?.customer?.fullName || payload?.customer?.name;
    const phone = payload?.customer?.phone;
    const toolName = payload?.toolName;

    if (!toolName || !fullName || !phone) {
        return NextResponse.json(
            {
                message: "Missing required fields. toolName, customer.fullName, and customer.phone are required.",
            },
            { status: 400 }
        );
    }

    const response = {
        message: "Official quote request received. Our commercial team will review and contact you shortly.",
        requestId: `QR-${Date.now()}`,
        receivedAt: new Date().toISOString(),
        nextAction: "Wire this endpoint to CRM/ERP or email workflow for production submission.",
    };

    return NextResponse.json(response, { status: 200 });
}

