"use client"

import { useState, useRef } from "react"
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

export default function DealForm({ submitText }: { submitText?: string }) {
  const [form, setForm] = useState({
    company: "",
    name: "",
    job: "",
    email: "",
    customerCompany: "",
    customerWebsite: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    penetrationTests: "",
    description: "",
    timeline: "",
    consent: false,
  })
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i

    if (!form.company.trim()) newErrors.company = "Your company is required"
    if (!form.name.trim()) newErrors.name = "Your name is required"
    if (!form.job.trim()) newErrors.job = "Job title is required"

    if (!form.email.trim()) newErrors.email = "Your email is required"
    else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email"

    if (!form.customerCompany.trim())
      newErrors.customerCompany = "Customer company name is required"

    if (!form.customerWebsite.trim())
      newErrors.customerWebsite = "Customer website is required"
    else if (!urlRegex.test(form.customerWebsite))
      newErrors.customerWebsite = "Invalid website URL"

    if (!form.contactFirstName.trim())
      newErrors.contactFirstName = "Contact first name is required"

    if (!form.contactLastName.trim())
      newErrors.contactLastName = "Contact last name is required"

    if (!form.contactEmail.trim())
      newErrors.contactEmail = "Contact email is required"
    else if (!emailRegex.test(form.contactEmail))
      newErrors.contactEmail = "Invalid email"

    if (!form.penetrationTests)
      newErrors.penetrationTests = "Select penetration tests"

    if (!form.description.trim())
      newErrors.description = "Briefly describe the opportunity"

    if (!form.timeline)
      newErrors.timeline = "Customer timeline is required"

    if (!form.consent)
      newErrors.consent = "You must accept Privacy Policy"

    if (!captchaToken) newErrors.gcaptcha = "Please verify reCAPTCHA";

    setErrors(newErrors)

    // scroll to first error (optional but good UX)
    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0]
      const el = document.querySelector(`[name="${firstKey}"]`) as HTMLElement
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
      el?.focus?.()
      return false
    }

    return true
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!validateForm()) return
    const res = await fetch("/api/deal-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...form, captchaToken}),
    })

    if (res.ok) {
      // alert("Submitted successfully")
      toast.success("Message sent successfully!");
      setForm({
        company: "",
        name: "",
        job: "",
        email: "",
        customerCompany: "",
        customerWebsite: "",
        contactFirstName: "",
        contactLastName: "",
        contactEmail: "",
        penetrationTests: "",
        description: "",
        timeline: "",
        consent: false,
      })
      recaptchaRef.current?.reset();
			setCaptchaToken("");

      setErrors({})
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow-lg">
      <div>
        <label className="text-sm font-medium mb-1 block">Your Company*</label>
        <input name="company" value={form.company} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg" />
        {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Your Name*</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Job Title*</label>
        <input name="job"  onChange={handleChange} value={form.job} className="w-full border border-gray-300 p-3 rounded-lg" />
        {errors.job && <p className="text-red-500 text-sm">{errors.job}</p>}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Your Email*</label>  
        <input name="email" type="email"  onChange={handleChange} value={form.email} className="w-full border border-gray-300 p-3 rounded-lg" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Customer Company Name*</label>
        <input name="customerCompany" onChange={handleChange} value={form.customerCompany}  className="w-full border border-gray-300 p-3 rounded-lg" />
        {errors.customerCompany && (<p className="text-red-500 text-sm">{errors.customerCompany}</p> )}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Customer Website Address*</label>  
        <input name="customerWebsite"  onChange={handleChange} value={form.customerWebsite} className="w-full border border-gray-300 p-3 rounded-lg" />
        {errors.customerWebsite && (<p className="text-red-500 text-sm">{errors.customerWebsite}</p> )}
      </div>  

      <div>
        <label className="text-sm font-medium mb-1 block">Customer Point of Contact First Name*</label>
        <input name="contactFirstName"  onChange={handleChange} value={form.contactFirstName} className="w-full border border-gray-300 p-3 rounded-lg" />
        {errors.contactFirstName && (<p className="text-red-500 text-sm">{errors.contactFirstName}</p> )}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Customer Point of Contact Last Name*</label>
        <input name="contactLastName"  onChange={handleChange} value={form.contactLastName} className="w-full border border-gray-300 p-3 rounded-lg" />
        {errors.contactLastName && (<p className="text-red-500 text-sm">{errors.contactLastName}</p> )}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">Customer Point of Contact Email*</label>
        <input name="contactEmail"  onChange={handleChange} value={form.contactEmail} className="w-full border border-gray-300 p-3 rounded-lg" />
        {errors.contactEmail && (<p className="text-red-500 text-sm">{errors.contactEmail}</p> )}
      </div>

      {/* dropdown */}
      <div>
        <label className="text-sm font-medium mb-1 block">How many penetration tests is the Customer running annually?*</label>
        <select name="penetrationTests" onChange={handleChange} value={form.penetrationTests} className="w-full border border-gray-300 p-3 rounded-lg">
          <option value="">Penetration tests per year</option>
          <option value="1">1</option>
          <option value="2-5">2-5</option>
          <option value="5+">5+</option>
        </select>
        {errors.penetrationTests && (<p className="text-red-500 text-sm">{errors.penetrationTests}</p> )}
      </div>  

      <div>
        <label className="text-sm font-medium mb-1 block">Briefly describe the opportunity: customer challenges and desired outcome*</label>
        <textarea
          name="description"
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg"
          value={form.description}
          rows={4}
        />
        {errors.description && (<p className="text-red-500 text-sm">{errors.description}</p> )}
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">What is the customers timeline to implement the solution?*</label>
        <select name="timeline" onChange={handleChange} value={form.timeline} className="w-full border border-gray-300 p-3 rounded-lg">
          <option value="">Timeline</option>
          <option value="immediate">Immediate</option>
          <option value="1-3 months">1-3 months</option>
          <option value="3-6 months">3-6 months</option>
        </select>
        {errors.timeline && (<p className="text-red-500 text-sm">{errors.timeline}</p> )}
      </div>  

      <div>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} className="mt-1"/>
          <span>Company_name needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at anytime. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, check out our Privacy Policy</span>
        </label>
        {errors.consent && (
          <p className="text-red-500 text-sm">{errors.consent}</p>
        )}
      </div>

        <div className="grid grid-col-1">
          {/* Recaptcha */}
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token: string | null) => {
              setCaptchaToken(token || "");
            }}
          />
          {errors.gcaptcha && (
            <p className="text-sm text-red-500">{errors.gcaptcha}</p>
          )}
        </div>

      <button className="w-full bg-black text-white py-3 rounded">
        {submitText || "Submit"}
      </button>

    </form>
  )
}