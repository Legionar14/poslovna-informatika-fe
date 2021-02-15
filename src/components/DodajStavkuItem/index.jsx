import { useMemo, useState, useRef, useCallback } from "react"
import { v4 as uuid } from 'uuid'

const DodajStavkuItem = ({ dodajStavku, stavkePreduzeca, cenovnik }) => {
  const [stavka, setStavka] = useState()
  const jedinicnaCenaStavke = useMemo(() => {
    if (stavka)
      return cenovnik?.stavkeCenovnika.find(st => st.robaIliUsluga.id === stavka?.id)?.cena || 0
    else return 0
  }, [cenovnik, stavka])

  const [kolicina, setKolicina] = useState(0)
  const [rabat, setRabat] = useState(0)
  const rabatRef = useRef()
  const rabatJedRef = useRef()

  const jedinicaMere = useMemo(() => stavka?.jedinicaMere.naziv || 'komada', [stavka])

  const cena = useMemo(() => jedinicnaCenaStavke * (kolicina || 0), [kolicina, jedinicnaCenaStavke])

  const tipRabata = useMemo(() => ['%', 'rsd'], [])

  const stavkaChange = useCallback(({ target: { value } }) => {
    if (value) setStavka(stavkePreduzeca?.find(s => s.id === value))
  }, [setStavka, stavkePreduzeca])

  const kolicinaChange = useCallback(({ target: { value } }) => {
    if (value) setKolicina(value)
  }, [setKolicina])

  const rabatChange = useCallback(() => {
    const rbt = rabatJedRef.current.value === '%' ? parseFloat(((cena / 100) * rabatRef.current.value).toFixed(4)) : parseFloat(rabatRef.current.value)
    setRabat(rbt)
  }, [setRabat, rabatRef, rabatJedRef, cena])

  const formValid = useMemo(() => cenovnik && stavka && kolicina > 0 && rabat >= 0 && rabat < cena, [stavka, rabat, kolicina, cena, cenovnik])

  const dodajBtnClick = useCallback((e) => {
    e.preventDefault()
    if (formValid) {
      dodajStavku({
        id: uuid(),
        kolicina,
        rabat,
        robaIliUsluga: stavka,
        jedinicnaCena: jedinicnaCenaStavke
      })
      return false
    }
  }, [formValid, kolicina, rabat, stavka, dodajStavku, jedinicnaCenaStavke])

  console.debug(`Cena: ${cena}. Jedinica mere ${jedinicaMere}. Tip rabata ${tipRabata}. Rabat ${rabat}. Jedinicna cena ${jedinicnaCenaStavke}`)
  return (
    <div className="container w-full mx-1 my-2 py-1 shadow-md px-2 border rounded">
      <div className="flex flex-row items-center">
        <select name="stavka" id="stavka" onChange={stavkaChange} defaultValue="" className="h-10 flex-grow rounded">
          <option value="" disabled hidden>Izaberite artikal</option>
          {
            stavkePreduzeca?.map(s => (
              <option value={s.id} key={s.id}>{s.naziv}</option>
            ))
          }
        </select>
        <input type="number" name="kolicina" id="kolicina" placeholder="Kolicina" min={0} onChange={kolicinaChange} className="h-10 px-2 ml-1 w-2/12 rounded" />
        <span className="pr-2 ml-1">{jedinicaMere}</span>
        <span className="px-2 ml-1 font-medium">Rabat:</span>
        <input type="number" name="rabat" id="rabat" placeholder={0} min={0} ref={rabatRef} onChange={rabatChange} />
        <select name="tipRabata" id="tipRabata" ref={rabatJedRef} onChange={rabatChange} className="h-10 rounded ml-2">
          {
            tipRabata.map((t, i) => (
              <option value={t} key={i}>{t}</option>
            ))
          }
        </select>
        <button disabled={!formValid} onClick={dodajBtnClick} className="h-10 px-4 ml-1 align-self-end bg-green-500 disabled:opacity-50 rounded justify-self-end font-medium text-white">
          Dodaj
        </button>
      </div>
    </div>
  )
}

export default DodajStavkuItem