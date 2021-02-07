const FormContainer = ({ children, formName }) => {
    return (
        <div className="container w-1/2 mx-auto mt-8 shadow-lg px-6 py-4 rounded-lg border">
            <div className="w-full">
                <h2 className="text-2xl font-semibold">
                    { formName }
                </h2>
            </div>
            {
                children
            }
        </div>
    )
}

export default FormContainer