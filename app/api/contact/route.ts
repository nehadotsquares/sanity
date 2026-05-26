import { client } from "@/lib/integrations/sanity/sanity";

export async function POST(req: Request) {

  try {

    const body = await req.json();
    console.log("TOKEN:", process.env.SANITY_API_TOKEN ? "EXISTS" : "MISSING");
    await client.create({

      _type: "contactSubmission",

      name: body.name,
      email: body.email,
      message: body.message,

      submittedAt: new Date().toISOString(),

    });

    return Response.json({
      success: true,
    });

  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json(
      {
        error: "Something went wrong", details: String(error)
      },
      {
        status: 500,
      }
    );
  }
}