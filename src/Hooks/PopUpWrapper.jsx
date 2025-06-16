function PopUpWrapper({children}) {
    return(
        <>
            <div className="w-[100vw] h-[100vh] fixed inset-0 bg-black/50  flex justify-center items-center z-550">
                {children}
            </div>
        </>
    )
}


export default PopUpWrapper;