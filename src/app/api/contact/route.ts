import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;
const MONGODB_TIMEOUT = 5000; // 5 second timeout

async function connectMongoDBWithTimeout(uri: string): Promise<MongoClient> {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: MONGODB_TIMEOUT,
    connectTimeoutMS: MONGODB_TIMEOUT,
    socketTimeoutMS: MONGODB_TIMEOUT,
  });

  try {
    await client.connect();
    return client;
  } catch (error) {
    await client.close().catch(() => {});
    throw error;
  }
}

export async function POST(req: NextRequest) {
  let client: MongoClient | null = null;
  
  try {
    const body = await req.json();
    const { firstName, lastName, email, jobTitle, company, message } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!MONGODB_URI || !MONGODB_DB) {
      console.error("MongoDB configuration missing");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Connect to MongoDB with timeout
    client = await connectMongoDBWithTimeout(MONGODB_URI);
    const db = client.db(MONGODB_DB);

    // Save to MongoDB
    await db.collection("contact_submissions").insertOne({
      firstName,
      lastName,
      email,
      jobTitle: jobTitle || "",
      company: company || "",
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Submission successful." },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Contact API error:", errorMessage);

    // Check for connection timeout/network errors
    if (errorMessage.includes("ETIMEDOUT") || errorMessage.includes("ECONNREFUSED")) {
      return NextResponse.json(
        { 
          message: "Database connection error. Please check your MongoDB Atlas network access settings. Ensure your IP is whitelisted or set to 0.0.0.0/0 for development.",
          details: process.env.NODE_ENV === "development" ? errorMessage : undefined
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        message: "Something went wrong. Please try again.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  } finally {
    // Ensure client is closed
    if (client) {
      await client.close().catch((err) => console.error("Error closing MongoDB client:", err));
    }
  }
}
