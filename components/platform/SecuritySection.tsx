import Link from "next/link";

interface SecuritySectionProps {
  data: {
    heading?: string;
    description?: string;
    buttonTitle?: string;
    buttonLink?: string;
  };
}

export default function SecuritySection({
  data,
}: SecuritySectionProps) {
  return (
    <section className="relative py-50 bg-no-repeat bg-center bg-cover" style={{
      backgroundImage: "url('/images/security_bg.avif')",
    }}>
      <div className="mx-auto max-w-4xl px-6 text-center">

        {/* Title */}
        <h2 className="mb-6 text-4xl lg:text-6xl">
          {data?.heading}
        </h2>

        {/* Description */}
        <p className="mb-10 text-lg text-gray-600">
          {data?.description}
        </p>

        {/* Button */}
        {data?.buttonTitle && data?.buttonLink && (
          <Link
            href={data.buttonLink}
            className="px-6 py-4 rounded-full uppercase bg-[#ccff00] hover:bg-[#e9eef7]"
          >
            {data.buttonTitle}
          </Link>
        )}

      </div>
    </section>
  );
}