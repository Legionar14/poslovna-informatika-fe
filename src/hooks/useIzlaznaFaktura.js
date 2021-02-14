import { useCallback } from "react"
import { useState } from "react"
import { v4 as uuid } from "uuid"
import { axios } from "../axios"

const useIzlaznaFaktura = (preduzece, grupeRobaIliUsluga) => {
  const [faktura, setFaktura] = useState()
  const [isNovaFaktura, setIsNovaFaktura] = useState()

  const novaFaktura = useCallback(()=>{
    if(preduzece) {
      setFaktura({
        id: uuid(),
        stavke: [],
        fakturaGotova: false,
        preduzece
      })
      setIsNovaFaktura(true)
    }
  }, [setFaktura, setIsNovaFaktura, preduzece])

  const postojecaFaktura = useCallback((id)=>{
    axios.get(`fakture/${id}`).then(({data})=>{
      setFaktura(data)
      setIsNovaFaktura(false)
    }).catch(console.log)
  }, [setFaktura, setIsNovaFaktura])

  const dodajStavku = useCallback((stavka)=>{
    console.log(stavka)
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
    faktura.kupac = kupac
    setFaktura(faktura)
  }, [faktura, setFaktura])

  const setDatumFakture = useCallback((datumFakture) => {
    faktura.datumFakture = datumFakture
    setFaktura(faktura)
  }, [faktura, setFaktura])

  const setDatumValute = useCallback((datumValute) => {
    faktura.datumValute = datumValute
    setFaktura(faktura)
  }, [faktura, setFaktura])

  const setGodinaFakture = useCallback((poslovnaGodina) => {
    faktura.poslovnaGodina = poslovnaGodina
    setFaktura(poslovnaGodina)
  }, [faktura, setFaktura])

  const saveFaktura = useCallback((onSuccess, onError)=>{
    console.log(faktura)
    axios.request({
      method: isNovaFaktura ? "POST" : "PUT",
      url: '/fakture',
      data: faktura
    })
    .then(({data})=>onSuccess(data))
    .catch(onError)
  }, [isNovaFaktura, faktura])

  return { faktura, novaFaktura, postojecaFaktura, dodajStavku, obrisiStavku, setKupac, setDatumFakture, setDatumValute, setGodinaFakture, saveFaktura }
}

export default useIzlaznaFaktura