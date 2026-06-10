"use client"

import { useMemo, useState } from "react"

import { ResourceTabs } from "./ResourceTabs"
import { ResourceCard } from "./ResourceCard"
import { ResourceSearch } from "./ResourceSearch"

export function ResourceListing({
  resources,
}: {
  resources: any[]
}) {
  const [activeTab, setActiveTab] =
    useState("all")

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

          // const matchesSearch =
          //   resource.title
          //     .toLowerCase()
          //     .includes(
          //       searchTerm.toLowerCase()
          //     )
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
            onChange={setActiveTab}
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