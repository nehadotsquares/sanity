import { NextResponse } from "next/server";
import { writeClient } from "@/lib/integrations/sanity/sanity";

export async function POST(req: Request) {

  try {

    const formData = await req.formData();
    const file = formData.get("resume") as File;
    if (!file) {
      throw new Error("Resume file missing");
    }
    // Upload file to Sanity
    const uploadedFile = await writeClient.assets.upload(
      "file",
      file,
      {
        filename: file.name,
      }
    );
    const application = await writeClient.create({
      _type: "jobApplication",
      jobTitle: formData.get("jobTitle"),
      jobSlug: formData.get("jobSlug"),

      fullName: formData.get("fullName"),
      email: formData.get("email"),
      location: formData.get("location"),

      resume: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: uploadedFile._id,
        },
      },

      authorized: formData.get("authorized"),
      sponsorship: formData.get("sponsorship"),

      linkedin: formData.get("linkedin"),
      portfolio: formData.get("portfolio"),

      whyInterested: formData.get("whyInterested"),
      challenge: formData.get("challenge"),

      hearAboutUs: formData.get("hearAboutUs"),
    });

    return NextResponse.json({
      success: true,
      application,
    });

  } catch (error) {

    console.error("UPLOAD ERROR:", error);

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