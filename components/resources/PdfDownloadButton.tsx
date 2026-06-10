"use client"

import { useState } from "react"

export function PdfDownloadButton({ url }: { url: string }) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)

    const res = await fetch(url)
    const blob = await res.blob()

    const blobUrl = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = blobUrl
    a.download = "document.pdf"
    document.body.appendChild(a)
    a.click()
    a.remove()

    window.URL.revokeObjectURL(blobUrl)

    setLoading(false)
  }

  return (
    <button
      onClick={handleDownload}
      className="text-blue-600 underline"
      disabled={loading}
    >
      {loading ? "Downloading..." : "Download PDF"}
    </button>
  )
}