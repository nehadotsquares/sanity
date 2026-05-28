import { NextResponse } from "next/server";
import { writeClient } from "@/lib/integrations/sanity/sanity";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const application = await writeClient.create({
      _type: "jobApplication",

      jobTitle: body.jobTitle,
      jobSlug: body.jobSlug,

      fullName: body.fullName,
      email: body.email,
      location: body.location,

      authorized: body.authorized,
      sponsorship: body.sponsorship,

      linkedin: body.linkedin,
      portfolio: body.portfolio,

      whyInterested: body.whyInterested,
      challenge: body.challenge,

      hearAboutUs: body.hearAboutUs,
    });

    return NextResponse.json({
      success: true,
      application,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}