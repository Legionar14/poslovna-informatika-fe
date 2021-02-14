import { useState, useEffect } from 'react'
import { axios } from '../axios'

const useCenovnik = (preduzeceId, datumFakture) => {
  const [cenovnik, setCenovnik] = useState()

  useEffect(() => {
    if (preduzeceId && datumFakture) {
      axios.get(`/preduzeca/${preduzeceId}/cenovnik/${datumFakture}`)
        .then(({ data }) => {
          setCenovnik(data)
        })
        .catch(console.log)
    }
  }, [preduzeceId, datumFakture, setCenovnik])

  return { cenovnik }
}

export default useCenovnik