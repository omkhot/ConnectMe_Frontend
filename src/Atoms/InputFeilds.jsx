function InputFeilds({type, placeholder, value, name, onChange}){
    return(
        <>
            <input
                type={type}
                placeholder={placeholder}
                className="border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={value}
                name={name}
                onChange={onChange}
            />
        </>
    )
}

export default InputFeilds;