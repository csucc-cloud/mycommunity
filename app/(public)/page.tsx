import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center bg-white border-b">
        <h1 className="text-2xl font-bold text-blue-600">SchoolFlow</h1>
        <div className="space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Sign In</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl font-extrabold mb-4">
          Management & Monitoring <br /> Made Simple.
        </h2>
        <p className="text-xl text-gray-500 mb-8 max-w-2xl">
          The all-in-one platform for school activities, real-time event monitoring, 
          and community interaction.
        </p>
        <div className="flex gap-4">
          <Link href="/signup" className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold">
            Get Started
          </Link>
          <Link href="/about" className="px-8 py-3 border border-gray-300 rounded-full text-lg font-semibold">
            Learn More
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center border-t text-gray-400 text-sm">
        <div className="space-x-4 mb-2">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        © 2026 SchoolFlow SMS. All rights reserved.
      </footer>
    </div>
  );
}
