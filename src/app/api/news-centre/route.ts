import clientPromise from "@/lib/mongoDB";

export async function POST(request: Request) {
    try {
        const text = await request.text();
        let body;

        try {
            body = JSON.parse(text);
        } catch {
            return new Response(
                JSON.stringify({ message: "Invalid JSON body" }),
                { status: 400 }
            );
        }

        const { name, email, message, institution } = body || {};

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ message: "Missing required fields" }),
                { status: 400 }
            );
        }

        const dbName = process.env.MONGODB_DB;

        if (clientPromise && dbName) {
            try {
                const client = await clientPromise;
                const db = client.db(dbName);

                await db.collection("news_centre_submissions").updateOne(
                    { email },
                    {
                        $set: {
                            name,
                            email,
                            institution,
                            message,
                            updatedAt: new Date(),
                        },
                        $setOnInsert: {
                            createdAt: new Date(),
                        },
                    },
                    { upsert: true }
                );
            } catch (dbError) {
                console.error("News centre DB write failed:", dbError);
                // If the database is temporarily unreachable, still allow access
                // to the News Centre so the request flow is not blocked.
            }
        } else {
            console.warn("Skipping News Centre DB write: missing MongoDB connection or configuration.");
        }

        return new Response(
            JSON.stringify({ message: "Submission successful" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Unexpected news centre error:", error);
        return new Response(
            JSON.stringify({ message: "Server error" }),
            { status: 500 }
        );
    }
}