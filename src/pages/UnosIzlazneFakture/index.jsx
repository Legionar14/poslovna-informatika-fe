import FormContainer from "../../components/FormContainer";
import usePreduzece from "../../hooks/usePreduzece";
import useCenovnik from "../../hooks/useCenovnik";
import useIzlaznaFaktura from "../../hooks/useIzlaznaFaktura";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import Joi from "joi";
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react/cjs/react.development";
import DodajStavkuItem from "../../components/DodajStavkuItem";
import StavkaFaktureItem from "../../components/StavkaFaktureItem";
import { DateTimeFormatter, LocalDate, nativeJs } from "@js-joda/core";
import { NotificationManager } from "react-notifications";

const UnosIzlazneFakture = () => {
  const { id } = useParams()
  const { preduzece, stavkePreduzeca, grupeRobaIliUsluga } = usePreduzece()
  const [datumFakture, setLocalDatumFakture] = useState()
  const { cenovnik } = useCenovnik(preduzece?.id, datumFakture)
  const {
    faktura,
    novaFaktura,
    postojecaFaktura,
    dodajStavku,
    obrisiStavku,
    setKupac,
    setDatumFakture,
    setDatumValute,
    setGodinaFakture,
    saveFaktura
  } = useIzlaznaFaktura(preduzece, grupeRobaIliUsluga)


  const schema = useMemo(() => Joi.object({
    kupac: Joi.string().required(),
    datumFakture: Joi.date().required().max('now'),
    datumValute: Joi.date().required().min(Joi.ref('datumFakture')),
    godinaFakture: Joi.string().required(),
  }), [])

  const { register, handleSubmit } = useForm({
    resolver: joiResolver(schema)
  })

  const onSubmit = useCallback(({ kupac, datumFakture, datumValute, godinaFakture }) => {
    console.debug(kupac, datumFakture, datumValute, godinaFakture)

    const dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy")
    setGodinaFakture(preduzece?.poslovneGodine?.find(pg => pg.id === godinaFakture))
    setKupac(preduzece?.poslovniPartneri?.find(pp => pp.id === kupac))
    setDatumFakture(LocalDate.from(nativeJs(datumFakture)).format(dtf))
    setDatumValute(LocalDate.from(nativeJs(datumValute)).format(dtf))
    saveFaktura((novaFaktura) => {
      NotificationManager.success(`Faktura sa brojem ${novaFaktura.brojFakture} uspesno dodata`)
      console.debug(novaFaktura)
    }, (err) => {
      NotificationManager.error('Greska, faktura nije dodata')
      console.log(err)
    })
  }, [saveFaktura, setGodinaFakture, setDatumValute, setDatumFakture, setKupac, preduzece])

  useEffect(() => {
    if (!faktura) {
      if (id) postojecaFaktura(id)
      else novaFaktura()
    }
  }, [id, faktura, postojecaFaktura, novaFaktura])

  const onDatumFaktureChange = useCallback((e) => {
    if (e.target.value) {
      console.log("changed")
      const date = LocalDate.from(DateTimeFormatter.ofPattern("yyyy-MM-dd").parse(e.target.value)).format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))
      setLocalDatumFakture(date)
    }
  }, [setLocalDatumFakture])

  return (
    <FormContainer formName="Unos izlazne fakture">
      {
        faktura && (
          (faktura.fakturaGotova) ? (
            <div className="w-100 my-2 flex flex-row justify-center">
              <h2 className="text-2xl">Nije moguce menjati gotovu fakturu</h2>
            </div>
          ) : (
              <div className="w-full">
                <form className="w-full flex flex-col px-2" onSubmit={handleSubmit(onSubmit)}>
                  <div className="my-2 flex flex-row">
                    <span className="font-medium mr-4">
                      Godina:
                      </span>
                    <select name="godinaFakture" defaultValue={faktura?.poslovnaGodina?.id || ""} ref={register} className="shadow-sm w-2/12 h-10 px-2 rounded">
                      <option value="" disabled hidden>Izaberite god</option>
                      {
                        preduzece?.poslovneGodine.filter(god => !god.zakljucena).map(god => (
                          <option key={god.id} value={god.id}>{god.godina}</option>
                        ))
                      }
                    </select>
                    <span className="font-medium mx-4">
                      Broj fakture:
                      </span>
                    <span>
                      {faktura.brojFakture || "Nije dostupno"}
                    </span>
                  </div>
                  <div className="my-2">
                    <span className="font-medium">
                      Kupac
                    </span>
                    <select name="kupac" defaultValue="" ref={register} className="shadow-sm w-full h-10 px-2 rounded">
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
                    <input type="date" className="shadow-sm w-full h-10 px-2 rounded" name="datumFakture" onChange={onDatumFaktureChange} ref={register} />
                  </div>
                  <div className="my-2">
                    <span className="font-medium">Datum valute</span>
                    <input type="date" className="shadow-sm w-full h-10 px-2 rounded" name="datumValute" ref={register} />
                  </div>
                  <div className="my-2">
                    <span className="font-medium">Stavke</span>
                    <div className="w-full">
                      <DodajStavkuItem dodajStavku={dodajStavku} stavkePreduzeca={stavkePreduzeca} cenovnik={cenovnik} />
                      {
                        faktura.stavke?.map(st => (
                          <StavkaFaktureItem key={st.id} stavka={st} obrisiStavku={obrisiStavku(st.id)} />
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
        )
      }
    </FormContainer>
  )
}

export default UnosIzlazneFakture