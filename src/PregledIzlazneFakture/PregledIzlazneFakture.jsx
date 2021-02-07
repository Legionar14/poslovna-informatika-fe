import FormContainer from "../components/FormContainer/FormContainer"

const PregledIzlazneFakture = () => {
    return (
        <FormContainer formName="Pregled izlazne fakture">
            <div className="w-full grid grid-cols-2 mt-8">
                <span className="font-medium">
                    Broj fakture:
                </span>
                <span>
                    5
                </span>
                <span className="font-medium">
                    Godina fakture:
                </span>
                <span>
                    2021
                </span>
                <span className="font-medium">
                    Datum fakture:
                </span>
                <span>
                    7/2/2021
                </span>
                <span className="font-medium">
                    Datum valute:
                </span>
                <span>
                    7/2/2021
                </span>
                <span className="font-medium">
                    Kupac
                </span>
                <span>
                    Kupac 1
                </span>
            </div>
        </FormContainer>
    )
}

export default PregledIzlazneFakture