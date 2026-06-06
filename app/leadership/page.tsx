import LeadershipContentSection from "@/components/leadership/LeadershipContentSection";
import LeadershipHeroSection from "@/components/leadership/LeadershipHeroSection";
import LeadershipTeamSection from "@/components/leadership/LeadershipTeamSection";
import { LEADERSHIP_PAGE_QUERY } from "@/lib/integrations/sanity/queries";
import { client } from "@/lib/integrations/sanity/sanity";

export default async function LeadershipPage() {
	const pageData = await client.fetch(LEADERSHIP_PAGE_QUERY);

	return (
		<main>
			{pageData.sections?.map((section: any, index: number) => {
				switch (section._type) {
					case "leadershipHeroSection":
						return <LeadershipHeroSection key={index} data={section} />;

					case "leadershipTeamSection":
						return <LeadershipTeamSection key={index} data={section} />;

					case "leadershipContentSection":
						return <LeadershipContentSection key={index} data={section} />;

					default:
						return null;
				}
			})}
		</main>
	);
}
