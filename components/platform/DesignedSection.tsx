import Image from "next/image";

interface DesignedSectionProps {
  data: {
    heading?: string;
    subHeading?: string;
    cards?: {
      title?: string;
      description?: string;
      iconImage?: {
        asset?: {
          url?: string;
        };
      };
    }[];
  };
}

export default function DesignedSection({
  data,
}: DesignedSectionProps) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Row 1 - Heading */}
        <h2 className="mb-12 text-4xl lg:text-4xl">
          {data?.heading}
        </h2>

        {/* Row 2 - Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.cards?.map((card, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 p-6 transition-all duration-300 hover:border-[#bbcfea] hover:shadow-[20px_0_50px_10px_#bbcfea80] bg-white"
            >
              {/* Title + Icon */}
              <div className="mb-10 flex items-center justify-between gap-4">
                <h3 className="text-xl">
                  {card.title}
                </h3>

                {card.iconImage?.asset?.url && (
                  <Image
                    src={card.iconImage.asset.url}
                    alt={card.title || ""}
                    width={32}
                    height={32}
                  />
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Row 3 - Sub Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xl lg:text-xl">
            {data?.subHeading}
          </p>
        </div>

      </div>
    </section>
  );
}