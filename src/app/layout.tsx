"use client"

// import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import Header from "./components/header"
import Footer from "./components/footer"
import { ThemeProvider } from "./components/theme-provider"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
            <Suspense fallback={<div className="text-center">Loading...</div>}>{children}</Suspense>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
