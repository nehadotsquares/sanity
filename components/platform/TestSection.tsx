"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface TestSectionProps {
  data: {
    heading?: string;
    description?: string;
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

export default function TestSection({
  data,
}: TestSectionProps) {
  return (
    <section className="py-24 text-white" style={{ backgroundColor:"#041117" }}>
      <div className="mx-auto max-w-7xl px-6">

        {/* Top Row */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          
          {/* Title */}
          <div>
            <h2 className="text-4xl lg:text-5xl">
              {data?.heading}
            </h2>
          </div>

          {/* Description */}
          <div>
            <p className="text-lg text-white">
              {data?.description}
            </p>
          </div>

        </div>

        {/* Cards Slider */}
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {data?.cards?.map((card, index) => (
            <SwiperSlide className="!h-auto" key={index}>
              <div className="h-full flex flex-col rounded-2xl border border-gray-800 p-6 transition-all duration-300 hover:border-[#ccff00] hover:shadow-[20px_0_50px_10px_#ccff0033]">

                {/* Title + Icon */}
                <div className="mb-10 flex items-center justify-between">
                  <h3 className="text-xl">
                    {card.title}
                  </h3>

                  {card.iconImage?.asset?.url && (
                    <Image
                      src={card.iconImage.asset.url}
                      alt={card.title || ""}
                      width={40}
                      height={40}
                    />
                  )}
                </div>

                {/* Description */}
                <p className="flex-1 text-gray-400">
                  {card.description}
                </p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}