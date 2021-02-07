import { useTable } from "react-table"
import { useMemo } from "react/cjs/react.development"

const StavkeFaktureTable = ({ stavke }) => {

	const columns = useMemo(() => [
		{
			Header: "Naziv robe/usluge",
			accessor: "nazivRobe"
		},
		{
			Header: "Jedinica mere",
			accessor: "jedinicaMere"
		},
		{
			Header: "Kolicina",
			accessor: "kolicina"
		},
		{
			Header: "Cena bez PDV",
			accessor: "cenaBezPdv"
		},
		{
			Header: "Rabat",
			accessor: "rabat"
		},
		{
			Header: "Osnovica",
			accessor: "osnovica"
		},
		{
			Header: "PDV %",
			accessor: "pdvProcenat"
		},
		{
			Header: "PDV iznos",
			accessor: "pdv"
		},
		{
			Header: "Ukupno",
			accessor: "ukupno"
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
		<table {...getTableProps()} className="w-full border-2 border-collapse table-auto">
			<thead>
				{
					headerGroups.map(headerGroup => (

						<tr {...headerGroup.getHeaderGroupProps()}>
							{
								headerGroup.headers.map(column => (

									<th {...column.getHeaderProps()} className="border border-b-2 bg-blue-500 text-white font-medium">
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

export default StavkeFaktureTable