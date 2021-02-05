import DodajStavkuItem from "../components/DodajStavkuItem"

const UnosIzlazneFakture = () => {
    return (
        <div className="container w-1/2 mx-auto mt-8 shadow-lg px-6 pt-4 rounded-lg">
            <div className="w-full">
                <h2 className="text-2xl font-semibold">
                    Unos izlazne fakture
                </h2>
            </div>
            <div className="w-full">
                <form className="w-full flex flex-col px-2">
                    <div className="my-2">
                        <span className="font-medium">Kupac</span>
                        <select className="shadow-sm w-full h-10 px-2">
                            <option value="k1">Kupac 1</option>
                            <option value="k2">Kupac 2</option>
                        </select>
                    </div>
                    <div className="my-2">
                        <span className="font-medium">Datum fakture</span>
                        <input type="date" className="shadow-sm w-full h-10 px-2" name="" id="" />
                    </div>
                    <div className="my-2">
                        <span className="font-medium">Datum valute</span>
                        <input type="date" className="shadow-sm w-full h-10 px-2" name="" id="" />
                    </div>
                    <div className="my-2">
                        <span className="font-medium">Stavke</span>
                        <div className="w-full">
                            <DodajStavkuItem/>
                        </div>
                    </div>
                    <div className="my-2 w-100 flex flex-row justify-between">
                        <button type="button" className="bg-blue-500 py-1 px-2 font-medium text-white rounded-md">Save</button>
                        <button type="submit" className="bg-red-500 py-1 px-2 font-medium text-white rounded-md">Save and finish</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UnosIzlazneFakture