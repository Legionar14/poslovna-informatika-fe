const FormContainer = ({ children, formName }) => {
	return (
		<div className="container w-3/4 mx-auto mt-8 shadow-lg px-6 py-4 rounded-lg border">
			<div className="w-full">
				<h2 className="text-2xl font-semibold">
					{formName}
				</h2>
			</div>
			{
				children
			}
		</div>
	)
}

export default FormContainer