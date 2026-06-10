"use client"

interface ResourceSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ResourceSearch({
  value,
  onChange,
}: ResourceSearchProps) {
  return (
      <input
        type="text"
        placeholder="Search resources..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-gray-300 px-4 py-1 focus:outline-none"
      />
  )
}