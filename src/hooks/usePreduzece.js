import { useState } from "react";
import { useEffect } from "react"
import { axios } from "../axios"
import useCurrentUser from "./useCurrentUser"

const usePreduzece = () => {
  const { currentUser: { preduzeceId } } = useCurrentUser();
  const [preduzece, setPreduzece] = useState()
  const [stavkePreduzeca, setStavkePreduzeca] = useState()

  useEffect(() => {
    if (preduzeceId)
      axios.get(`/preduzeca/${preduzeceId}`)
        .then(({ data }) => setPreduzece(data)).catch(console.log)
  }, [setPreduzece, preduzeceId])

  useEffect(() => {
    if (preduzeceId)
      axios.get(`/preduzeca/${preduzeceId}/proizvodi`)
        .then(({ data }) => setStavkePreduzeca(data)).catch(console.log)
  }, [setStavkePreduzeca, preduzeceId])

  return { preduzece, stavkePreduzeca }
}

export default usePreduzece