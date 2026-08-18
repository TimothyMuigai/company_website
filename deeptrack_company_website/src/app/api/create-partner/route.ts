import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

/**
 * Admin API endpoint for creating partner accounts
 * 
 * This endpoint should be protected in production with proper API key authentication
 * 
 * POST /api/create-partner
 * Body: {
 *   email: string,
 *   password: string,
 *   companyName: string,
 *   tier: "silver" | "gold" | "platinum"
 * }
 */

export async function POST(request: NextRequest) {
  try {
    // In production, verify API key or admin token here
    const apiKey = request.headers.get("x-api-key");
    const expectedKey = process.env.ADMIN_API_KEY;

    // Note: For development, we'll allow requests without key
    // In production, uncomment the check below:
    // if (!apiKey || apiKey !== expectedKey) {
    //   return NextResponse.json(
    //     { error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    const body = await request.json();
    const { email, password, companyName, tier } = body;

    // Validate inputs
    if (!email || !password || !companyName || !tier) {
      return NextResponse.json(
        { error: "Missing required fields: email, password, companyName, tier" },
        { status: 400 }
      );
    }

    if (!["silver", "gold", "platinum"].includes(tier)) {
      return NextResponse.json(
        { error: "Invalid tier. Must be one of: silver, gold, platinum" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Create Convex HTTP client
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      return NextResponse.json(
        { error: "Convex URL not configured" },
        { status: 500 }
      );
    }

    const client = new ConvexHttpClient(convexUrl);

    // Call the createPartnerAccount mutation
    const result = await client.mutation(api.users.createPartnerAccount, {
      email,
      password,
      companyName,
      tier,
    });

    return NextResponse.json(
      {
        message: "Partner account created successfully",
        partnerId: result.partnerId,
        email: result.email,
      },
      { status: 201 }
    );
  } catch (error: any) {
    const errorMessage = error?.message || String(error);
    console.error("Error creating partner account:", errorMessage);
    console.error("Full error:", error);

    // Handle specific Convex errors
    if (errorMessage.includes("already exists")) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        error: errorMessage || "Failed to create partner account",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
