import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Overlay na zdjęcie */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        {/* Miejsce na zdjęcie w tle */}
        <div className="absolute inset-0">
          <Image
            src="/gym-background.jpg" // Tu trzeba dodać własne zdjęcie
            alt="Siłownia FlexiFit"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Navbar */}
        <nav className="relative z-20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="text-4xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              FlexiFit
            </span>
            <div className="space-x-4">
              <Link 
                href="/login"
                className="px-6 py-2 text-white hover:text-gray-200 transition-colors font-semibold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
              >
                Logowanie
              </Link>
              <Link 
                href="/register"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity font-semibold"
              >
                Dołącz do nas
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Przekraczaj swoje <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                granice
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Dołącz do społeczności FlexiFit i rozpocznij swoją transformację już dziś!
            </p>
            <Link 
              href="/register"
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity text-white"
            >
              Rozpocznij za darmo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Co oferujemy?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Zajęcia grupowe
              </h3>
              <p className="text-gray-800 text-lg">
                Różnorodne zajęcia prowadzone przez doświadczonych instruktorów
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Elastyczne karnety
              </h3>
              <p className="text-gray-800 text-lg">
                Wybierz karnet dopasowany do Twoich potrzeb i harmonogramu
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Rezerwacje online
              </h3>
              <p className="text-gray-800 text-lg">
                Łatwe zarządzanie zajęciami przez intuicyjny system rezerwacji
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-8">
            Gotowy na zmiany?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Dołącz do FlexiFit już dziś i rozpocznij swoją przygodę z fitness!
          </p>
          <div className="space-x-4">
            <Link 
              href="/register"
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Załóż konto
            </Link>
            <Link 
              href="/login"
              className="inline-block px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Zaloguj się
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">FlexiFit</h3>
              <p className="text-gray-400">
                Twoje centrum fitness z nowoczesnym podejściem do treningu
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
              <p className="text-gray-400">
                ul. Przykładowa 123<br />
                00-000 Warszawa<br />
                tel: +48 123 456 789<br />
                email: kontakt@flexifit.pl
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Godziny otwarcia</h4>
              <p className="text-gray-400">
                Poniedziałek - Piątek: 6:00 - 23:00<br />
                Sobota: 8:00 - 22:00<br />
                Niedziela: 8:00 - 21:00
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FlexiFit. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
