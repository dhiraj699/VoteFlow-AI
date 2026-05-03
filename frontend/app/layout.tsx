import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VoteFlow-AI | Electoral Awareness Platform',
  description: 'Interactive platform for voter education, election timelines, and AI-powered candidate research',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
