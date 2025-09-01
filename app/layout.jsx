import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata = {
  title: "Great Gatsby AI - Chat with Literary Characters",
  description: "Step into the world of F. Scott Fitzgerald and engage with iconic characters from The Great Gatsby"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
