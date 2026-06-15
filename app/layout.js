import './globals.css'

export const metadata = {
  title: 'Project Atlas | Premium Directory',
  description: 'Curated niche tools and resources.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}