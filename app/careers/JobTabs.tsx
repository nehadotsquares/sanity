"use client";

import { useState, useRef } from "react";
import { PortableText } from "@portabletext/react";
import { toast } from "sonner";

export default function JobTabs({ job, }: { job: any; }) {

    const [activeTab, setActiveTab] = useState("about");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        location: "",
        authorized: "",
        sponsorship: "",
        linkedin_profile: "",
        portfolio_github: "",
        resume: null as File | null,
        interest: "",
        description: "",
        about_us: "", 
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const validateForm = () => {

        let newErrors: any = {};

        // Name
        if (!form.full_name.trim()) {
            newErrors.full_name = "Name is required";
        }

        // Email
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
            newErrors.email = "Invalid email address";
        }

        // Location
        if (!form.location.trim()) {
            newErrors.location = "Location is required";
        }

        // Authorized
        if (!form.authorized) {
            newErrors.authorized = "Please select an option";
        }

        // Sponsorship
        if (!form.sponsorship) {
            newErrors.sponsorship = "Please select an option";
        }

        // LinkedIn
        if (!form.linkedin_profile.trim()) {
            newErrors.linkedin_profile = "LinkedIn profile is required";
        }

        // Portfolio
        if (!form.portfolio_github.trim()) {
            newErrors.portfolio_github = "Portfolio/GitHub is required";
        }

        //resume
        if (!form.resume) {
            newErrors.resume = "Resume is required";
        }

        setErrors(newErrors);

        const firstErrorField = Object.keys(newErrors)[0];

        if (firstErrorField) {

            const element = document.querySelector(
                `[name="${firstErrorField}"]`
            ) as HTMLElement | null;

            if (element) {

                element.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });

                setTimeout(() => {
                    element.focus();
                }, 300);
            }
        }

        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e: any) => {
        
        e.preventDefault();
        if (!validateForm()) return;
        try {

            setLoading(true);

            const formData = new FormData(e.target);
            formData.append("jobTitle", job.title);
            formData.append("jobSlug", job.slug.current);
            formData.append("department", job.department);

            formData.append("fullName", form.full_name);
            formData.append("email", form.email);
            formData.append("location", form.location);

            formData.append("authorized", form.authorized);
            formData.append("sponsorship", form.sponsorship);

            formData.append("linkedin", form.linkedin_profile);
            formData.append("portfolio", form.portfolio_github);

            formData.append("whyInterested", form.interest);
            formData.append("challenge", form.description);

            formData.append("hearAboutUs", form.about_us);

            // FILE
            if (form.resume) {
                formData.append("resume", form.resume);
            }

            const res = await fetch("/api/job-application", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            console.log(data);

            if (data.success) {
                // alert("Application submitted successfully!");
                toast.success("Message sent successfully!");
                setForm({
                    full_name: "",
                    email: "",
                    location: "",
                    authorized: "",
                    sponsorship: "",
                    linkedin_profile: "",
                    portfolio_github: "",
                    resume: null,
                    interest: "",
                    description: "",
                    about_us: ""
                });

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
            else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {

            console.error(error);

            toast.error("Network or server error");

        } finally {

            setLoading(false);
        }
    };
        
    const components = {
    block: {
      normal: ({ children }: any) => (
        <p className="mb-4">{children}</p>
      ),

      h1: ({ children }: any) => (
        <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
      ),

      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
      ),
    },

    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ),

      number: ({ children }: any) => (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
    },

    marks: {
      strong: ({ children }: any) => (
        <strong className="font-bold">{children}</strong>
      ),

      em: ({ children }: any) => (
        <em className="italic">{children}</em>
      ),
    },
  };
    return (
        <div>
            {/* loader */}
            {loading && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

                    <div className="bg-white rounded-2xl px-8 py-6 flex flex-col items-center gap-4 shadow-xl">

                        {/* Spinner */}
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

                    </div>

                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-6 mb-5">

                <button
                onClick={() => setActiveTab("about")}
                className={`pb-4 font-semibold border-b-2 transition ${
                    activeTab === "about"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500"
                }`}
                >
                Overview
                </button>

                <button
                onClick={() => setActiveTab("application")}
                className={`pb-4 font-semibold border-b-2 transition ${
                    activeTab === "application"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500"
                }`}
                >
                Application
                </button>

            </div>

            {/* About Tab */}
            {activeTab === "about" && (
                <div>
                    <div className="prose max-w-none">
                    <PortableText value={job.description} components={components}/>
                    </div>

                    <div className="mt-12">
                        <button onClick={() => setActiveTab("application")}
                            className="w-full bg-[#000] text-white rounded-full px-8 py-3 font-semibold hover:opacity-90 transition">
                            Apply for this job
                        </button>
                    </div>
                </div>
            )}

            {/* Application Tab */}
            {activeTab === "application" && (
                
                <form  onSubmit={handleSubmit} className="space-y-10 border rounded-3xl p-8 bg-[#f4f4f5] border-[#a1a1aa]">

                    {/* SECTION HEADER */}
                    <div className="border-b pb-2">
                        <h3 className="text-2xl font-semibold">Personal Details</h3>
                    </div>

                    {/* PERSONAL DETAILS */}
                    <div className="space-y-6">

                        <div className="grid md:grid-cols-1 gap-6"> 

                            {/* NAME */}
                            <div className="space-y-2">
                                <label className="font-medium">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    name="full_name"
                                    placeholder="Type here..."
                                    value={form.full_name}
                                    onChange={(e) =>
                                        setForm({
                                        ...form,
                                        full_name: e.target.value,
                                        })
                                    }
                                    className="w-full border-2 border-[#a1a1aa] bg-white rounded-xl px-4 py-3 min-h-[56px] focus:outline-none focus:border-black transition"
                                />
                                {errors.full_name && (<p className="text-red-500 text-sm"> {errors.full_name} </p> )}
                            </div>

                            {/* EMAIL */}
                            <div className="space-y-2">
                                <label className="font-medium">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="hello@example.com"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                        }
                                    className="w-full border-2 border-[#a1a1aa] bg-white rounded-xl px-4 py-3 min-h-[56px] focus:outline-none focus:border-black transition"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                    {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* RESUME */}
                            <div className="space-y-2">
                                <label className="font-medium">
                                    Upload Resume
                                </label>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    name="resume"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) =>
                                    setForm({
                                        ...form,
                                        resume: e.target.files?.[0] || null,
                                    })
                                    }
                                    className="w-full border-2 border-[#a1a1aa] bg-white rounded-xl px-4 py-3 min-h-[56px]"
                                />

                                {errors.resume && (
                                    <p className="text-red-500 text-sm">
                                    {errors.resume}
                                    </p>
                                )}
                            </div>

                            {/* LOCATION */}
                            <div className="space-y-2">
                                <label className="font-medium">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Start typing..."
                                    value={form.location}
                                    onChange={(e) =>
                                    setForm({
                                        ...form,
                                        location: e.target.value,
                                    })
                                    }
                                    className="w-full border-2 border-[#a1a1aa] bg-white rounded-xl px-4 py-3 min-h-[56px] focus:outline-none focus:border-black transition"
                                />

                                {errors.location && (
                                    <p className="text-red-500 text-sm">
                                    {errors.location}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SCREENING QUESTIONS */}
                    <div className="space-y-8">

                        {/* AUTHORIZED */}
                        <div className="space-y-4">
                            <label className="font-medium block">
                                Are you authorized to work in this location?
                            </label>

                            <div className="flex items-center gap-8">

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="authorized"
                                        value="yes"
                                        checked={form.authorized === "yes"}
                                        onChange={(e) =>
                                            setForm({
                                            ...form,
                                            authorized: e.target.value,
                                            })
                                        }
                                        className="w-4 h-4 accent-black"
                                    />
                                    Yes
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="authorized"
                                        value="no"
                                        checked={form.authorized === "no"}
                                        onChange={(e) =>
                                            setForm({
                                            ...form,
                                            authorized: e.target.value,
                                            })
                                        }
                                        className="w-4 h-4 accent-black"
                                    />
                                    No
                                </label>
                            </div>
                            {errors.authorized && (
                                <p className="text-red-500 text-sm">
                                {errors.authorized}
                                </p>
                            )}
                        </div>

                        {/* SPONSORSHIP */}
                        <div className="space-y-4">

                            <label className="font-medium block">
                                Will you now or in the future require visa sponsorship?
                            </label>

                            <div className="flex items-center gap-8">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sponsorship"
                                        value="yes"
                                        checked={form.sponsorship === "yes"}
                                        onChange={(e) =>
                                            setForm({
                                            ...form,
                                            sponsorship: e.target.value,
                                            })
                                        }
                                        className="w-4 h-4 accent-black"
                                    />
                                    Yes
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="sponsorship"
                                        value="no"
                                        checked={form.sponsorship === "no"}
                                        onChange={(e) =>
                                            setForm({
                                            ...form,
                                            sponsorship: e.target.value,
                                            })
                                        }
                                        className="w-4 h-4 accent-black"
                                    />
                                    No
                                </label>
                            </div>
                            {errors.sponsorship && (
                                <p className="text-red-500 text-sm">
                                {errors.sponsorship}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* LINKS */}
                    <div className="space-y-6">

                        {/* LINKEDIN */}
                        <div className="space-y-2">

                            <label className="font-medium">
                                LinkedIn Profile
                            </label>

                            <p className="text-sm text-gray-500">
                                We ask for your LinkedIn or personal website and your GitHub/code portfolio to help verify that you’re a real person, not to evaluate or rank your work.
                            </p>

                            <input
                                type="text"
                                name="linkedin_profile"
                                placeholder="https://linkedin.com/in/username"
                                value={form.linkedin_profile}
                                onChange={(e) =>
                                setForm({
                                    ...form,
                                    linkedin_profile: e.target.value,
                                })
                                }
                                className="w-full border-2 border-[#a1a1aa] bg-white rounded-xl px-4 py-3 min-h-[56px] focus:outline-none focus:border-black transition"
                            />

                            {errors.linkedin_profile && (
                                <p className="text-red-500 text-sm">
                                {errors.linkedin_profile}
                                </p>
                            )}

                        </div>

                        {/* PORTFOLIO */}
                        <div className="space-y-2">

                            <label className="font-medium">
                                Portfolio, GitHub, or Personal Site
                            </label>

                            <p className="text-sm text-gray-500">
                                We ask for your LinkedIn or personal website and your GitHub/code portfolio to help verify that you’re a real person, not to evaluate or rank your work.
                            </p>

                            <input
                                type="text"
                                name="portfolio_github"
                                placeholder="https://github.com/username"
                                value={form.portfolio_github}
                                onChange={(e) =>
                                setForm({
                                    ...form,
                                    portfolio_github: e.target.value,
                                })
                                }
                                className="w-full border-2 border-[#a1a1aa] bg-white rounded-xl px-4 py-3 min-h-[56px] focus:outline-none focus:border-black transition"
                            />

                            {errors.portfolio_github && (
                                <p className="text-red-500 text-sm">
                                {errors.portfolio_github}
                                </p>
                            )}

                        </div>

                    </div>

                    {/* MOTIVATIONS */}
                    <div className="space-y-6">

                        <div>
                            <h3 className="text-2xl font-semibold">
                                Motivations
                            </h3>

                            <p className="text-gray-600 mt-1">
                                We use AI every day — it’s fundamental to Company_name! But for these next questions, we’re more interested in your voice. Keep it short, thoughtful, and human.
                            </p>
                        </div>

                        {/* WHY INTERESTED */}
                        <div className="space-y-2">

                            <label className="font-medium">
                                Why are you interested in company_name?
                            </label>

                            <textarea
                                rows={5}
                                name="interest"
                                value={form.interest}
                                onChange={(e) =>
                                    setForm({ ...form, interest: e.target.value })
                                }
                                placeholder="Tell us why this role excites you..."
                                className="w-full border-2 border-[#a1a1aa] bg-white rounded-xl px-4 py-3 focus:outline-none focus:border-black transition"
                            />

                        </div>

                        {/* CHALLENGE */}
                        <div className="space-y-2">

                            <label className="font-medium">
                                Briefly describe a recent project, problem, or challenge you’re proud of - we're particularly interested in any experience you have in a fast-paced, start-up environment or working within ambiguity. 
                            </label>

                            <textarea
                                rows={6}
                                name="description"
                                placeholder="Share a recent experience..."
                                value={form.description}
                                onChange={(e) =>
                                    setForm({ ...form, description: e.target.value })
                                }
                                className="w-full border-2 border-[#a1a1aa] bg-white rounded-xl px-4 py-3 focus:outline-none focus:border-black transition"
                            />

                        </div>

                        {/* HEAR ABOUT */}
                        <div className="space-y-2">

                            <label className="font-medium">
                                How did you hear about us?
                            </label>

                            <input
                                type="text"
                                name="about_us"
                                placeholder="LinkedIn, referral, website..."
                                value={form.about_us}
                                onChange={(e) =>
                                    setForm({ ...form, about_us: e.target.value })
                                }
                                className="w-full border-2 border-[#a1a1aa] bg-white rounded-xl px-4 py-3 min-h-[56px] focus:outline-none focus:border-black transition"
                            />

                        </div>

                    </div>

                    {/* SUBMIT */}
                    <div className="pt-4">

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full rounded-full py-3 font-semibold text-lg transition ${
                                loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black hover:opacity-90 text-white"
                            }`}
                        >
                            {loading ? "Submitting Application..." : "Submit Application"}
                        </button>

                    </div>

                </form>
            )}

        </div>
    );
}