import { useMemo } from "react"
import FormContainer from "../../components/FormContainer"
import PdvSumaTable from "../../components/PdvSumaTable/PdvSumaTable"
import StavkeFaktureTable from "../../components/StavkeFaktureTable/StavkeFaktureTable"

const PregledIzlazneFakture = () => {
	const stavke = useMemo(
		() =>
			[
				{
					nazivRobe: "Intel",
					jedinicaMere: "kom",
					kolicina: 10,
					cenaBezPdv: 100,
					rabat: 0,
					osnovica: 100,
					pdvProcenat: 18,
					pdv: 244,
					ukupno: 1600
				},
				{
					nazivRobe: "Amd",
					jedinicaMere: "kom",
					kolicina: 10,
					cenaBezPdv: 100,
					rabat: 0,
					osnovica: 100,
					pdvProcenat: 18,
					pdv: 244,
					ukupno: 1600
				}
			], []
	)

	const tarifePdv = useMemo(() => [
		{
			tarifa: 0,
			osnovica: 0,
			pdvIznos: 0,
			vrSaPdv: 0
		},
		{
			tarifa: 8,
			osnovica: 0,
			pdvIznos: 0,
			vrSaPdv: 0
		},
		{
			tarifa: 18,
			osnovica: 5563.22,
			pdvIznos: 1006.78,
			vrSaPdv: 6600
		},
	], [])

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
			<div className="w-full mt-4">
				<StavkeFaktureTable stavke={stavke} />
			</div>
			<div className="w-full mt-4 flex flex-row justify-between">
				<PdvSumaTable stavke={tarifePdv} />
				<div className="w-6/12 grid grid-cols-2 text-right">
					<span className="font-medium">
						Rabat:
					</span>
					<span>
						0.00
					</span>
					<span className="font-medium">
						Osnovica:
					</span>
					<span>
						5593.22
					</span>
					<span className="font-medium">
						PDV:
					</span>
					<span>
						1006.78
					</span>
					<span className="font-medium">
						Vrednost:
					</span>
					<span>
						6600.00
					</span>
				</div>
			</div>
			<div className="w-full mt-4 flex flex-row justify-between align-center">
				<div className="">
					<button className="bg-blue-500 text-white px-4 rounded py-2">Izmena stavki</button>
				</div>
				<div className="flex flex-row">
					<button className="bg-green-500 text-white px-4 rounded py-2 mr-2">Sacuvaj</button>
					<button className="bg-red-500 text-white px-4 rounded py-2">Sacuvaj i zatvori</button>
				</div>
			</div>
		</FormContainer>
	)
}

export default PregledIzlazneFakture