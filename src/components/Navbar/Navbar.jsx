import { useState } from "react/cjs/react.development";

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setShowMenu(!showMenu)} aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0 flex items-center">
              <a href="/"><img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Poslovna" /></a>
            </div>
          </div>
          <div class="flex-2 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <a href="/cenovnici" class="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Cenovnici</a>
                <a href="/pregled-izlazne-fakture" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pregled izlazne fakture</a>
                <a href="/kif" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">KIF</a>
                <a href="/unos-izlazne-fakture" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Unos fakture</a>
                <a href="/kreiranje-cenovnka" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Kreiranje cenovnika</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${showMenu ? "" : "hidden"}`}>
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a href="/cenovnici" class="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Cenovnici</a>
          <a href="/pregled-izlazne-fakture" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pregled izlazne fakture</a>
          <a href="/kif" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">KIF</a>
          <a href="/unos-izlazne-fakture" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Unos fakture</a>
          <a href="/kreiranje-cenovnka" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Kreiranje cenovnika</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;