export const metadata = {
    title: 'Bullgarage - Studio',
    description: 'Admin Sanity Studio for Bullgarage',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body style={{ margin: 0, padding: 0 }}>{children}</body>
        </html>
    )
}
