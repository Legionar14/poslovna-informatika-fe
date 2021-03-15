import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { NotificationManager } from "react-notifications"
import { useHistory } from "react-router"
import FormContainer from "../../components/FormContainer"
import usePreduzece from "../../hooks/usePreduzece"

const UnosPreduzeca = () => {
  const { push } = useHistory()
  const schema = useMemo(() => Joi.object({
    naziv: Joi.string().required(),
    adresa: Joi.string().required(),
    telefon: Joi.string().required(),
    fax: Joi.string().required(),
    naseljenoMesto: Joi.string().required()
  }), [])
  const { register, handleSubmit } = useForm({
    resolver: joiResolver(schema)
  })
  const { naseljenaMesta, dodajPreduzece } = usePreduzece()

  const onSuccess = useCallback(() => {
    NotificationManager.success("Added successfully")
    push("/")
  }, [push])

  const onFailure = useCallback((err) => {
    NotificationManager.error("An error occured")
    console.error(err)
  }, [])

  return (
    <FormContainer formName="Unos preduzeca">
      <form className="w-full flex flex-col px-2 gap-y-2" onSubmit={handleSubmit(dodajPreduzece(onSuccess, onFailure))}>
        <label htmlFor="naziv">Naziv:</label>
        <input type="text" name="naziv" id="naziv" className="shadow-sm w-full h-10 px-2 rounded" ref={register} />
        <label htmlFor="adresa">Adresa:</label>
        <input type="text" name="adresa" id="adresa" className="shadow-sm w-full h-10 px-2 rounded" ref={register} />
        <label htmlFor="telefon">Telefon:</label>
        <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="123-45-678" name="telefon" id="telefon" className="shadow-sm w-full h-10 px-2 rounded" ref={register} />
        <label htmlFor="fax">Fax:</label>
        <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="123-45-678" name="fax" id="fax" className="shadow-sm w-full h-10 px-2 rounded" ref={register} />
        <label htmlFor="naseljenoMesto">Naseljeno mesto:</label>
        <select name="naseljenoMesto" id="naseljenoMesto" className="shadow-sm w-full px-2 rounded" ref={register} >
          {
            naseljenaMesta.map(nm => (
              <option value={nm.id}>{nm.nazivMesta}</option>
            ))
          }
        </select>
        <button type="submit" className="bg-green-500 py-1 px-2 font-medium text-white rounded-md h-10">Dodaj</button>
      </form>
    </FormContainer>
  )
}

export default UnosPreduzeca