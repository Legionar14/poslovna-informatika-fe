import { useCallback } from "react"
import { useForm } from "react-hook-form"
import NotificationManager from "react-notifications/lib/NotificationManager"
import { useHistory } from "react-router-dom"
import FormContainer from "../../components/FormContainer"
import usePdvKategorija from "../../hooks/usePdvKategorija"

const UnosPdvKategorije = () => {

  const { stope, addKategorija } = usePdvKategorija()
  const { push } = useHistory()
  const { register, handleSubmit } = useForm()

  const onSuccess = useCallback(() => {
    NotificationManager.success("Added successfully")
    push("/")
  }, [push])

  const onFailure = useCallback((err) => {
    NotificationManager.error("An error occured")
    console.error(err)
  }, [])

  return (
    <FormContainer formName="Unos pdv kategorije">
      <form className="w-full flex flex-col px-2 gap-y-2" onSubmit={handleSubmit(addKategorija(onSuccess, onFailure))}>
        <label htmlFor="nazivKategorije">Naziv kategorije:</label>
        <input type="text" name="nazivKategorije" id="nazivKategorije" className="shadow-sm w-full h-10 px-2 rounded" ref={register} />
        <label htmlFor="pdvStopa">Pdv stopa:</label>
        <select name="pdvStopa" id="pdvStopa" multiple className="shadow-sm w-full px-2 rounded" ref={register}>
          {
            stope.map(stopa => (
              <option key={stopa.id} value={stopa.id}>{stopa.procenat}% - {stopa.datumVazenja}</option>
            ))
          }
        </select>
        <button type="submit" className="bg-green-500 py-1 px-2 font-medium text-white rounded-md h-10">Dodaj</button>
      </form>
    </FormContainer>
  )
}

export default UnosPdvKategorije