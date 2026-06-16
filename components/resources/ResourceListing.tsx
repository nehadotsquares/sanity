"use client"

import { useMemo, useState, useEffect } from "react"
import { useSearchParams, useRouter, } from "next/navigation"
import { ResourceTabs } from "./ResourceTabs"
import { ResourceCard } from "./ResourceCard"
import { ResourceSearch } from "./ResourceSearch"

export function ResourceListing({
  resources,
  initialType
}: {
  resources: any[],
  initialType: string
}) {
  const router = useRouter()

  const [activeTab, setActiveTab] =
    useState(initialType)

  useEffect(() => {
    setActiveTab(initialType)
  }, [initialType])

  const [searchTerm, setSearchTerm] =
    useState("")

  const filteredResources =
    useMemo(() => {
      return resources.filter(
        (resource) => {
          const matchesTab =
            activeTab === "all"
              ? true
              : resource.resourceType ===
                activeTab

          const matchesSearch =
          typeof resource.title === "string" &&
          resource.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

          return (
            matchesTab &&
            matchesSearch
          )
        }
      )
    }, [
      resources,
      activeTab,
      searchTerm,
    ])

  return (
      <>
      {/* Tabs + Search */}
      <div className="mb-10 flex items-center justify-between gap-6">
        <div className="flex-1">
          <ResourceTabs
            activeTab={activeTab}
            onChange={(value) => {
              setActiveTab(value)
              if (value === "all") {
                router.replace("/resources")
              } else {
                router.replace(
                  `/resources?type=${value}`
                )
              }
            }}
          />
        </div>

        <div className="w-[320px] shrink-0">
          <ResourceSearch
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
      </div>

    {/* Cards */}
    <div className="grid gap-8 md:grid-cols-3 xl:grid-cols-3">
      {filteredResources.map(
        (resource) => (
          <ResourceCard
            key={resource._id}
            resource={resource}
          />
        )
      )}
    </div>
    </>
  )
}