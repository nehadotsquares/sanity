import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Sanity Webhook:", body);

    revalidatePath("/");
    revalidatePath("/careers");

    return Response.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    return Response.json(
      {
        error: "Webhook failed",
      },
      { status: 500 }
    );
  }
}