import { useCallback } from "react"
import { useRef } from "react"
import { useState } from "react"
import { useMemo } from "react/cjs/react.development"
import { v4 as uuid } from 'uuid'
import usePreduzece from "../../hooks/usePreduzece"

const DodajStavkuItem = ({dodajStavku}) => {
    const { stavkePreduzeca: stavke } = usePreduzece()
    const [ stavka, setStavka ] = useState()
    const [ kolicina, setKolicina ] = useState(0)
    const [ rabat, setRabat ] = useState(0)
    const rabatRef = useRef()
    const rabatJed = useRef()

    const jedinicaMere = useMemo(()=> stavka?.jedinicaMere.naziv || 'komada', [stavka])

    const tipRabata = useMemo(()=>{
        return ['%', jedinicaMere ]
    }, [jedinicaMere])

    const stavkaChange = useCallback(({target: { value }}) => {
        if(value) setStavka(stavke?.find(s => s.id === value))
    }, [setStavka, stavke])

    const kolicinaChange = useCallback(({target: {value}}) => {
        if(value) setKolicina(value)
    }, [setKolicina])

    const rabatChange = useCallback(()=>{
        const rbt = rabatJed.current.value === '%' ? ((kolicina / 100) * rabatRef.current.value).toFixed(4) : rabatRef.current.value
        setRabat(rbt)
    }, [setRabat, rabatRef, rabatJed, kolicina])

    const formValid = useMemo(()=> (stavka && kolicina > 0 && rabat >= 0 && rabat < kolicina) || false, [stavka, rabat, kolicina])

    const dodajBtnClick = useCallback((e)=>{
        e.preventDefault()
        if(formValid) {
            dodajStavku({
                id: uuid(),
                kolicina,
                rabat,
                robaIliUsluga: stavka
            })
            return false
        }
    }, [formValid, kolicina, rabat, stavka, dodajStavku])

    return (
        <div className="container w-full mx-1 my-2 py-1 shadow-md px-2 border rounded">
            <div className="flex flex-row items-center">
                <select name="stavka" id="stavka" className="h-10 flex-grow rounded" onChange={stavkaChange} defaultValue="">
                    <option value="" disabled hidden>Izaberite artikal</option>
                    {stavke?.map(s=>(
                        <option value={s.id} key={s.id}>{s.naziv}</option>
                    ))}
                </select>
                <input type="number" name="kolicina" id="kolicina" placeholder="Kolicina" className="h-10 px-2 ml-1 w-2/12 rounded" min={0} onChange={kolicinaChange} />
                <span className="pr-2 ml-1">{jedinicaMere}</span>
                <span className="px-2 ml-1 rounded font-medium">
                    Rabat:
                </span>
                <input type="number" name="rabat" id="rabat" placeholder="0" className="h-10 px-2 ml-1 w-2/12 rounded" min={0} ref={rabatRef} onChange={rabatChange}/>
                <select name="tipRabata" id="tipRabata" className="h-10 rounded ml-2" ref={rabatJed} onChange={rabatChange}>
                    {
                        tipRabata.map((t, i) => (
                            <option key={i} value={t}>{t}</option>
                        ))
                    }
                </select>
                <button className="h-10 px-4 ml-1 align-self-end bg-green-500 disabled:opacity-50 rounded text-white justify-self-end font-medium" disabled={!formValid} onClick={dodajBtnClick}>Dodaj</button>
            </div>
        </div>
    )
}

export default DodajStavkuItem