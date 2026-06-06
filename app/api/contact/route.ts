import { client } from "@/lib/integrations/sanity/sanity";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { captchaToken } = body;
		console.log("TOKEN:", process.env.SANITY_API_TOKEN ? "EXISTS" : "MISSING");
		const verifyResponse = await fetch(
			"https://www.google.com/recaptcha/api/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					secret: process.env.RECAPTCHA_SECRET_KEY!,
					response: captchaToken,
				}),
			},
		);

		const verifyData = await verifyResponse.json();

		if (!verifyData.success) {
			return Response.json(
				{ error: "Captcha verification failed" },
				{ status: 400 },
			);
		}
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
				error: "Something went wrong",
				details: String(error),
			},
			{
				status: 500,
			},
		);
	}
}
