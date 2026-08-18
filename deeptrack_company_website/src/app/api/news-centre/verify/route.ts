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

        const { accessToken } = body || {};

        if (!accessToken) {
            return new Response(
                JSON.stringify({ message: "Missing access token", valid: false }),
                { status: 400 }
            );
        }

        const dbName = process.env.MONGODB_DB;

        if (clientPromise && dbName) {
            try {
                const client = await clientPromise;
                const db = client.db(dbName);

                const record = await db.collection("news_centre_submissions").findOne({
                    accessToken,
                    approved: true,
                });

                if (record) {
                    return new Response(
                        JSON.stringify({
                            message: "Access verified",
                            valid: true,
                            email: record.email,
                            name: record.name,
                        }),
                        { status: 200 }
                    );
                } else {
                    return new Response(
                        JSON.stringify({ message: "Invalid or expired access token", valid: false }),
                        { status: 401 }
                    );
                }
            } catch (dbError) {
                console.error("News centre DB verification failed:", dbError);
                return new Response(
                    JSON.stringify({ message: "Verification service unavailable", valid: false }),
                    { status: 503 }
                );
            }
        } else {
            console.warn("Skipping News Centre DB verification: missing MongoDB connection or configuration.");
            return new Response(
                JSON.stringify({ message: "Verification service unavailable", valid: false }),
                { status: 503 }
            );
        }
    } catch (error) {
        console.error("Unexpected news centre verification error:", error);
        return new Response(
            JSON.stringify({ message: "Server error", valid: false }),
            { status: 500 }
        );
    }
}
