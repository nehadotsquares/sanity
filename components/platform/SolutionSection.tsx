import Image from "next/image";

interface SolutionSectionProps {
  data: {
    heading?: string;
    cards?: {
      title?: string;
      subTitle?: string;
      description?: string;
      iconImage?: {
        asset?: {
          url?: string;
        };
      };
    }[];
  };
}

export default function SolutionSection({
  data,
}: SolutionSectionProps) {
  const topCards = data?.cards?.slice(0, 3) || [];
  const bottomCards = data?.cards?.slice(3) || [];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <h2 className="mb-16 text-center text-[32px] leading-tight md:text-[48px] lg:text-[72px]">
          {data?.heading}
        </h2>

        {/* First Row - 3 Cards */}
        <div className="mb-8 grid gap-8 lg:grid-cols-3">
          {topCards.map((card, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 p-6 transition-all duration-300 hover:border-[#bbcfea] hover:shadow-[20px_0_50px_10px_#bbcfea80]"
            >
              {/* Title + Icon */}
              <div className="mb-10 flex items-center justify-between gap-4">
                <h3 className="text-2xl ">
                  {card.title}
                </h3>

                {card.iconImage?.asset?.url && (
                  <Image
                    src={card.iconImage.asset.url}
                    alt={card.title || ""}
                    width={25}
                    height={25}
                  />
                )}
              </div>

              {/* Subtitle */}
              <h4 className="mb-4 text-lg font-semibold">
                {card.subTitle}
              </h4>

              {/* Description */}
              <p className="text-gray-600">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Second Row - Remaining Cards */}
        {bottomCards.length > 0 && (
          <div className="grid gap-8 lg:grid-cols-2">
            {bottomCards.map((card, index) => (
              <div
                key={index}
                className="rounded-3xl border border-gray-200 p-6 transition-all duration-300 hover:border-[#bbcfea] hover:shadow-[20px_0_50px_10px_#bbcfea80] bg-white"
              >
                {/* Title + Icon */}
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="text-2xl">
                    {card.title}
                  </h3>

                  {card.iconImage?.asset?.url && (
                    <Image
                      src={card.iconImage.asset.url}
                      alt={card.title || ""}
                      width={25}
                      height={25}
                    />
                  )}
                </div>

                {/* Subtitle */}
                <h4 className="mb-4 text-lg font-semibold">
                  {card.subTitle}
                </h4>

                {/* Description */}
                <p className="text-gray-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
       <img
            src="/images/bg_image.avif"
            alt=""
            className="absolute bottom-[-800px] left-0 -z-10 w-full"
        />
    </section>
  );
}