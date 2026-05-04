// app/(public)/layout.tsx
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* You can put a shared public header here later */}
      {children}
    </section>
  )
}
