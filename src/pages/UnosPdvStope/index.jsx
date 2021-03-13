import { useForm } from "react-hook-form"
import NotificationManager from "react-notifications/lib/NotificationManager"
import { useHistory } from "react-router-dom"
import { useCallback } from "react/cjs/react.development"
import FormContainer from "../../components/FormContainer"
import usePdvStopa from "../../hooks/usePdvStopa"

const UnosPdvStope = () => {
  const { push } = useHistory()
  const { addPdvStopa } = usePdvStopa()
  const { register, handleSubmit } = useForm()

  const onSuccess = useCallback(()=>{
    NotificationManager.success("Added successfully")
    push("/")
  }, [push])

  const onFailure = useCallback((err)=>{
    NotificationManager.error("An error occured")
    console.error(err)
  }, [])

  return (
    <FormContainer formName="Unos pdv stope">
      <form className="w-full flex flex-col px-2 gap-y-2" onSubmit={handleSubmit(addPdvStopa(onSuccess, onFailure))}>
        <label htmlFor="procenat">
          Procenat:
        </label>
        <input type="number" name="procenat" id="procenat" className="shadow-sm w-full h-10 px-2 rounded" ref={register}/>
        <label htmlFor="datumVazenja">Datum vazenja:</label>
        <input type="date" name="datumVazenja" id="datumVazenja" className="shadow-sm w-full h-10 px-2 rounded" ref={register}/>
        <button type="submit" className="bg-green-500 py-1 px-2 font-medium text-white rounded-md h-10">Dodaj</button>
      </form>
    </FormContainer>
  )
}

export default UnosPdvStope