import { LocalDate } from "@js-joda/core"
import axios from "axios"
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
      stavke: []
    })
  }, [setFaktura])

  const postojecaFaktura = useCallback((id)=>{
    axios.get("fakture").then(({data})=>{
      
    })
  }, [setFaktura])
}

export default useIzlaznaFaktura