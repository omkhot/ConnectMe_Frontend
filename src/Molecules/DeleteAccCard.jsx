import { useContext } from "react";
import Button from "../Atoms/Buttons";
import PopUpContext from "../Contexts/PopUpContext";
import useAccountActions from "../Utils/AccountFunctions";
import UserData from "../Contexts/UserData";

function DeleteAccountCard(){

    const { setPopUpMode } = useContext(PopUpContext);

    const { handleDeleteAccount } = useAccountActions();

    const {user} = useContext(UserData);

    return(
        <>
            <div className="w-[85%] md:w-2xl h-1/2 md:h-50 bg-white px-4 py-2 rounded-md">
                <h1 className="text-2xl font-bold">Delete Account</h1>

                <div className="mt-2 mb-3 text-xs md:text-md">
                    <p className="text-gray-600 font-semibold">This action will delete your account.Along with this your all posts,
                        comments and likes will also be deleted and you will not be able to undo this action.
                    </p>
                    <p className="text-red-500 italic font-bold">Are you sure you want to delete your account?</p>
                </div>

                <div className="w-full flex items-center justify-end gap-5">
                    <Button text="Delete" type="danger" onClick={() => handleDeleteAccount()}/>
                    <Button text="Cancel" type="normal" onClick={() => setPopUpMode("")}/>
                </div>
            </div>

        </>
    )
}

export default DeleteAccountCard;