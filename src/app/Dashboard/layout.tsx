import '../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dai - Dashboard',
    description: 'Dai dashboard',
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
