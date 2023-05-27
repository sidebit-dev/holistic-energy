import './globals.css'

export const metadata = {
  title: 'Holistic energy',
  description: 'A Energia Holística do Universo!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
