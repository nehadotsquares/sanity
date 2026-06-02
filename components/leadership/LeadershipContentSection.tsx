import Link from "next/link";
import { urlFor } from "@/lib/integrations/sanity/sanity";

type Props = {
  data: {
    iconImage?: any;
    title?: string;
    buttonText?: string;
    buttonLink?: string;
    image?: any;
  };
};

export default function LeadershipContentSection({
  data,
}: Props) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column */}
          <div>

            {data.iconImage && (
              <img
                src={urlFor(data.iconImage).url()}
                alt=""
                className="w-8 h-8 mb-6"
              />
            )}

            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {data.title}
            </h2>

            {data.buttonText && data.buttonLink && (
              <Link
                href={data.buttonLink}
                className="inline-flex px-6 py-3 rounded-full bg-[#e9eef7] text-black font-semibold hover:bg-[#ccff00] uppercase"
              >
                {data.buttonText}
              </Link>
            )}

          </div>

          {/* Right Column */}
          <div>

            {data.image && (
              <img
                src={urlFor(data.image).url()}
                alt={data.title}
                className="w-full rounded-2xl shadow-[30px_20px_30px_#bbcfea4d]" 
              />
            )}

          </div>

        </div>

      </div>
    </section>
  );
}