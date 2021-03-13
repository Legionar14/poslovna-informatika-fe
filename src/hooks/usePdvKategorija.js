import { useCallback, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { axios } from "../axios"

const usePdvKategorija = () => {

  const [stope, setStope] = useState([])
  
  useEffect(()=>{
    axios.get("/pdv-stope/slobodne")
    .then(({data}) => setStope(data))
    .catch(console.error)
  }, [setStope])

  const addKategorija = useCallback((onSuccess, onFailure)=>({nazivKategorije, pdvStopa})=>{
    axios
    .post("/pdv-kategorije", { nazivKategorije, stopePDV: pdvStopa.map(x=>stope.find(st=>st.id === x)) })
    .then(({status}) => status === 200 || status === 201 ? onSuccess() : onFailure(`Failed to add, got ${status}`))
    .catch(onFailure)
  }, [stope])

  return {stope, addKategorija}
}

export default usePdvKategorija