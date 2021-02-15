import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DateTimeFormatter, LocalDate } from "@js-joda/core"
import { useMemo } from "react"

const StavkaFaktureItem = ({ stavka, obrisiStavku, datumFakture }) => {

  const procenatRabata = useMemo(() => {
    const { kolicina, jedinicnaCena, rabat } = stavka
    return kolicina && jedinicnaCena ? (100 * rabat) / (kolicina * jedinicnaCena) : 100
  }, [stavka])

  const jedinicnaCenaStavke = useMemo(() => stavka.jedinicnaCena || 0, [stavka])

  const ukupnaCena = useMemo(() => (jedinicnaCenaStavke * stavka.kolicina) - (stavka.rabat || 0), [jedinicnaCenaStavke, stavka])

  const dateTimeFormatter = useMemo(() => DateTimeFormatter.ofPattern("dd-MM-yyyy"), [])

  const procenatPdv = useMemo(() => stavka?.robaIliUsluga.grupaRobeIliUsluge.pdvKategorija.stopePDV
    .filter(stopa => {
      const datumVazenjaStope = LocalDate.from(dateTimeFormatter.parse(stopa.datumVazenja))
      const datumFaktureParsed = datumFakture ? LocalDate.from(dateTimeFormatter.parse(datumFakture)) : null
      return datumFaktureParsed && (datumVazenjaStope.isBefore(datumFaktureParsed) || datumVazenjaStope.isEqual(datumFaktureParsed))
    })
    .reduce((trenutnaNajvecaStopa, stopa) => {
      if (trenutnaNajvecaStopa) {
        const trenutnaNajvecaStopaVaziOd = LocalDate.from(dateTimeFormatter.parse(trenutnaNajvecaStopa.datumVazenja))
        const stopaVaziOd = LocalDate.from(dateTimeFormatter.parse(stopa.datumVazenja))
        return trenutnaNajvecaStopaVaziOd.isBefore(stopaVaziOd) ? stopa : trenutnaNajvecaStopa
      }
      else return stopa
    }, null)?.procenat || 0, [stavka, dateTimeFormatter, datumFakture])

  const ukupnoPdv = useMemo(() => ukupnaCena * (procenatPdv / 100), [ukupnaCena, procenatPdv])

  const ukupnoCena = useMemo(() => ukupnaCena + ukupnoPdv, [ukupnoPdv, ukupnaCena])

  return (
    <div className="container w-full mx-1 my-2 py-1 px-2 shadow-md flex flex-row items-center border rounded">
      <div className="flex-grow grid grid-cols-12 gap-2">
        <div className="font-medium">
          Naziv:
        </div>
        <div className="col-span-8">
          {stavka.robaIliUsluga.naziv}
        </div>
        <div className="font-medium">
          Kolicina:
        </div>
        <div className="text-right">
          {stavka.kolicina}
        </div>
        <div>
          {stavka.robaIliUsluga.jedinicaMere.naziv}
        </div>
        <div className="font-medium">
          Cena:
        </div>
        <div className="col-span-2">
          {jedinicnaCenaStavke} rsd / {stavka.robaIliUsluga.jedinicaMere.skraceniNaziv}
        </div>
        <div className="font-medium">
          Ukupno:
        </div>
        <div className="col-span-2">
          {
            jedinicnaCenaStavke * stavka.kolicina
          } rsd
        </div>
        <div className="font-medium">
          Rabat:
        </div>
        <div className="col-span-2">
          {stavka.rabat.toFixed(3)} rsd / {procenatRabata.toFixed(3)} %
        </div>
        <div className="font-medium">
          PDV:
        </div>
        <div className="col-span-2">
          {ukupnoPdv.toFixed(3)} rsd / {procenatPdv} %
        </div>
        <div className="font-medium col-span-2">
          Ukupno sa PDV:
        </div>
        <div className="col-span-5">
          {ukupnoCena.toFixed(3)} rsd
        </div>
      </div>
      <div className="w-1/12 flex flex-row items-center">
        <button className="bg-red-500 text-white w-full px-4 py-2 rounded-md font-medium" onClick={obrisiStavku}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  )
}

export default StavkaFaktureItem