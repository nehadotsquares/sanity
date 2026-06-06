"use client";

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

type ContactFormType = {
	name: string;
	email: string;
	message: string;
};

type FormErrorsType = {
	name?: string;
	email?: string;
	message?: string;
	gcaptcha?: string;
};
export default function ContactPage() {
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const [form, setForm] = useState<ContactFormType>({
		name: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState<FormErrorsType>({});

	const [success, setSuccess] = useState("");
	const [captchaToken, setCaptchaToken] = useState("");

	function validate() {
		const newErrors: Partial<FormErrorsType> = {};

		if (!form.name.trim()) {
			newErrors.name = "Name is required";
		} else if (form.name.length < 3) {
			newErrors.name = "Name is too short";
		} else if (!/^[A-Za-z\s]+$/.test(form.name)) {
			newErrors.name = "Only letters are allowed";
		}

		if (!form.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(form.email)) {
			newErrors.email = "Invalid email format";
		}

		if (!form.message.trim()) {
			newErrors.message = "Message is required";
		} else if (form.message.length < 10) {
			newErrors.message = "Message must be at least 10 characters";
		}

		if (!captchaToken) {
			newErrors.gcaptcha = "Please verify that you are not a robot";
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!validate()) return;

		const res = await fetch("/api/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...form,
				captchaToken,
			}),
		});

		if (res.ok) {
			// alert("Message sent!");
			// setSuccess("Message sent successfully!");
			// setTimeout(() => {
			//   setSuccess("");
			// }, 5000);
			toast.success("Message sent successfully!");
			setForm({
				name: "",
				email: "",
				message: "",
			});
			setCaptchaToken("");
			setErrors({});
			recaptchaRef.current?.reset();
		}
	}

	return (
		<div style={{ background: "#fcfcfc" }}>
			{/* Hero Section */}
			<section className="relative h-[350px] flex items-center justify-center">
				{/* Background Image */}
				<img
					src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
					alt="Contact Banner"
					className="absolute inset-0 w-full h-full object-cover"
				/>

				{/* Overlay */}
				<div className="absolute inset-0 bg-black/60"></div>

				{/* Title */}
				<div className="relative z-10 text-center text-white">
					<h1 className="text-6xl font-bold mb-4">Contact Us</h1>

					<p className="text-xl">We'd love to hear from you</p>
				</div>
			</section>

			<section className="max-w-6xl mx-auto py-20 px-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
					{/* LEFT SIDE */}
					<div className="p-10">
						<h2 className="text-4xl font-bold mb-6">Get In Touch</h2>

						<p className="text-gray-600 mb-8 leading-7">
							We'd love to hear from you. Reach out to us anytime and we’ll
							happily answer your questions.
						</p>

						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold mb-1">Email</h3>

								<p className="text-gray-500">hello@example.com</p>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-1">Phone</h3>

								<p className="text-gray-500">+91 9876543210</p>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-1">Address</h3>

								<p className="text-gray-500">Jaipur, India</p>
							</div>
						</div>
					</div>

					{/* RIGHT SIDE FORM */}
					{/* Success Message */}
					{success && (
						<div className="mb-6 bg-green-100 text-green-700 border border-green-300 px-4 py-3 rounded-lg">
							{success}
						</div>
					)}
					<form
						onSubmit={handleSubmit}
						className="space-y-5 bg-white p-10 rounded-2xl shadow-lg"
					>
						<div className="space-y-1">
							<input
								type="text"
								placeholder="Name"
								className="w-full border p-3 rounded-lg"
								value={form.name}
								onChange={(e) =>
									setForm({
										...form,
										name: e.target.value,
									})
								}
							/>

							{errors.name && (
								<p className="text-red-500 text-sm">{errors.name}</p>
							)}
						</div>

						<div className="space-y-1">
							<input
								type="email"
								placeholder="Email"
								className="w-full border p-3 rounded-lg"
								value={form.email}
								onChange={(e) =>
									setForm({
										...form,
										email: e.target.value,
									})
								}
							/>

							{errors.email && (
								<p className="text-red-500 text-sm">{errors.email}</p>
							)}
						</div>

						<div className="space-y-1">
							<textarea
								placeholder="Message"
								rows={6}
								className="w-full border p-3 rounded-lg"
								value={form.message}
								onChange={(e) =>
									setForm({
										...form,
										message: e.target.value,
									})
								}
							/>

							{errors.message && (
								<p className="text-red-500 text-sm">{errors.message}</p>
							)}
						</div>

						<div className="space-y-1">
							<ReCAPTCHA
								ref={recaptchaRef}
								sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
								onChange={(token: string | null) => {
									setCaptchaToken(token || "");
									if (token) {
										setErrors((prev) => ({
											...prev,
											gcaptcha: undefined,
										}));
									}
								}}
							/>

							{errors.gcaptcha && (
								<p className="text-red-500 text-sm">{errors.gcaptcha}</p>
							)}
						</div>

						<button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition">
							Send Message
						</button>
					</form>
				</div>
			</section>
		</div>
	);
}
