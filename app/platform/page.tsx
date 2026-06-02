
import { PLATFORM_PAGE_QUERY } from "@/lib/integrations/sanity/queries";
import { client } from "@/lib/integrations/sanity/sanity";
import HeroSection from "@/components/platform/HeroSection";
import FeatureSection from "@/components/platform/FeatureSection";
import TestSection from "@/components/platform/TestSection";
import ResultSection from "@/components/platform/ResultSection";
import SolutionSection from "@/components/platform/SolutionSection";
import SingleAgentSection from "@/components/platform/SingleAgentSection";
import DesignedSection from "@/components/platform/DesignedSection";
import ProductionSection from "@/components/platform/ProductionSection";
import SecuritySection from "@/components/platform/SecuritySection";

export async function generateMetadata() {
  const pageData = await client.fetch(PLATFORM_PAGE_QUERY);

  return {
    title:
      pageData?.seo?.metaTitle ||
      pageData?.title,

    description:
      pageData?.seo?.metaDescription,
  };
}

export default async function PlatformPage() {
  const pageData = await client.fetch(PLATFORM_PAGE_QUERY);

  if (!pageData) {
    return <div>Platform page not found</div>;
  }

  return (
    <main>
     {pageData.sections?.map((section: any, index: number) => {
        if (section._type === "heroSection") {
            return <HeroSection key={index} data={section} />;
        }

        if (section._type === "featureSection") {
            return <FeatureSection key={index} data={section} />;
        }

        if (section._type === "testSection") {
            return <TestSection key={index} data={section} />;
        }

        if (section._type === "resultSection") {
            return <ResultSection key={index} data={section} />;
        }

        if (section._type === "solutionSection") {
            return <SolutionSection key={index} data={section} />;
        }

        if (section._type === "singleAgentSection") {
            return <SingleAgentSection key={index} data={section} />;
        }

        if (section._type === "designedSection") {
            return <DesignedSection key={index} data={section} />;
        }

        if (section._type === "productionSection") {
            return <ProductionSection key={index} data={section} />;
        }

        if (section._type === "securitySection") {
            return <SecuritySection key={index} data={section} />;
        }

        return null;
        }
     )}
    </main>
  );
}