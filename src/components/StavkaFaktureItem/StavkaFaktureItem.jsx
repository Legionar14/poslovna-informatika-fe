import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMemo } from "react"

const StavkaFaktureItem = ({ stavka, obrisiStavku }) => {

  const procenat = useMemo(() => {
    const { kolicina, rabat } = stavka
    return kolicina !== 0 ? (100 * rabat) / kolicina : 100
  }, [stavka])

  return (
    <div className="container w-full mx-1 my-2 py-1 shadow-md px-2 flex flex-row items-center border rounded">
      <div className="h-10 flex-grow flex flex-row items-center">
        <span className="font-medium px-1">
          Naziv:
                </span>
        <span>
          {stavka.robaIliUsluga.naziv}
        </span>
      </div>
      <div className="w-2/12 h-10 flex flex-row items-center">
        <span className="font-medium px-1">
          Kolicina:
                </span>
        <span>
          {stavka.kolicina}
        </span>
        <span className="ml-1">
          {stavka.robaIliUsluga.jedinicaMere.skraceniNaziv}
        </span>
      </div>
      <div className="w-4/12 h-10 flex flex-row items-center justify-between pr-4">
        <span className="font-medium px-1">
          Rabat:
                </span>
        <span>
          <span>
            {procenat}
          </span>
          <span className="ml-1">
            %
          </span>
        </span>
        <span>
          /
                </span>
        <span>
          <span>
            {stavka.rabat}
          </span>
          <span className="ml-1">
            {stavka.robaIliUsluga.jedinicaMere.skraceniNaziv}
          </span>
        </span>

      </div>
      <div className="w-1/12 h-10 flex flex-row items-center">
        <button className="bg-red-500 text-white w-full px-4 py-2 rounded-md font-medium" onClick={obrisiStavku}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  )
}

export default StavkaFaktureItem