import { useEffect, useState } from "react";
import { axios } from "../../axios";
import Pdf from "react-to-pdf";
import { DateTimeFormatter, LocalDate, nativeJs } from "@js-joda/core";

const KnjigaIzlaznihFaktura = () => {

  const [fakture, setFakture] = useState([]);

  const options = {
    orientation: 'landscape',
  };

  useEffect(() => {
    axios.get('/fakture').then((response) => {
      setFakture(response.data);
      console.log(response.data);
    });
  }, [setFakture])

  function viewFaktura(id) {
    window.location.replace('http://localhost:3000/pregled-izlazne-fakture/' + id);
  }

  function getFilename() {
    const dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy")
    let date = LocalDate.from(nativeJs(new Date())).format(dtf);
    return `Knjiga_izlaznih_faktura_${date}`;
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
        <td className="text-center"><a href={`http://localhost:8080/api/fakture/${rowData.id}/pdf`} target="_blank">PDF Fakture</a></td>
      </tr>
    );
  };


  return (
    <div className="flex justify-center flex-col p-5">
      <Pdf options={options} scale={0.6} filename={getFilename()}>
        {({ toPdf, targetRef }) => (
          <div>
            <div ref={targetRef}>
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
            <div className="flex justify-end flex-row m-6 w-11/12">
              <button onClick={toPdf} className="text-white mr-6 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Knjiga izlaznih faktura PDF</button>
            </div>
          </div>
        )}
      </Pdf>
    </div>
  );

}

export default KnjigaIzlaznihFaktura;