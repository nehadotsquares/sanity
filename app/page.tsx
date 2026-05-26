export const revalidate = 60;
import Link from "next/link";
import { client, urlFor } from "@/lib/integrations/sanity/sanity";
import { text } from "stream/consumers";

async function getHomePage() {

  const query = `
    *[_type == "homePage"][0]{
      heroTitle,
      heroSubtitle,
      heroImage,
      buttonText,
      buttonLink,

      validationTitle,
      validationSubtitle,
      validationDescription,
      validationButtonText,
      validationButtonLink,

      trustedText,
      trustedLogos,

      changeBackgroundImage,
      changeSectionImage,
      changeSmallTitle,
      changeTitle,
      changeDescription,

      solutionSmallTitle,
      solutionTitle,
      solutionDescription,
      solutionSectionImage,

      differentiationSectionTitle,
      differentiationCards,

      processBackgroundImage,
      processSmallTitle,
      processTitle,
      processCards,

      testimonialBackgroundImage,
      testimonialTitle,
      testimonialQuote,
      testimonialPersonName,
      testimonialPersonRole,
      testimonialVideoUrl,

      demoTitle,
      demoButtonText,
      demoButtonLink,
      demoImage,
    }
  `;

  return await client.fetch(query);
}

async function getPosts() {

  const query = `
    *[_type == "post"]{
      _id,
      title,
      slug,
      image
    }
  `;

  return await client.fetch(query);
}

export default async function HomePage() {

  const home = await getHomePage();
  console.log(home);
  const posts = await getPosts();

  return (
    <div>

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white">

        {/* Background Image */}
        {home?.heroImage && (
          <img
            src={urlFor(home.heroImage).url()}
            alt={home.heroTitle}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">

          <h1 className="text-6xl font-bold mb-6">
            {home?.heroTitle}
          </h1>

          <p className="text-xl max-w-2xl mx-auto mb-8">
            {home?.heroSubtitle}
          </p>

          <Link
            href={home?.buttonLink || "/"}
            className="text-black px-8 py-4 rounded-full uppercase font-semibold bg-[#ccff00] hover:bg-[#e9eef7]"
          >
            {home?.buttonText}
          </Link>

        </div>

      </section>
      {/*validation section*/}
      <section className="max-w-5xl mx-auto px-5 py-24 text-center bg-white">

        <h2 className="text-5xl font-bold mb-6">
          {home?.validationTitle}
        </h2>

        <p className="text-2xl mb-8 text-gray-700">
          {home?.validationSubtitle}
        </p>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          {home?.validationDescription}
        </p>

        <Link
          href={home?.validationButtonLink || "/"}
          className="px-8 py-4 uppercase rounded-full font-semibold bg-[#ccff00] hover:bg-[#e9eef7]"
        >
          {home?.validationButtonText}
        </Link>

      </section>
      {/*trusted logos*/}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-center text-3xl mb-12">
            {home?.trustedText}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">

            {home?.trustedLogos?.map((logo: any, index: number) => (
              <div
                key={index}
                className="flex justify-center"
              >
                <img
                  src={urlFor(logo).url()}
                  alt={`Logo ${index + 1}`}
                  className="max-h-25 object-contain rounded"
                />
              </div>
            ))}

          </div>

        </div>
      </section>
      {/*Attacker section*/}
      <section className="relative py-15 overflow-hidden bg-cover bg-no-repeat bg-center" style={{
          backgroundImage: `url(${urlFor(home.changeBackgroundImage).url()})`,
        }}>

        {/* Dark Overlay */}
        {/* <div className="absolute inset-0"></div> */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-15">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left Column */}
            <div>
              {home?.changeSectionImage && (
                <img
                  src={urlFor(home.changeSectionImage).url()}
                  alt={home.changeTitle}
                  className="w-full rounded-2xl"
                />
              )}
            </div>

            {/* Right Column */}
            <div>

              <p className="inline-block uppercase tracking-widest text-sm mb-4 px-3 py-1 rounded bg-[#bbcfea4d] border border-[#bbcfea] ">
                {home?.changeSmallTitle}
              </p>

              <h2 className="text-5xl mb-6 leading-tight">
                {home?.changeTitle}
              </h2>

              <p className="text-lg leading-relaxed">
                {home?.changeDescription}
              </p>

            </div>

          </div>

        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-15">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* left Column */}
            <div>

              <p className="inline-block uppercase tracking-widest text-sm mb-4 px-3 py-1 rounded bg-[#bbcfea4d] border border-[#bbcfea]">
                {home?.solutionSmallTitle}
              </p>

              <h2 className="text-5xl mb-6 leading-tight">
                {home?.solutionTitle}
              </h2>

              <p className="text-lg leading-relaxed">
                {home?.solutionDescription}
              </p>

            </div>

            {/* right Column */}
            <div>
              {home?.solutionSectionImage && (
                <img
                  src={urlFor(home.solutionSectionImage).url()}
                  alt={home.solutionTitle}
                  className="w-full rounded-2xl"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      {/*Diffrentiation*/}
      <section className="py-30 bg-black">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-center mb-16 text-white">
            {home?.differentiationSectionTitle}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {home?.differentiationCards?.map((card: any) => (

              <div
                key={card._key}
                className="p-6 rounded-2xl border border-gray-800 transition-all duration-300 hover:border-[#ccff00] hover:shadow-[20px_0_50px_10px_#ccff0033]"
              >

                <h3 className="text-2xl mb-4 text-white">
                  {card.title}
                </h3>

                <p className="text-gray-500">
                  {card.description}
                </p>

                {card.image && (
                  <img
                    src={urlFor(card.image).url()}
                    alt={card.title}
                    className="w-full h-40 object-contain mb-6 mt-6"
                  />
                )}

              </div>

            ))}

          </div>

        </div>

      </section>
      {/*Progress card*/}
      <section className="py-24 bg-cover bg-center"
        style={{
          backgroundImage: home?.processBackgroundImage
          ? `url(${urlFor(home.processBackgroundImage).url()})`
          : "none",
        }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-20">

            {/* Left Column */}
            <div>

              <p className="inline-block uppercase tracking-widest text-sm mb-4 px-3 py-1 rounded bg-[#bbcfea4d] border border-[#bbcfea]">
                {home?.processSmallTitle}
              </p>

              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl">
                {home?.processTitle}
              </h2>

            </div>

            {/* Right Column */}
            <div className="space-y-10">

              {home?.processCards?.map((card: any, index: number) => (

                <div
                  key={card._key}
                  className="sticky top-20">

                  {/* Content */}
                  <div className="grid md:grid-cols-2 gap-6 items-center border border-gray-300 bg-white rounded-xl p-6 hover:border-[#bbcfea] hover:shadow-[20px_0_50px_10px_#bbcfea80]">
                    <div>
                      <span className="text-1xl">
                        {card.number}
                      </span>

                      <h3 className="text-2xl mt-3 mb-3">
                        {card.title}
                      </h3>

                      <p className="text-gray-500">
                        {card.description}
                      </p>

                    </div>

                    {/* Image */}
                    <div>

                      {card.image && (
                        <img
                          src={urlFor(card.image).url()}
                          alt={card.title}
                          className="w-full rounded-xl"
                        />
                      )}

                    </div>
                  </div>

                </div>

              ))}

            </div>

          </div>
        </div>
      </section>
      {/*Testimonial*/}
      <section
          className="relative py-24 overflow-hidden bg-black text-white"
        >

          {/* Background Image */}
          {home?.testimonialBackgroundImage && (
            <img
              src={urlFor(home.testimonialBackgroundImage).url()}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}

          <div className="relative z-10 max-w-7xl mx-auto px-6">

            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left Column */}
              <div>

                <h2 className="text-l uppercase mb-8">
                  {home?.testimonialTitle}
                </h2>

                <blockquote className="text-3xl leading-relaxed mb-8">
                  "{home?.testimonialQuote}"
                </blockquote>

                <div>
                  <p className="" style={{ color: "#cf0" }}>
                    {home?.testimonialPersonName}
                  </p>
                   <p className="">
                    {home?.testimonialPersonRole}
                  </p>
                </div>

              </div>

              {/* Right Column */}
              <div className="relative">

                <iframe
                  src={home?.testimonialVideoUrl}
                  className="w-full aspect-video rounded-xl"
                  allowFullScreen
                />

              </div>

            </div>

          </div>

      </section>
      {/*demo*/}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Column */}
            <div>

              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl mb-8">
                {home?.demoTitle}
              </h2>

              {home?.demoButtonText && home?.demoButtonLink && (
                <Link
                  href={home.demoButtonLink}
                  className="inline-flex px-6 py-3 rounded-full font-semibold bg-[#ccff00] hover:bg-[#e9eef7]"
                >
                  {home.demoButtonText}
                </Link>
              )}

            </div>

            {/* Right Column */}
            <div>

              {home?.demoImage && (
                <img
                  src={urlFor(home.demoImage).url()}
                  alt={home.demoTitle}
                  className="w-full rounded-2xl border border-[#0000001a] shadow-[30px_20px_30px_#bbcfea4d]"
                />
              )}

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}