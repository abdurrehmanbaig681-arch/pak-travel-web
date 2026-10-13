import { NextRequest, NextResponse } from "next/server";
import { createContactMessage } from "@/lib/services/tourService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, fullName, email, phone, subject, message } = body;
    const finalName = fullName || name;

    if (!finalName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please provide your Name, Email, and Message." },
        { status: 400 }
      );
    }

    const newMessage = await createContactMessage({
      fullName: finalName,
      email,
      phone: phone || "",
      subject: subject || "General Inquiry",
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received by the Pak Travel Lahore team.",
      item: newMessage,
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
