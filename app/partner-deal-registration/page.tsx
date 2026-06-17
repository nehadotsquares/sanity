
import { client } from "@/lib/integrations/sanity/sanity"
import { DEAL_REGISTRATION_PAGE } from "@/lib/integrations/sanity/queries";
import DealForm from "@/components/dealForm/DealForm"

export default async function Page() {
  const data = await client.fetch(DEAL_REGISTRATION_PAGE)

  return (
    <div style={{ background: "#fcfcfc" }}>
        <section className="max-w-7xl mx-auto py-20 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    {/* LEFT CONTENT */}
                    <div className="p-10 lg:sticky lg:top-24 self-start">
                        <h1 className="text-6xl mb-6">
                        {data?.title}
                        </h1>

                        <p className="text-gray-600 leading-7">
                        {data?.description}
                        </p>
                    </div>

                    {/* RIGHT FORM */}
                    <DealForm submitText={data?.submitText} />
            
            </div>
        </section>
    </div>
  )
}