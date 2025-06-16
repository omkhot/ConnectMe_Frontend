function Button({text, type, children, imgLink, onClick}){

    let color;

    if(type === "login"){
        color = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl";
    }
    else if(type === "buttonWithImage"){
        color = "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow";
    }
    else if(type === "button"){
        color = "bg-blue-700 text-white hover:bg-blue-900 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow";
    }
    else if(type === "listButtons"){
        color = "bg-white text-xs md:text-md hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 md:px-4 border border-gray-400 rounded-xl shadow";
    }
    else if(type === "danger"){
        color = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl";
    }
    else if(type === "normal"){
        color = "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-xl shadow";
    }

    return(
        <button className={`${color} w-full flex items-center justify-center`} onClick={onClick}>
            {type === "buttonWithImage" && <img src={imgLink} alt="logo" className="w-6 h-6 mr-2" />}
            {children} {text}
        </button>
    )
}

export default Button;