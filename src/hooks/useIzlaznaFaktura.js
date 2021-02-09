import { LocalDate } from "@js-joda/core"
import { useCallback } from "react"
import { useState } from "react"
import { v4 as uuid } from "uuid"
import { axios } from "../axios"

const useIzlaznaFaktura = () => {
  const [faktura, setFaktura] = useState()
  const novaFaktura = useCallback(()=>{
    setFaktura({
      id: uuid(),
      datumFakture: LocalDate.now(),
      datumValute: LocalDate.now(),
      stavke: [],
      fakturaGotova: false
    })
  }, [setFaktura])

  const postojecaFaktura = useCallback((id)=>{
    axios.get(`fakture/${id}`).then(({data})=>{
      setFaktura(data)
    }).catch(console.log)
  }, [setFaktura])

  const dodajStavku = useCallback((stavka)=>{
    const izmenjenaFaktura = {
      ...faktura,
      stavke: [...faktura.stavke, stavka]
    }
    setFaktura(izmenjenaFaktura)
  }, [faktura, setFaktura])

  const obrisiStavku = useCallback((stavkaId) => (e) => {
    e.preventDefault()
    const izmenjenaFaktura = {
      ...faktura,
      stavke: faktura.stavke.filter(st=>st.id !== stavkaId)
    }
    setFaktura(izmenjenaFaktura)
    return false
  }, [faktura, setFaktura])

  const setKupac = useCallback((kupac) => {
    setFaktura({
      ...faktura,
      kupac
    })
  }, [faktura, setFaktura])

  const setDatumFakture = useCallback((datumFakture) => {
    setFaktura({
      ...faktura,
      datumFakture
    })
  }, [faktura, setFaktura])

  const setDatumValute = useCallback((datumValute) => {
    setFaktura({
      ...faktura,
      datumValute
    })
  }, [faktura, setFaktura])

  return { faktura, novaFaktura, postojecaFaktura, dodajStavku, obrisiStavku, setKupac, setDatumFakture, setDatumValute }
}

export default useIzlaznaFaktura