
const DodajStavkuItem = () => {
    return (
        <div className="container w-full mx-1 my-2 py-1 shadow-md">
           <form className="flex flex-row">
                <select name="" id="" className="h-10 px-2">
                    <option value="s1">Stavka1</option>
                    <option value="s2">Stavka2</option>
                </select>
                <input type="number" name="kolicina" id="kolicina" placeholder="Kolicina" className="px-2 ml-1"/>
                <input type="number" name="rabat" id="rabat" placeholder="Rabat" className="px-2 ml-1"/>
                <input type="number" name="cena" id="cena" placeholder="Cena" className="px-2 ml-1"/>
            
                <button type="submit" className="px-4 ml-1 align-self-end bg-green-500 rounded text-white justify-self-end">Dodaj</button>
           </form>
        </div>
    )
}

export default DodajStavkuItem