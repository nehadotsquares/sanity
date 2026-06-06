"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
	const router = useRouter();

	const [count, setCount] = useState(5);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prev) => prev - 1);
		}, 1000);

		const timer = setTimeout(() => {
			router.push("/");
		}, 5000);

		return () => {
			clearInterval(interval);
			clearTimeout(timer);
		};
	}, [router]);

	return (
		<div className="h-screen flex flex-col items-center justify-center text-center px-6">
			<h1 className="text-6xl font-bold mb-4">404</h1>

			<p className="text-gray-500 mb-4">Page not found</p>

			<p className="text-sm text-gray-400">
				Redirecting to home page in {count} seconds...
			</p>
		</div>
	);
}
