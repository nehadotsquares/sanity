import { client } from "@/lib/integrations/sanity/sanity";
import { Resend } from "resend"
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const resend = new Resend(process.env.RESEND_API_KEY)

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

    // To your sales team
    // const result = await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: "neha.kukreja@dotsquares.com",
    //   subject: "New Deal Registration",
    //   html: `
    //     <h2>New Deal Registration</h2>
    //     <p>Name: ${body.name}</p>
    //     <p>Email: ${body.email}</p>
    //     <p>Company: ${body.company}</p>
    //   `,
    // })

    // Confirmation to user
    // await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: body.email,
    //   subject: "We've received your registration",
    //   html: `
    //     <p>Hi ${body.name},</p>
    //     <p>Thank you for submitting your deal registration.</p>
    //   `,
    // })

    await fetch(process.env.ZAPIER_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: body.company,
        name: body.name,
        email: body.email,
        customerCompany: body.customerCompany,
        customerWebsite: body.customerWebsite,
        contactFirstName: body.contactFirstName,
        contactLastName: body.contactLastName,
        contactEmail: body.contactEmail,
        penetrationTests: body.penetrationTests,
        description: body.description,
        timeline: body.timeline,
      }),
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