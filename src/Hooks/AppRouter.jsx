import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import AuthPage from "../Pages/AuthPage";
import CompleteProfileComponent from "../Molecules/IDComponent";
import ProfilePage from "../Pages/ProfilePage";
import EditProfile from "../Organs/EditProfile";
import ChattingPage from "../Pages/ChattingPage";
import FollowersPage from "../Pages/FollowersPage";
import FollowingPage from "../Pages/FollowingPage";
import ExplorePage from "../Pages/ExplorePage";
import OthersProfilePage from "../Pages/OthersProfilePage";
import { useContext } from "react";
import AuthService from "../Contexts/AuthService";
import SettingsPage from "../Pages/SettingsPage";
import NotificationPage from "../Pages/NotificationPage";
import SavedPostPage from "../Pages/SavedPosts";

function AppRouter(){

    const {isAuthenticated, authLoading} = useContext(AuthService);

    if(authLoading){
        return(
            <div className="w-full h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        )
    }

    return(
        <Routes>

            {/* Public Routes */}
            <Route path="/" element = {isAuthenticated ? <Navigate to="/home" /> : <AuthPage />} />
            <Route path="/completeProfile" element = {<CompleteProfileComponent />} />
            
            {/* Private Routes */}
            <Route path="/home" element = {<HomePage />} />
            <Route path="/profile" element = {<ProfilePage />} />
            <Route path="/profile/edit" element = {<EditProfile />} />

            <Route path="/otherProfile/:searchedSocialId" element = {<OthersProfilePage />} />

            <Route path="/chats" element = {<ChattingPage />} />

            <Route path="/followers/:userId" element = {<FollowersPage />} />
            <Route path="/following/:userId" element = {<FollowingPage />} />

            <Route path="/explore" element = {<ExplorePage />} />
            <Route path="/saved" element = {<SavedPostPage />} />

            <Route path="/settings" element = {<SettingsPage />} />

            <Route path="/notifications" element = {<NotificationPage />} />


        </Routes> 
    )
} 

export default AppRouter;