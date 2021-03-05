import { useEffect, useState } from "react";
import { axios } from "../../axios";
import { NotificationManager } from "react-notifications";

const JediniceMere = () => {

  const [jediniceMere, setJediniceMere] = useState([]);
  const [jmToEdit, setJmToEdit] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [naziv, setNaziv] = useState('');
  const [skraceniNaziv, setSkraceniNaziv] = useState('');
  const [isIzmena, setIsIzmena] = useState(false);

  useEffect(() => {
    axios.get('/jedinice-mere').then((response) => {
      setJediniceMere(response.data);
    });
  }, [setJediniceMere]);

  function izmenaJm(jedinicaMere) {
    setIsIzmena(true);
    setShowModal(true);
    setNaziv(jedinicaMere.naziv);
    setSkraceniNaziv(jedinicaMere.skraceniNaziv);
    setJmToEdit(jedinicaMere);
  }

  function brisanje(id) {
    axios.delete(`/jedinice-mere/${id}`).then(() => {
      NotificationManager.success(`Jedinica mere ${id} uspesno obrisana.`);
      setJediniceMere(jediniceMere.filter(x => x.id !== id));
    });
  }

  function kreirajJedinicuMere(e) {
    e.preventDefault();
    if(isIzmena) {
      jmToEdit.naziv = naziv;
      jmToEdit.skraceniNaziv = skraceniNaziv;

      axios.put(`/jedinice-mere/${jmToEdit.id}`, jmToEdit).then((response) => {
        if(response.data) {
          NotificationManager.success('Jedinica mere uspesno izmenjena.');
          setJediniceMere(jediniceMere);
        }
      });
    } else {
      axios.post('/jedinice-mere', {
        naziv,
        skraceniNaziv,
        obrisan: false
      }).then((response) => {
        if(response.data) {
          jediniceMere.push(response.data)
          setJediniceMere(jediniceMere.filter(x => x.id != -1));
          NotificationManager.success(`Uspesno ste kreirali jedinicu mere sa nazivom: ${naziv}`);
        } else {
          NotificationManager.error('Greska pri kreiranju.');
        }
      });
    }

    setNaziv('');
    setSkraceniNaziv('');
    setIsIzmena(false);
    setShowModal(false);
  }

  function generateTable(rowData) {
    return (
      <tr key={rowData.id} className="cursor-pointer odd:bg-blue-700">
        <td className="text-center">{rowData.naziv}</td>
        <td className="text-center">{rowData.skraceniNaziv}</td>
        <td className="text-center">
          <button onClick={() => izmenaJm(rowData)} className="text-white mr-6 bg-gray-800 hover:bg-gray-700 px-3 py-2 w-6/12 rounded-md text-sm font-medium">Izmeni</button>
        </td>
        <td className="text-center"><button onClick={() => brisanje(rowData.id)} className="text-white mr-6 bg-red-600 hover:bg-red-700 px-3 py-2 w-6/12 rounded-md text-sm font-medium">Obrisi</button></td>
      </tr>
    );
  };

  return (
    <div className="flex justify-center flex-col p-5">
      <div className="flex justify-center flex-row">
        <h1 className="text-2xl my-4">Jedinice mere</h1>
      </div>
      <div className="flex justify-center">
        <table className="table-fixed mt-3 w-10/12">
          <thead className="bg-gray-800">
            <tr className="w-12">
              <th scope="col" className="px-6 py-3 w-12/12 text-center text-xs font-medium text-white uppercase tracking-wider"><button onClick={() => setShowModal(!showModal)} className="text-gray-800 mr-6 bg-white hover:bg-gray-100 px-3 py-2 w-8/12 rounded-md text-sm font-medium">Dodaj novu jedinicu mere</button></th>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Naziv</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Skraceni naziv</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Izmena</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Brisanje</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-800">
            {jediniceMere.map(x => generateTable(x))}
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
                  {isIzmena ? 'Izmena jednice mere' : 'Kreiranje jedinice mere'}
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
                    <input type="text" className="shadow-sm w-6/12 h-10 px-2 mx-2 rounded" value={naziv} name="nazivJm" placeholder="Naziv za jedinicu mere" onChange={(e) => setNaziv(e.target.value)} />
                    <input type="text" className="shadow-sm w-6/12 h-10 px-2 mx-2 rounded" value={skraceniNaziv} name="cena" placeholder="Skraceni naziv za jedinicu mere" onChange={(e) => setSkraceniNaziv(e.target.value)} />
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {setShowModal(false); setIsIzmena(false); setNaziv(''); setSkraceniNaziv('')}}
                    >
                      Close
                  </button>
                    <button
                      className="bg-green-500 font-bold text-white uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 rounded"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                      onClick={(e) => kreirajJedinicuMere(e)}
                    >
                      {isIzmena ? 'Izmeni' : 'Kreiraj'}
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

export default JediniceMere;