import { client } from "@/lib/integrations/sanity/sanity";

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Deal Registration:", body)

    const doc = await client.create({
      _type: "dealRegistrationLead",

      company: body.company,
      name: body.name,
      job: body.job,
      email: body.email,

      customerCompany: body.customerCompany,
      customerWebsite: body.customerWebsite,

      contactFirstName: body.contactFirstName,
      contactLastName: body.contactLastName,
      contactEmail: body.contactEmail,

      penetrationTests: body.penetrationTests,
      description: body.description,
      timeline: body.timeline,

      consent: body.consent,
      submittedAt: new Date().toISOString(),
    })

    return Response.json({
      success: true,
      id: doc._id,
    })
    
  } catch (error) {
    console.error(error)

    return Response.json(
      {
        success: false,
        message: "Failed to save deal registration",
      },
      {
        status: 500,
      }
    )
  }
}