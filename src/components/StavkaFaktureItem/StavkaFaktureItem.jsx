import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const StavkaFaktureItem = () => {
    return (
        <div className="container w-full mx-1 my-2 py-1 shadow-md px-2 flex flex-row items-center border rounded">
            <div className="h-10 flex-grow flex flex-row items-center">
                <span className="font-medium px-1">
                    Naziv:
                </span>
                <span>
                    Stavka 1
                </span>
            </div>
            <div className="w-2/12 h-10 flex flex-row items-center">
                <span className="font-medium px-1">
                    Kolicina:
                </span>
                <span>
                    5
                </span>
            </div>
            <div className="w-4/12 h-10 flex flex-row items-center justify-between pr-2">
                <span className="font-medium px-1">
                    Rabat:
                </span>
                <span>
                    10%
                </span>
                <span>
                    /
                </span>
                <span>
                    500
                </span>
            </div>
            <div className="w-1/12 h-10 flex flex-row items-center">
                <button className="bg-red-500 text-white w-full px-4 py-2 rounded-md font-medium">
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
        </div>
    )
}

export default StavkaFaktureItem