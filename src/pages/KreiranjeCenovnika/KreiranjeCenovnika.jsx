import StavkaCenovnika from "../../components/StavkaCenovnika/StavkaCenovnika";
import axios from 'axios';
import { React, useEffect, useState } from "react";
import Alert from "../../components/Alert/Alert";

const KreiranjeCenovnika = () => {
	const [cenovnik, setCenovnik] = useState({ vaziOd: new Date(), stavkeCenovnika: [] });
	const [getRobaIliUsluga, setRobaIliUsluga] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [robaSelect, setRobaSelect] = useState();
	const [cena, setCena] = useState();
	const [canCreate, setCanCreate] = useState(false);
	const [date, setDate] = useState();

	function createStavka(e) {
		e.preventDefault();
		setShowModal(false);
		let stavkaCenovnika = { cena: cena, robaIliUsluga: JSON.parse(robaSelect) };
		cenovnik.stavkeCenovnika.push(stavkaCenovnika);
		setCanCreate(true);
		console.log(cenovnik);
	}

	function kreirajCenovnik(e) {
		e.preventDefault();
		cenovnik.vaziOd = date;
		axios.post('http://localhost:8080/api/cenovnici', cenovnik).then(() => setShowAlert(true));
		setTimeout(() => setShowAlert(false), 3000);
	}

	useEffect(() => {
		axios.get('http://localhost:8080/api/robe-ili-usluge').then((robailiUsluga) => {
			setRobaIliUsluga(robailiUsluga.data);
		})
	}, [setRobaIliUsluga])

	return (
		<>
			{showAlert ? (<Alert color="green" />) : null}
			<div className="container mx-auto flex justify-center mt-4 p-5">
				<form className="w-6/12 rounded overflow-hidden shadow-lg flex justify-center flex-col p-5">
					<div className="flex justify-center flex-row mb-4">
						<h1 className="text-2xl">Kreiranje cenovnika</h1>
					</div>
					<div className="flex flex-row justify-center">
						<span className="font-medium mx-2">Vazi od:</span>
						<input type="date" className="shadow-sm w-6/12 h-10 px-2 mx-2 rounded" onChange={(e) => setDate(e.target.value)} />
						<a className="bg-gray-800 text-center mx-2 pt-2 px-4 font-medium text-white rounded-md h-10" onClick={() => setShowModal(true)}>Dodaj stavku</a>
					</div>
					{cenovnik.stavkeCenovnika.map(x => {
						return <div key={x.robaIliUsluga.id} className="flex flex-row justify-center"><StavkaCenovnika stavkaCenovnika={x} /></div>
					})}

					<div className="flex justify-center">
						<button className={`${canCreate ? 'bg-gray-800' : 'bg-gray-500 cursor-default'} w-6/12 mx-2 py-1 my-3 px-2 font-medium text-white rounded-md h-10`} disabled={!canCreate && date} onClick={(e) => kreirajCenovnik(e)}>Kreiraj cenovnik</button>
					</div>
				</form>

				{showModal ? (
					<div>
						<div
							className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
						>
							<div className="relative w-auto my-6 mx-auto max-w-3xl">
								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
									<div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
										<h3 className="text-3xl font-semibold">
											Kreiraj stavku
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
											<select className="shadow-sm w-6/12 h-10 px-2 mx-2 rounded" onChange={(e) => setRobaSelect(e.target.value)}>
												<option >Roba ili usluga</option>
												{getRobaIliUsluga.map(x => <option key={x.id} value={JSON.stringify(x)}>{x.naziv}</option>)}
											</select>
											<input type="number" min="0" className="shadow-sm w-6/12 h-10 px-2 mx-2 rounded" name="cena" placeholder="Cena" onChange={(e) => setCena(e.target.value)} />
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
												onClick={(e) => createStavka(e)}
											>
												Kreiraj
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
		</>
	)
}

export default KreiranjeCenovnika;