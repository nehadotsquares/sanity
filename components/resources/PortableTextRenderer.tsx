import { PortableText } from "@portabletext/react"
import slugify from "slugify"

const components = {
  block: {
    h2: ({ children }: any) => {
      const text = children?.join("") || ""
      const id = slugify(text, { lower: true })

      return (
        <h2 id={id} className="mt-10 mb-4 text-3xl">
          {children}
        </h2>
      )
    },

    h3: ({ children }: any) => {
      const text = children?.join("") || ""
      const id = slugify(text, { lower: true })

      return (
        <h3 id={id} className="mt-8 mb-3 text-2xl">
          {children}
        </h3>
      )
    },
  },
}
export function PortableTextRenderer({
  value,
}: any) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          normal: ({ children }) => (
            <p className="mb-4 leading-7 text-gray-700">
              {children}
            </p>
          ),

          h1: ({ children }) => (
            <h1 className="mb-4 text-3xl font-bold">
              {children}
            </h1>
          ),

          h2: ({ children }: any) => {
            const text = Array.isArray(children)
              ? children.join("")
              : String(children)
            const id = createSlug(text)
            return (
              <h2
                id={id}
                className="mb-3 text-2xl font-semibold"
              >
                {children}
              </h2>
            )
          },

          h3: ({ children }) => (
            <h3 className="mb-2 mt-5 text-2xl">
              {children}
            </h3>
          ),

          h4: ({ children }) => (
            <h4 className="mb-2 mt-5 text-xl">
              {children}
            </h4>
          ),
        },

        list: {
          bullet: ({ children }) => (
            <ul className="mb-5 list-disc pl-6 space-y-2">
              {children}
            </ul>
          ),
          number: ({ children }) => (
            <ol className="mb-5 list-decimal pl-6 space-y-2">
              {children}
            </ol>
          ),
        },

        marks: {
          strong: ({ children }) => (
            <strong className="font-semibold">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          link: ({ value, children }) => (
            <a
              href={value?.href}
              className="text-blue-600 underline"
              target="_blank"
            >
              {children}
            </a>
          ),
        },
      }}
    />
  )
}
export function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")        // remove apostrophes explicitly
    .replace(/[^\w\s-]/g, "")    // remove other symbols
    .replace(/\s+/g, "-")        // spaces → dash
}