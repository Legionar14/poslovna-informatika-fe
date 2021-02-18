const StavkaCenovnika = (props) => {

	const stavkaCenovnika = props.stavkaCenovnika;

	return (
		<div className="flex justify-center flex-col p-5">
			<div>
				<span>{stavkaCenovnika.robaIliUsluga.naziv} - </span><span>{stavkaCenovnika.cena}</span>
			</div>
		</div>
	);
}

export default StavkaCenovnika;