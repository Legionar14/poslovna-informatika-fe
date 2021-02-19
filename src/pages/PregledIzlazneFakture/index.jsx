import { useMemo, useEffect } from "react"
import NotificationManager from "react-notifications/lib/NotificationManager"
import { useHistory, useParams } from "react-router-dom"
import { useCallback } from "react/cjs/react.development"
import FormContainer from "../../components/FormContainer"
import PdvSumaTable from "../../components/PdvSumaTable"
import StavkeFaktureTable from "../../components/StavkeFaktureTable"
import useIzlaznaFaktura from "../../hooks/useIzlaznaFaktura"

const PregledIzlazneFakture = () => {
	const { id } = useParams();
	const history = useHistory();
	const { faktura, postojecaFaktura, setFakturaGotova, saveFaktura } = useIzlaznaFaktura();

	useEffect(() => {
		if (!faktura && id) postojecaFaktura(id);
	}, [id, faktura, postojecaFaktura]);

	const ukupanRabat = useMemo(() => faktura ? faktura.stavke.map(st => st.rabat).reduce((r1, r2) => r1 + r2) : 0, [faktura])

	const stavke = useMemo(() => faktura ? faktura.stavke.map((st, redniBroj) => ({ redniBroj, cenaBezPdv: st.jedinicnaCena * st.kolicina, ...st })) : [], [faktura])

	const tarifePdv = useMemo(() => faktura ? faktura.stavke
		.map(st => st.pdvstopa)
		.reduce((stope, stopa) => stope.find(stp => stp === stopa) ? stope : [...stope, stopa], [])
		.map(stopa => {
			const stavkeSaStopom = faktura.stavke.filter(st => st.pdvstopa === stopa)
			const osnovica = stavkeSaStopom.map(st => st.osnovicaZaPDV).reduce((sum, osn) => sum + osn, 0)
			const pdvIznos = stavkeSaStopom.map(st => st.iznosPDV).reduce((sum, izn) => sum + izn, 0)
			const vrSaPdv = stavkeSaStopom.map(st => st.ukupanIznos).reduce((sum, izn) => sum + izn, 0)
			return {
				tarifa: stopa,
				osnovica,
				pdvIznos,
				vrSaPdv
			}
		}) : [], [faktura])

	const onClickRedirectOnly = useCallback((path) => () => history.push(path), [history])

	const sacuvajIZatvoriBtnClick = useCallback(() => {
		if (faktura) {
			setFakturaGotova(true)
			saveFaktura((novaFaktura) => {
				console.debug(novaFaktura)
				NotificationManager.success(`Faktura sa brojem ${novaFaktura.brojFakture} uspesno zatvorena`)
				history.push(`/pregled-izlazne-fakture/${novaFaktura.id}`)
			}, (err) => {
				NotificationManager.error("Greska pri zatvaranju fakture")
				console.debug(err)
			})
		}
	}, [history, faktura, saveFaktura, setFakturaGotova])

	return (
		<FormContainer formName="Pregled izlazne fakture">
			{
				faktura && (
					<div>
						<div className="w-full grid grid-cols-2 mt-8">
							<span className="font-medium">
								Broj fakture:
        </span>
							<span>
								{faktura.brojFakture}
							</span>
							<span className="font-medium">
								Godina fakture:
        </span>
							<span>
								{faktura.poslovnaGodina.godina}
							</span>
							<span className="font-medium">
								Datum fakture:
        </span>
							<span>
								{faktura.datumFakture}
							</span>
							<span className="font-medium">
								Datum valute:
        </span>
							<span>
								{faktura.datumValute}
							</span>
							<span className="font-medium">
								Faktura zatvorena:
        </span>
							<span>
								{faktura.fakturaGotova ? 'Da' : 'Ne'}
							</span>
							<span className="font-medium">
								Kupac
        </span>
							<span>
								{faktura.kupac.naziv}
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
									{ukupanRabat}
								</span>
								<span className="font-medium">
									Osnovica:
					</span>
								<span>
									{faktura.ukupnaOsnovica}
								</span>
								<span className="font-medium">
									PDV:
					</span>
								<span>
									{faktura.ukupanPDV}
								</span>
								<span className="font-medium">
									Vrednost:
					</span>
								<span>
									{faktura.ukupanIznos}
								</span>
							</div>
						</div>
						{
							!faktura.fakturaGotova && (
								<div className="w-full mt-4 flex flex-row justify-between align-center">
									<div className="">
										<button className="bg-blue-500 text-white px-4 rounded py-2" onClick={onClickRedirectOnly(`/izmena-izlazne-fakture/${faktura.id}`)}>Izmena stavki</button>
									</div>
									<div className="flex flex-row">
										<button className="bg-green-500 text-white px-4 rounded py-2 mr-2" onClick={onClickRedirectOnly(`/`)}>Sacuvaj</button>
										<button className="bg-red-500 text-white px-4 rounded py-2" onClick={sacuvajIZatvoriBtnClick} >Sacuvaj i zatvori</button>
									</div>
								</div>
							)
						}
					</div>
				)
			}
		</FormContainer>
	)
}

export default PregledIzlazneFakture