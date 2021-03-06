import { useTable } from "react-table"
import { useMemo } from "react/cjs/react.development"

const StavkeFaktureTable = ({ stavke }) => {

	const columns = useMemo(() => [
		{
			Header: "Redni br.",
			accessor: "redniBroj"
		},
		{
			Header: "Naziv robe/usluge",
			accessor: "robaIliUsluga.naziv"
		},
		{
			Header: "Jedinica mere",
			accessor: "robaIliUsluga.jedinicaMere.naziv"
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
			accessor: "osnovicaZaPDV"
		},
		{
			Header: "PDV %",
			accessor: "pdvstopa"
		},
		{
			Header: "PDV iznos",
			accessor: "iznosPDV"
		},
		{
			Header: "Ukupno",
			accessor: "ukupanIznos"
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