import type { Metadata, Viewport } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CaseTrack — Medical case management for clinicians",
  description:
    "A focused mobile companion for doctors and surgeons. Track patients, capture cases, and document daily ward rounds without the paperwork.",
  applicationName: "CaseTrack",
  appleWebApp: {
    capable: true,
    title: "CaseTrack",
    statusBarStyle: "default",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a4d4a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} bg-background`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
