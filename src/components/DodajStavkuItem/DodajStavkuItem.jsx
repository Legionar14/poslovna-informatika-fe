import { useCallback } from "react"
import { useState } from "react"
import useStavkePreduzeca from "../../hooks/useStavkePreduzeca"

const DodajStavkuItem = () => {
    const { stavke } = useStavkePreduzeca()
    const [ stavka, setStavka ] = useState()
    const [ kolicina, setKolicina ] = useState(1)
    const [ rabatAbs, setRabatAbs ] = useState(0)
    const [ rabatProc, setRabatProc ] = useState(0)

    const stavkaChange = useCallback(({target: { value }}) => {
        if(value) setStavka(stavke?.find(s => s.id === value))
    }, [setStavka])

    const kolicinaChange = useCallback(({target: {value}}) => {
        if(value) setKolicina(value)
    }, [setKolicina])

    const rabatAbsChange = useCallback((e)=>{
        e.preventDefault()
        if(e.key === 'Enter' && e.target.value){
            const rAbs = e.target.value
            setRabatAbs(rAbs)
        }
        return false
    }, [setRabatAbs, setRabatProc, kolicina])

    const rabatProcChange = useCallback(({key, target: {value}, preventDefault})=>{
        if(preventDefault) preventDefault()
        if(key === 'Enter' && value){
            const rProc = value
            setRabatProc(rProc)
            setRabatAbs((kolicina/100)*rProc)
        }
        return false
    }, [setRabatAbs, setRabatProc, kolicina])

    return (
        <div className="container w-full mx-1 my-2 py-1 shadow-md px-2 border rounded">
            <div className="flex flex-row items-center">
                <select name="" id="" className="h-10 flex-grow rounded" onChange={stavkaChange}>
                    {stavke?.map(s=>(
                        <option value={s.id} key={s.id}>{s.naziv}</option>
                    ))}
                </select>
                <input type="number" name="kolicina" id="kolicina" placeholder="Kolicina" className="h-10 px-2 ml-1 w-2/12 rounded" min={1} onKeyUp={rabatProcChange} />
                <span className="px-2 ml-1 rounded font-medium">
                    Rabat:
                </span>
                <input type="number" name="rabat-proc" id="rabat-proc" placeholder="%" className="h-10 px-2 ml-1 w-2/12 rounded" min={0} max={100} onKeyUp={rabatAbsChange}/>
                <input type="number" name="rabat-abs" id="rabat-abs" placeholder="kolicina" className="h-10 px-2 ml-1 w-2/12 rounded" min={0} max={kolicina} onKeyUp={rabatAbsChange} />

                <button className="h-10 px-4 ml-1 align-self-end bg-green-500 rounded text-white justify-self-end font-medium">Dodaj</button>
            </div>
        </div>
    )
}

export default DodajStavkuItem