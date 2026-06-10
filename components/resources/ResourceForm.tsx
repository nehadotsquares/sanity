"use client"

import { useState } from "react"

interface Props {
  heading?: string
}

type FormDataType = {
  name: string
  jobTitle: string
  company: string
  country: string
  email: string
  consent: boolean
}

type FormErrorsType = {
  name?: string
  jobTitle?: string
  company?: string
  country?: string
  email?: string
  consent?: string
}

export function ResourceForm({
  heading,
}: Props) {
  const [loading, setLoading] =
    useState(false)

  const [form, setForm] =
    useState<FormDataType>({
      name: "",
      jobTitle: "",
      company: "",
      country: "",
      email: "",
      consent: false,
    })

  const [errors, setErrors] =
    useState<FormErrorsType>({})

  function validate() {
    const newErrors: FormErrorsType =
      {}

    if (!form.name.trim()) {
      newErrors.name =
        "Name is required"
    } else if (
      form.name.trim().length < 3
    ) {
      newErrors.name =
        "Name must be at least 3 characters"
    } else if (
      !/^[A-Za-z\s]+$/.test(
        form.name
      )
    ) {
      newErrors.name =
        "Only letters are allowed"
    }

    if (!form.jobTitle.trim()) {
      newErrors.jobTitle =
        "Job title is required"
    }

    if (!form.company.trim()) {
      newErrors.company =
        "Company is required"
    }

    if (!form.country.trim()) {
      newErrors.country =
        "Country is required"
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Email is required"
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email address"
    }

    if (!form.consent) {
      newErrors.consent =
        "Please accept the consent checkbox"
    }

    setErrors(newErrors)

    return (
      Object.keys(newErrors)
        .length === 0
    )
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)

    try {
      await fetch(
        "/api/resource-form",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            jobTitle:
              form.jobTitle,
            company:
              form.company,
            country:
              form.country,
            email: form.email,
          }),
        }
      )

      setForm({
        name: "",
        jobTitle: "",
        company: "",
        country: "",
        email: "",
        consent: false,
      })

      setErrors({})
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <h3 className="mb-5 text-2xl font-semibold">
        {heading ??
          "Download Resource"}
      </h3>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm text-gray-500">Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Job Title */}
        <div>
          <label className="text-sm text-gray-500">Job Title</label>
          <input
            type="text"
            placeholder="Job Title"
            value={form.jobTitle}
            onChange={(e) =>
              setForm({
                ...form,
                jobTitle:
                  e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          {errors.jobTitle && (
            <p className="mt-1 text-sm text-red-500">
              {errors.jobTitle}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="text-sm text-gray-500">Company</label>
          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) =>
              setForm({
                ...form,
                company:
                  e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          {errors.company && (
            <p className="mt-1 text-sm text-red-500">
              {errors.company}
            </p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="text-sm text-gray-500">Country</label>
          <input
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={(e) =>
              setForm({
                ...form,
                country:
                  e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          {errors.country && (
            <p className="mt-1 text-sm text-red-500">
              {errors.country}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-500">Business Email</label>
          <input
            type="email"
            placeholder="Business Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) =>
            setForm({
              ...form,
              consent:
                e.target.checked,
            })
          }
          className="mt-1"
        />

        <span>
          Company-name needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at anytime. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, check out our Privacy Policy.
        </span>
      </label>

      {errors.consent && (
        <p className="mt-1 text-sm text-red-500">
          {errors.consent}
        </p>
      )}


      <button
        disabled={loading}
        type="submit"
        className="mt-6 w-full rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Submitting..."
          : "Submit"}
      </button>
    </form>
  )
}