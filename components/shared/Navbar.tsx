import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 border-b bg-white">
      <Link href="/" className="text-xl font-bold text-blue-600">SchoolFlow</Link>
      <div className="space-x-4">
        <Link href="/about" className="text-gray-600">About</Link>
        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Login</Link>
      </div>
    </nav>
  )
}
