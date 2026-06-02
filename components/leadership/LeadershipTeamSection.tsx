import { urlFor } from "@/lib/integrations/sanity/sanity";

type Leader = {
  image?: any;
  name?: string;
  designation?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
};

type LeadershipTeamSectionProps = {
  data: {
    leaders?: Leader[];
  };
};

export default function LeadershipTeamSection({
  data,
}: LeadershipTeamSectionProps) {
  return (
    <section className="relative z-20 -mt-40">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.leaders?.map((leader, index) => (
                <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                {/* Top Row */}
                <div className="grid grid-cols-2 gap-4 p-5">

                    {/* Left Column */}
                    <div>
                        <h3 className="text-xl font-semibold">
                            {leader.name}
                        </h3>

                        <p className="mt-2 text-gray-600">
                            {leader.designation}
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-row justify-end gap-2 text-sm">

                        {leader.linkedin && (
                            <a
                            href={leader.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            >
                            LinkedIn
                            </a>
                        )}

                        {leader.github && (
                            <a
                            href={leader.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            >
                            GitHub
                            </a>
                        )}

                        {leader.twitter && (
                            <a
                            href={leader.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                            >
                            X
                            </a>
                        )}

                    </div>
                </div>

                {/* Bottom Row */}
                {leader.image && (
                    <img
                    src={urlFor(leader.image).url()}
                    alt={leader.name}
                    className="w-full h-80 object-cover p-5"
                    />
                )}
                </div>
            ))}
            </div>
      </div>
    </section>
  );
}