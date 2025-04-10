import React from "react"

type HtmlContentProps = {
  content: string
}

export const HtmlRenderer: React.FC<HtmlContentProps> = ({ content }) => {
  return (
    <div
      className="prose prose-sm max-w-none text-gray-800"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
