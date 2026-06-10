"use client"

interface Props {
  activeTab: string
  onChange: (value: string) => void
}

const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Videos",
    value: "video",
  },
  {
    label: "Webinars",
    value: "webinar",
  },
  {
    label: "Customer Stories",
    value: "customer_stories",
  },
  {
    label: "White Papers",
    value: "white_paper",
  },
  {
    label: "Briefs",
    value: "briefs",
  },
  {
    label: "Poadcast",
    value: "podcast",
  },
]

export function ResourceTabs({
  activeTab,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() =>
            onChange(tab.value)}
          className={`rounded px-4 py-1 text-sm transition hover:border-[#bbcfea] ${
            activeTab === tab.value
              ? "bg-black text-white"
              : "border border-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}