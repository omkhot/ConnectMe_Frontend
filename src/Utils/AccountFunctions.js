import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { logoutReq } from "../Axios/AuthRequests";
import AuthService from "../Contexts/AuthService";
import { deleteUser } from "../Axios/UserReq";
import UserData from "../Contexts/UserData";

const useAccountActions = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setAuthLoading } = useContext(AuthService);
    const {user} = useContext(UserData);

    const handleLogOut = async () => {
        const confirm = window.confirm("Are you sure you want to log out?");
        if (!confirm) return;

        try {
        await logoutReq(); // make sure to await
        alert("Logged out successfully!");
        setIsAuthenticated(false);
        navigate("/");
        } catch (error) {
        console.error(error);
        alert(error?.response?.data?.message || "Logout failed");
        }
    };

    const handleDeleteAccount = async () => {
        const confirm = window.confirm("Are you sure you want to delete your account?");
        if (!confirm) return;

        setAuthLoading(true);

        try {
            await deleteUser(user._id); 
            alert("Account deleted successfully!");
            setIsAuthenticated(false);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || "Account deletion failed");
        }
    };

  return { handleLogOut, handleDeleteAccount };
};

export default useAccountActions;
