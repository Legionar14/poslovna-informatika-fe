import { useEffect, useState } from "react/cjs/react.development";
import { axios } from "../../axios";
import StavkaCenovnika from "../../components/StavkaCenovnika/StavkaCenovnika";

const PrikazCenovnika = () => {
  
  const [cenovnici, setCenovnike] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [procenat, setProcenat] = useState(0);
  const [isMinus, setIsMinus] = useState(true);
  const [cenovnikZaKopiranje, setCenovnikZaKopiranje] = useState();

  useEffect(() => {
    axios.get('http://localhost:8080/api/cenovnici').then((response) => {
      setCenovnike(response.data);
    })
  }, [setCenovnike]);

  function kopirajCenovnik(e) {
    e.preventDefault();
    axios.post(`http://localhost:8080/api/cenovnici/${procenat}/${isMinus}`, cenovnikZaKopiranje).then((response) => {
      cenovnici.push(response.data);
      setShowModal(false);
    });
  }

	return (
		<div className="flex justify-center flex-col p-5">
      <div className="flex justify-center flex-row">
					<h1 className="text-2xl my-4">Cenovnici</h1>
				</div>
      <table class="table-fixed mt-3">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Vazi od</th>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stavke cenovnika</th>
            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kopiraj cenovnik</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {cenovnici.map(x => <tr><td class="px-6 text-center py-4 whitespace-nowrap">{`${x.vaziOd[2]}/${x.vaziOd[1]}/${x.vaziOd[0]}`}</td><td class="px-6 text-center py-4 whitespace-nowrap">{x.stavkeCenovnika.map(x => <StavkaCenovnika stavkaCenovnika={x} />)}</td><td class="px-6 text-center py-4 whitespace-nowrap"><button class="text-indigo-600 hover:text-indigo-900" onClick={() => {setCenovnikZaKopiranje(x);setShowModal(true)}}>Kopiraj cenovnik</button></td></tr>)}
        </tbody>
      </table>

      {showModal ? (
        <div>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Kopiraj cenovnik
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
									<form className="container mx-auto flex justify-center p-5">
                    <select onChange={(e) => setIsMinus(e.target.value)}>
                      <option value="true">Uvecaj</option>
                      <option value="false">Umanji</option>
                    </select>
										<input type="number" min="0" className="shadow-sm w-6/12 h-10 px-2 mx-2 rounded" name="cena" placeholder="Procenat" onChange={(e) => setProcenat(e.target.value)} />
										<button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 mx-2 py-1 px-2 font-medium text-white rounded-md h-10"
                    type="submit"
                    style={{ transition: "all .15s ease" }}
                    onClick={(e) => kopirajCenovnik(e)}
                  >
                    Kopiraj
                  </button>
									</form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}

		</div>
	);
}

export default PrikazCenovnika;