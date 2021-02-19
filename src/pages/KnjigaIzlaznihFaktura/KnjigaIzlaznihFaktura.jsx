import { useEffect, useState } from "react";
import { axios } from "../../axios";

const KnjigaIzlaznihFaktura = () => {

  const [fakture, setFakture] = useState([]);
  let [pdfFile, setPdfFile] = useState('');

  useEffect(() => {
    axios.get('/fakture').then((response) => {
      setFakture(response.data);
      console.log(response.data);
    });
  },[setFakture])

  function getPDFFakture(link) {
    axios.get(link).then((response) => {
      pdfFile += btoa(unescape(encodeURIComponent(response.data)));
      setPdfFile(pdfFile);
      console.log(pdfFile)
    });
  }

  function viewFaktura(id) {
    window.location.replace('http://localhost:3000/pregled-izlazne-fakture/' + id);
  }

  function generateTable(rowData) {
    return (
      <tr key={rowData.id} className="cursor-pointer odd:bg-blue-700">
        <td className="text-center" onClick={() => viewFaktura(rowData.id)}>{rowData.brojFakture}</td>
        <td className="text-center" onClick={() => viewFaktura(rowData.id)}>{rowData.datumFakture}</td>
        <td className="text-center" onClick={() => viewFaktura(rowData.id)}>{rowData.preduzece.naziv}</td>
        <td className="text-center" onClick={() => viewFaktura(rowData.id)}>{rowData.kupac.naziv}</td>
        <td className="text-center" onClick={() => viewFaktura(rowData.id)}>{rowData.ukupnaOsnovica}</td>
        <td className="text-center" onClick={() => viewFaktura(rowData.id)}>{rowData.ukupanPDV}</td>
        <td className="text-center" onClick={() => viewFaktura(rowData.id)}>{rowData.ukupanIznos}</td>
        <td className="text-center"><button className="text-white bg-gray-800 hover:bg-gray-700 mx-2 my-2 py-1 px-2 font-medium text-white rounded-md h-10" onClick={() => getPDFFakture(`/fakture/${rowData.id}/pdf`)}>PDF fakture</button></td>
      </tr>
    );
  };


  return (
    <div className="flex justify-center flex-col p-5">
      <div className="flex justify-center flex-row">
        <h1 className="text-2xl my-4">Knjiga izlaznih faktura</h1>
      </div>
      <div className="flex justify-center">
        <table className="table-fixed mt-3 w-10/12">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Broj fakture</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Datum fakture</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Preduzece</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Kupac</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Osnovica</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">PDV</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Ukupan iznos</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">PDF</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-800">
            {fakture.map(x => generateTable(x))}
          </tbody>
        </table>
      </div>

    </div>
  );

}

export default KnjigaIzlaznihFaktura;