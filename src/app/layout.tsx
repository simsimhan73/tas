import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TAS',
  description: 'create by codit 2023 3rd team',
  viewport: 'width-device-width, initial-scale:1.0'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
