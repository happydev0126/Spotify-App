export const metadata = {
  title: 'Sclonetify',
  description: 'A spotify clone by Jodarini',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
