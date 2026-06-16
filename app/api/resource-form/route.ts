import { NextResponse } from "next/server"
import { client } from "@/lib/integrations/sanity/sanity";
export async function POST(
  request: Request
) {
  const body = await request.json()

  await client.create({
    _type: "resourceLead",
    resourceType: body.resourceType,

    name: body.name,
    jobTitle: body.jobTitle,
    company: body.company,
    country: body.country,
    email: body.email,

    submittedAt:
      new Date().toISOString(),
  })

  return NextResponse.json({
    success: true,
  })
}