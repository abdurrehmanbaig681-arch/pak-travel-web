import { NextRequest, NextResponse } from "next/server";
import { createBookingRequest } from "@/lib/services/tourService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      tourId,
      tourTitle,
      tourSlug,
      departureDate,
      fullName,
      email,
      phone,
      city,
      numberOfTravelers,
      estimatedTotalPKR,
      specialRequests,
    } = body;

    // Server-side validation
    if (!fullName || !phone || !email || !tourTitle || !departureDate) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details (Name, Phone, Email, Tour, Date)." },
        { status: 400 }
      );
    }

    const travelersCount = Number(numberOfTravelers) || 1;
    if (travelersCount < 1) {
      return NextResponse.json(
        { success: false, error: "Number of travelers must be at least 1." },
        { status: 400 }
      );
    }

    const newBooking = await createBookingRequest({
      tourId: tourId || "custom",
      tourTitle,
      tourSlug: tourSlug || "custom",
      departureDate,
      fullName,
      email,
      phone,
      city: city || "Not Specified",
      numberOfTravelers: travelersCount,
      estimatedTotalPKR: Number(estimatedTotalPKR) || 0,
      specialRequests: specialRequests || "",
    });

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: "Booking request recorded successfully.",
    });
  } catch (error: any) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
