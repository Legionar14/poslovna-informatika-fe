import { useCallback } from "react"
import { v4 as uuid } from "uuid"
import { axios } from "../axios"
import { DateTimeFormatter, LocalDate } from "@js-joda/core";

const usePdvStopa = () => {
  
  const addPdvStopa = useCallback((onSuccess, onFailure) => ({procenat, datumVazenja}) =>{
    const fmtr = DateTimeFormatter.ofPattern("yyyy-MM-dd")
    const fmtrTo = DateTimeFormatter.ofPattern("dd-MM-yyyy")
    const date = LocalDate.parse(datumVazenja, fmtr).format(fmtrTo)
    axios.post(`pdv-stope`, {id: uuid(), procenat, datumVazenja: date})
    .then(({status}) => status === 200 || status === 201 ? onSuccess() : onFailure(`Got status ${status}`))
    .catch(onFailure)
  },[])

  return { addPdvStopa }
}

export default usePdvStopa