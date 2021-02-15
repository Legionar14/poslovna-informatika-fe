import { Link } from "react-router-dom"

const Navbar = ()=>{
  return (
    <div className="width-full border-md shadow-md h-10 px-8 flex flex-row items-center justify-start">
      <h1 className="font-bold mr-4"><Link to="/">Poslovna informatika - Podsistem prodaje</Link></h1>
      <div className="mr-2 font-semibold"><Link to="/unos-izlazne-fakture">Unos izlazne fakture</Link></div>
    </div>
  )
}

export default Navbar