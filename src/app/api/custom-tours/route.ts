import { NextRequest, NextResponse } from "next/server";
import { createCustomTourRequest } from "@/lib/services/tourService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      tourType,
      location,
      destination,
      numberOfTravelers,
      numberOfDays,
      durationDays,
      address,
      city,
      country,
      description,
      specialRequirements,
    } = body;

    const finalLocation = location || destination || "Hunza";
    const finalDays = Number(numberOfDays || durationDays || 5);
    const finalTravelers = Number(numberOfTravelers || 2);

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (Name, Phone)." },
        { status: 400 }
      );
    }

    const newRequest = await createCustomTourRequest({
      fullName,
      email: email || "",
      phone,
      tourType: tourType || "Pakistan Tour",
      location: finalLocation,
      numberOfTravelers: finalTravelers,
      numberOfDays: finalDays,
      address: address || "",
      city: city || "Lahore",
      country: country || "Pakistan",
      description: description || specialRequirements || "",
    });

    return NextResponse.json({
      success: true,
      request: newRequest,
      message: "Custom tour plan submitted successfully.",
    });
  } catch (error: any) {
    console.error("Custom tour API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
