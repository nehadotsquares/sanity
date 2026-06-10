import { getResources } from "@/lib/integrations/sanity/services/resources"

import { ResourceListing } from "@/components/resources/ResourceListing"

export default async function Page() {
  const resources =
    await getResources()

  return (
    <div>
      <section className="bg-black mb-20">
        <div className="container mx-auto py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-6xl text-white">
              Resources
            </h1>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto py-12">
          <ResourceListing
            resources={resources}
          />
        </div>
      </section>

    </div>  
  )
}