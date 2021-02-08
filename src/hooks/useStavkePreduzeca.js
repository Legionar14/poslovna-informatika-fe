import { useState } from "react";
import { useEffect } from "react"
import { axios } from "../axios"
import useCurrentUser from "./useCurrentUser"

const useStavkePreduzeca = () => {
  const { currentUser: { preduzeceId } } = useCurrentUser();
  const [stavke, setStavke] = useState()

  useEffect(() => {
    if (preduzeceId)
      axios.get(`/preduzeca/${preduzeceId}/proizvodi`)
        .then(({ data }) => setStavke(data)).catch(console.log)
  }, [setStavke, preduzeceId])

  return {stavke}
}

export default useStavkePreduzeca