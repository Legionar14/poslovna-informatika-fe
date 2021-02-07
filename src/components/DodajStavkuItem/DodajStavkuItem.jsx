
const DodajStavkuItem = () => {
    return (
        <div className="container w-full mx-1 my-2 py-1 shadow-md px-2 border rounded">
           <div className="flex flex-row items-center">
                <select name="" id="" className="h-10 flex-grow rounded">
                    <option value="s1">Stavka1</option>
                    <option value="s2">Stavka2</option>
                </select>
                <input type="number" name="kolicina" id="kolicina" placeholder="Kolicina" className="h-10 px-2 ml-1 w-2/12 rounded"/>
                <span className="px-2 ml-1 rounded font-medium">
                    Rabat:
                </span>
                <input type="number" name="rabat" id="rabat" placeholder="%" className="h-10 px-2 ml-1 w-2/12 rounded"/>
                <input type="number" name="cena" id="cena" placeholder="kolicina" className="h-10 px-2 ml-1 w-2/12 rounded"/>
            
                <button className="h-10 px-4 ml-1 align-self-end bg-green-500 rounded text-white justify-self-end font-medium">Dodaj</button>
           </div>
        </div>
    )
}

export default DodajStavkuItem