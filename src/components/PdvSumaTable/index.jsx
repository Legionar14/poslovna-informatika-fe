import { useTable } from "react-table"
import { useMemo } from "react/cjs/react.development"

const PdvSumaTable = ({ stavke }) => {
  const columns = useMemo(() => [
    {
      Header: "Tarifa %",
      accessor: "tarifa"
    },
    {
      Header: "Osnovica",
      accessor: "osnovica"
    },
    {
      Header: "PDV iznos",
      accessor: "pdvIznos"
    },
    {
      Header: "Vrednost sa PDV",
      accessor: "vrSaPdv"
    },
  ], [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: stavke })

  return (
    <table {...getTableProps()} className="border-2 border-collapse table-auto w-5/12">
      <thead>
        {
          headerGroups.map(headerGroup => (

            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (

                  <th {...column.getHeaderProps()} className="border border-b-2 bg-green-500 text-white font-medium">
                    {
                      column.render('Header')}
                  </th>
                ))}
            </tr>
          ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {
          rows.map(row => {

            prepareRow(row)
            return (

              <tr {...row.getRowProps()}>
                {
                  row.cells.map(cell => {

                    return (
                      <td {...cell.getCellProps()} className="border">
                        {
                          cell.render('Cell')}
                      </td>
                    )
                  })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default PdvSumaTable