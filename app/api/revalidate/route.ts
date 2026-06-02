import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("Webhook received:", body);

  revalidatePath("/careers");

  return Response.json({
    revalidated: true,
  });
}