import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Options from '../../assets/more-options.svg';

const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setShowMenu(!showMenu)} aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <a href="/"><img className="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Poslovna" /></a>
            </div>
          </div>
          <div className="flex-2 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a href="/cenovnici" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Cenovnici</a>
                <a href="/pregled-izlazne-fakture" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pregled izlazne fakture</a>
                <a href="/kif" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">KIF</a>
                <a href="/unos-izlazne-fakture" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Unos fakture</a>
                <a href="/kreiranje-cenovnka" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Kreiranje cenovnika</a>
              </div>
            </div>
            <div className="ml-3 relative">
              <div>
                <button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true" onClick={() => setShowUserMenu(!showUserMenu)}>
                  <img className="h-8 w-8 rounded-full" src={Options} alt="More options" />
                </button>
              </div>

              <div className={`${showUserMenu ? "" : "hidden"} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <a href="/jedinice-mere" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Jedinice mere</a>
                <a href="/roba-ili-usluga" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Roba ili usluga</a>
                <a href="/grupa-robe-ili-usluge" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Grupa robe ili usluge</a>
                <Link to="/unos-pdv-kategorije" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Unos pdv kategorije</Link>
                <Link to="/unos-pdv-stope" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Unos pdv stope</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${showMenu ? "" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="/cenovnici" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Cenovnici</a>
          <a href="/pregled-izlazne-fakture" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pregled izlazne fakture</a>
          <a href="/kif" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">KIF</a>
          <a href="/unos-izlazne-fakture" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Unos fakture</a>
          <a href="/kreiranje-cenovnka" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Kreiranje cenovnika</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;