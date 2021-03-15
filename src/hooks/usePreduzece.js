import { useCallback, useState } from "react";
import { useEffect } from "react"
import { axios } from "../axios"
import useCurrentUser from "./useCurrentUser"

const usePreduzece = () => {
  const { currentUser: { preduzeceId } } = useCurrentUser()
  const [preduzece, setPreduzece] = useState()
  const [stavkePreduzeca, setStavkePreduzeca] = useState()
  const [grupeRobaIliUsluga, setGrupeRobaIliUsluga] = useState()
  const [naseljenaMesta, setNaseljenaMesta] = useState([])

  useEffect(()=>{
    axios.get("/preduzeca/mesta").then(({data})=>setNaseljenaMesta(data))
  }, [setNaseljenaMesta])

  const dodajPreduzece = useCallback((onSuccess, onFailure)=>({naziv, adresa, telefon, fax, naseljenoMesto})=>{
    axios.post("/preduzeca", {id: "", naziv, adresa, telefon, fax, naseljenoMesto: naseljenaMesta.find(x=>x.id === naseljenoMesto)})
    .then(({status})=> status === 200 ? onSuccess() : onFailure(`Got ${status} code`)).catch(onFailure)
  }, [naseljenaMesta])

  useEffect(() => {
    if (preduzeceId && !preduzece)
      axios.get(`/preduzeca/${preduzeceId}`)
        .then(({ data }) => setPreduzece(data)).catch(console.log)
  }, [setPreduzece, preduzeceId, preduzece])

  useEffect(() => {
    if (preduzeceId)
      axios.get(`/preduzeca/${preduzeceId}/proizvodi`)
        .then(({ data }) => setStavkePreduzeca(data)).catch(console.log)
  }, [setStavkePreduzeca, preduzeceId])

  useEffect(() => {
    if (preduzece)
      setGrupeRobaIliUsluga(preduzece?.grupeRobaIliUsluga)
  }, [preduzece, grupeRobaIliUsluga, setGrupeRobaIliUsluga])

  return { preduzece, stavkePreduzeca, grupeRobaIliUsluga, naseljenaMesta, dodajPreduzece }
}

export default usePreduzece