function NavItem({icon, label, onClickHandler, isSelected}) {
    return(
        <>  
            <div className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition ${isSelected ? "bg-gray-100" : ""}`} onClick={onClickHandler}>
                <span className="text-xl">{icon}</span>
                <span className="hidden md:block text-sm font-medium">{label}</span>
            </div>
        </>
    )
}

export default NavItem;