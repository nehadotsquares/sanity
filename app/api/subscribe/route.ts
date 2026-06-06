import { NextResponse } from "next/server";
import { writeClient } from "@/lib/integrations/sanity/sanity";

export async function POST(req: Request) {
	const body = await req.json();

	const { email } = body;

	try {
		// Check existing email
		const existingSubscriber = await writeClient.fetch(
			`*[_type == "subscriber" && email == $email][0]`,
			{ email },
		);

		if (existingSubscriber) {
			return NextResponse.json(
				{
					message: "Email already subscribed",
				},
				{ status: 400 },
			);
		}

		// Create subscriber
		await writeClient.create({
			_type: "subscriber",
			email,
			subscribedAt: new Date().toISOString(),
		});

		return NextResponse.json(
			{
				message: "Subscribed successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Something went wrong",
			},
			{ status: 500 },
		);
	}
}
