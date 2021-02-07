import DodajStavkuItem from "../../components/DodajStavkuItem/DodajStavkuItem"
import FormContainer from "../../components/FormContainer/FormContainer"
import StavkaFaktureItem from "../../components/StavkaFaktureItem/StavkaFaktureItem"

const UnosIzlazneFakture = () => {
    return (
        <FormContainer formName="Unos izlazne fakture">
            <div className="w-full">
                <form className="w-full flex flex-col px-2">
                    <div className="my-2 flex flex-row">
                        <span className="font-medium mr-4">
                            Godina
                        </span>
                        <span>
                            2021
                        </span>
                        <span className="font-medium mx-4">
                            BrojFakture
                        </span>
                        <span>
                            5
                        </span>
                    </div>
                    <div className="my-2">
                        <span className="font-medium">Kupac</span>
                        <select className="shadow-sm w-full h-10 px-2 rounded">
                            <option value="k1">Kupac 1</option>
                            <option value="k2">Kupac 2</option>
                        </select>
                    </div>
                    <div className="my-2">
                        <span className="font-medium">Datum fakture</span>
                        <input type="date" className="shadow-sm w-full h-10 px-2 rounded" name="" id="" />
                    </div>
                    <div className="my-2">
                        <span className="font-medium">Datum valute</span>
                        <input type="date" className="shadow-sm w-full h-10 px-2 rounded" name="" id="" />
                    </div>
                    <div className="my-2">
                        <span className="font-medium">Stavke</span>
                        <div className="w-full">
                            <DodajStavkuItem />
                            <StavkaFaktureItem />
                            <StavkaFaktureItem />
                            <StavkaFaktureItem />
                        </div>
                    </div>
                    <div className="my-2 w-100 flex flex-row justify-end">
                        <button type="submit" className="bg-green-500 py-1 px-2 font-medium text-white rounded-md h-10">Next</button>
                    </div>
                </form>
            </div>
        </FormContainer>
    )
}

export default UnosIzlazneFakture