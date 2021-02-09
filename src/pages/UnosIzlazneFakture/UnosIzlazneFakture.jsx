import Joi from "joi"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { joiResolver } from '@hookform/resolvers/joi'
import { useParams } from "react-router-dom"
import { useCallback, useEffect } from "react/cjs/react.development"
import DodajStavkuItem from "../../components/DodajStavkuItem/DodajStavkuItem"
import FormContainer from "../../components/FormContainer/FormContainer"
import StavkaFaktureItem from "../../components/StavkaFaktureItem/StavkaFaktureItem"
import useIzlaznaFaktura from "../../hooks/useIzlaznaFaktura"
import usePreduzece from "../../hooks/usePreduzece"
import { NotificationManager } from "react-notifications"

const UnosIzlazneFakture = () => {
  const { faktura, dodajStavku, obrisiStavku, postojecaFaktura, novaFaktura } = useIzlaznaFaktura()
  const { id } = useParams()
  const { preduzece } = usePreduzece()
  
  const schema = useMemo(()=>Joi.object({
    kupac: Joi.string().required(),
    datumFakture: Joi.date().required().max('now'),
    datumValute: Joi.date().required().min(Joi.ref('datumFakture'))
  }),[])
  const { register, handleSubmit } = useForm({
    resolver: joiResolver(schema)
  })

  useEffect(() => {
    if (!faktura) {
      if (id) postojecaFaktura(id)
      else novaFaktura()
    }
  }, [id, faktura, postojecaFaktura, novaFaktura])

  const onSubmit = useCallback(({kupac, datumFakture, datumValute})=>{

    console.log(kupac, datumFakture, datumValute)
    //NotificationManager.info("kupac")
  }, [])

  return (
    <FormContainer formName="Unos izlazne fakture">
      {
        (faktura && !faktura.fakturaGotova) && (
          <div className="w-full">
            <form className="w-full flex flex-col px-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="my-2 flex flex-row">
                <span className="font-medium mr-4">
                  Godina:
                </span>
                <span>
                  {
                    faktura.poslovnaGodina?.godina || "Nije dostupno"
                  }
                </span>
                <span className="font-medium mx-4">
                  BrojFakture:
                </span>
                <span>
                  { faktura.brojFakture || "Nije dostupno" }
                </span>
              </div>
              <div className="my-2">
                <span className="font-medium">Kupac</span>
                <select className="shadow-sm w-full h-10 px-2 rounded" defaultValue="" name="kupac" ref={register}>
                <option value="" disabled hidden>Izaberite kupca</option>
                  {
                    preduzece?.poslovniPartneri.map(pp => (
                      <option key={pp.id} value={pp.id}>{pp.naziv}</option>
                    ))
                  }
                </select>
              </div>
              <div className="my-2">
                <span className="font-medium">Datum fakture</span>
                <input type="date" className="shadow-sm w-full h-10 px-2 rounded"  name="datumFakture" ref={register}/>
              </div>
              <div className="my-2">
                <span className="font-medium">Datum valute</span>
                <input type="date" className="shadow-sm w-full h-10 px-2 rounded" name="datumValute" ref={register}/>
              </div>
              <div className="my-2">
                <span className="font-medium">Stavke</span>
                <div className="w-full">
                  <DodajStavkuItem dodajStavku={dodajStavku} />
                  {
                    faktura.stavke.map(st => (
                      <StavkaFaktureItem key={st.id} stavka={st} obrisiStavku={obrisiStavku(st.id)}/>
                    ))
                  }
                </div>
              </div>
              <div className="my-2 w-100 flex flex-row justify-end">
                <button type="submit" className="bg-green-500 py-1 px-2 font-medium text-white rounded-md h-10">Next</button>
              </div>
            </form>
          </div>
        )
      }
      {
        (faktura && faktura.fakturaGotova) && (
          <div className="w-100 my-2 flex flex-row justify-center">
            <h2 className="text-2xl">Nije moguce menjati gotovu fakturu</h2>
          </div>
        )
      }
    </FormContainer>
  )
}

export default UnosIzlazneFakture