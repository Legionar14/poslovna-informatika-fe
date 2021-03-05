import { useEffect, useState } from "react";
import { axios } from "../../axios";
import { NotificationManager } from "react-notifications";
import { string } from "joi";

const RobaIliUsluga = () => {

  const [robaIliUsluga, setRobaIliUsluga] = useState([]);
  const [jediniceMere, setJediniceMere] = useState([]);
  const [grupaRobeIliUsluge, setGrupaRobeIliUsluge] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [isIzmena, setIsIzmena] = useState(false);
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [roba, setRoba] = useState(false);
  const [jm, setJm] = useState();
  const [rlg, setRlg] = useState();
  const [rlEdit, setRlEdit] = useState({});



  useEffect(() => {
    axios.get('/robe-ili-usluge').then((response) => {
      setRobaIliUsluga(response.data);
    });
  }, [setRobaIliUsluga]);

  useEffect(() => {
    axios.get('/jedinice-mere').then((response) => {
      setJediniceMere(response.data);
    });
  }, [setRobaIliUsluga]);

  useEffect(() => {
    axios.get('/grupe-robe-ili-usluge').then((response) => {
      setGrupaRobeIliUsluge(response.data);
    });
  }, [setRobaIliUsluga]);

  function reset() {
    setNaziv('');
    setOpis('');
    setRoba(false);
    setJm();
    setRlg();
    setRlEdit({});
    setShowModal(false);
    setIsIzmena(false);
  }

  function izmena(rl) {
    setIsIzmena(true);
    setShowModal(true);
    setRlEdit(rl);
    setNaziv(rl.naziv);
    setOpis(rl.opis);
    setRoba(rl.roba);
    setJm(rl.jedinicaMere);
    setRlg(rl.grupaRobeIliUsluge);
  }

  function kreirajRobuIliUslugu(e) {
    e.preventDefault();

    if(isIzmena) {
      rlEdit.naziv = naziv;
      rlEdit.opis = opis;

      if(typeof roba == string) {
        rlEdit.roba = JSON.parse(roba);
      } else {
        rlEdit.roba = roba;
      }

      if(typeof jm == string) {
        rlEdit.jedinicaMere = JSON.parse(jm);
      } else {
        rlEdit.jedinicaMere = jm;
      }

      if(typeof rlg == string) {
        rlEdit.grupaRobeIliUsluge =  JSON.parse(rlg);
      } else {
        rlEdit.grupaRobeIliUsluge = rlg;
      }

      axios.put(`/robe-ili-usluge/${rlEdit.id}`, rlEdit).then(() => {
        NotificationManager.success('Roba ili usluga uspesno izmenjena.')
        setRobaIliUsluga(robaIliUsluga);
      });
    } else {
      axios.post('/robe-ili-usluge', {
        naziv,
        opis,
        roba,
        jedinicaMere: JSON.parse(jm),
        grupaRobeIliUsluge:  JSON.parse(rlg),
        obrisan: false
      }).then((response) => {
        if(response.data) {
          NotificationManager.success('Roba ili usluga uspesno kreirana')
          robaIliUsluga.push(response.data);
          setRobaIliUsluga(robaIliUsluga.filter(x => x.id !== -1));
        } else {
          NotificationManager.error('Greska pri kreiranju');
        }
      });
    }

    reset();
  }

  function brisanje(id) {
    axios.delete(`/robe-ili-usluge/${id}`).then(() => {
      setRobaIliUsluga(robaIliUsluga.filter(x => x.id !== id));
      NotificationManager.success('Roba ili usluga uspesno izbrisana');
    });
  }

  function generateTable(rowData) {
    return (
      <tr key={rowData.id} className="cursor-pointer odd:bg-blue-700">
        <td className="text-center">{rowData.opis}</td>
        <td className="text-center">{rowData.naziv}</td>
        <td className="text-center">{rowData.roba ? 'Roba' : 'Usluga'}</td>
        <td className="text-center">{`${rowData.jedinicaMere.naziv} (${rowData.jedinicaMere.skraceniNaziv})`}</td>
        <td className="text-center">{rowData.grupaRobeIliUsluge.naziv}</td>
        <td className="text-center">
          <button onClick={() => izmena(rowData)} className="text-white mr-6 bg-gray-800 hover:bg-gray-700 px-3 py-2 w-6/12 rounded-md text-sm font-medium">Izmeni</button>
        </td>
        <td className="text-center"><button onClick={() => brisanje(rowData.id)} className="text-white mr-6 bg-red-600 hover:bg-red-700 px-3 py-2 w-6/12 rounded-md text-sm font-medium">Obrisi</button></td>
      </tr>
    );
  };

  return (
    <div className="flex justify-center flex-col p-5">
      <div className="flex justify-center flex-row">
        <h1 className="text-2xl my-4">Roba ili usluga</h1>
      </div>
      <div className="flex justify-center">
        <table className="table-fixed mt-3 w-10/12">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className=" w-3/12 px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"><button onClick={() => setShowModal(!showModal)} className="text-gray-800 mr-6 bg-white hover:bg-gray-100 px-3 py-2 w-8/12 rounded-md text-sm font-medium">Dodaj robu ili uslugu</button></th>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Opis</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Naziv</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Roba/Usluga</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Jedinica mere</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Grupa robe ili usluge</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Izmeni</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Obrisi</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-800">
            {robaIliUsluga.map(x => generateTable(x))}
          </tbody>
        </table>
      </div>


      {showModal ? (
        <div>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {isIzmena ? 'Izmena robe ili usluge' : 'Kreiranje robe ili usluge'}
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
                  <form className="container mx-auto flex-col justify-center align-center p-5">
                    <div className="flex-col justify-center align-center">
                    <div className="flex-row p-3">
                      <input type="text" className="shadow-sm w-11/12 h-10 px-2 mx-2 rounded" name="naziv" placeholder="Naziv robe ili usluge" value={naziv} onChange={(e) => setNaziv(e.target.value)} />
                    </div>
                    <div className="flex-row p-3">
                      <input type="text" className="shadow-sm w-11/12 h-10 px-2 mx-2 rounded" name="opis" placeholder="Opis" value={opis} onChange={(e) => setOpis(e.target.value)} />
                    </div>
                    <div className="flex-row w-11/12 justify-center text-center p-3">
                      <label htmlFor="roba">Roba/Usluga: </label>
                      <input type="checkbox" name="roba" className="form-checkbox h-5 w-5 text-gray-800 rounded" value={roba} onChange={(e) => setRoba(e.target.value)} />
                    </div>
                    <div className="flex-row p-3">
                      <select className="shadow-sm w-11/12 h-10 px-2 mx-2 rounded" name="jedinicaMere" value={jm} onChange={(e) => setJm(e.target.value)}>
                        <option selected disabled>Jedinica mere</option>
                        {jediniceMere.map(x => <option key={x.id} value={JSON.stringify(x)}>{x.naziv}</option>)}
                      </select>
                    </div>
                    <div className="flex-row p-3">
                      <select className="shadow-sm w-11/12 h-10 px-2 mx-2 rounded" name="grupaRL" value={rlg} onChange={(e) => setRlg(e.target.value)}>
                        <option selected disabled>Grupa robe ili usluge</option>
                        {grupaRobeIliUsluge.map(x => <option key={x.id} value={JSON.stringify(x)}>{x.naziv}</option>)}
                      </select>
                    </div>
                    <div className="flex-row p-3">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => reset()}
                      >
                        Close
                    </button>
                      <button
                        className="bg-green-500 font-bold text-white uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded"
                        type="submit"
                        style={{ transition: "all .15s ease" }}
                        onClick={(e) => kreirajRobuIliUslugu(e)}
                      >
                        {isIzmena ? 'Izmeni' : 'Kreiraj'}
                      </button>
                    </div>
                    </div>
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

export default RobaIliUsluga;