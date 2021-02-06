
const DodajStavkuItem = () => {
    return (
        <div className="container w-full mx-1 my-2 py-1 shadow-md px-2 border rounded">
           <form className="flex flex-row">
                <select name="" id="" className="h-10 flex-grow rounded border-opacity-25">
                    <option value="s1">Stavka1</option>
                    <option value="s2">Stavka2</option>
                </select>
                <input type="number" name="kolicina" id="kolicina" placeholder="Kolicina" className="h-10 px-2 ml-1 w-2/12 rounded border-opacity-25"/>
                <input type="number" name="rabat" id="rabat" placeholder="Rabat" className="h-10 px-2 ml-1 w-2/12 rounded border-opacity-25"/>
                <input type="number" name="cena" id="cena" placeholder="Cena" className="h-10 px-2 ml-1 w-2/12 rounded border-opacity-25"/>
            
                <button type="submit" className="px-4 ml-1 align-self-end bg-green-500 rounded text-white justify-self-end font-medium">Dodaj</button>
           </form>
        </div>
    )
}

export default DodajStavkuItem