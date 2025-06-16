import { RiEdit2Fill } from "react-icons/ri";
import InputFeilds from "../Atoms/InputFeilds";
import { useContext, useRef, useState } from "react";
import UserData from "../Contexts/UserData";
import { EditProfileReq } from "../Axios/UserReq";

function EditProfile() {

    const {user} = useContext(UserData);

    if (!user) {
        return <div className="p-10 text-center text-gray-500">Loading...</div>;
    }

    const [userData, setUserData] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        bio: user?.bio,
        profileImage: user?.profileImage,
        birthdate: user?.birthdate
    });

    const fileInputRef = useRef();

    const [profileImageFile, setProfileImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setUserData((prevData) => ({
                ...prevData,
                profileImage: previewUrl,  // for preview
            }));
            setProfileImageFile(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();
        formData.append("firstName", userData.firstName);
        formData.append("lastName", userData.lastName);
        formData.append("bio", userData.bio);
        formData.append("birthdate", userData.birthdate);
        formData.append("accountType", userData.accountType || user.accountType);

        // Attach image if new one was selected
        if (profileImageFile) {
            formData.append("profileImage", profileImageFile);
        }
        
        const res = await EditProfileReq(formData, user.socialId);
        console.log(res);
        alert("Profile Updated Successfully!!");

        setLoading(false);
    }

    
    if(loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;

    return (
        <div className="w-full min-h-screen px-4 py-6 bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">

                {/* Back Button */}
                <div className="mb-4">
                    <button
                        className="text-sm font-medium text-blue-600 hover:underline"
                        onClick={() => window.history.back()}
                    >
                        ← Back
                    </button>
                </div>

                {/* Header */}
                <h1 className="flex items-center gap-2 border-b border-gray-200 pb-4 text-xl font-semibold text-gray-800">
                    <RiEdit2Fill className="w-6 h-6 text-blue-600" />
                    Edit Profile
                </h1>

                {/* Form */}
                <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Profile Picture */}
                <div className="md:col-span-2 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
                        <img 
                            src={userData.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="profile-pic"
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="profile-pic"
                            className="cursor-pointer text-blue-600 text-sm font-medium hover:underline"
                        >
                            Change Profile Picture
                        </label>
                    </div>
                </div>


                    {/* First Name */}
                    <div>
                        <label className="text-gray-700 text-sm font-semibold">First Name</label>
                        <div className="mt-2">
                            <InputFeilds type="text" placeholder={userData.firstName} value={userData.firstName} name={"firstName"} onChange={handleChange}/>
                        </div>
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="text-gray-700 text-sm font-semibold">Last Name</label>
                        <div className="mt-2">
                            <InputFeilds type="text" placeholder={userData.lastName} value={userData.lastName} name={"lastName"} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="md:col-span-2">
                        <label className="text-gray-700 text-sm font-semibold">Bio</label>
                        <div className="mt-2">
                            <InputFeilds type="text" placeholder={userData.bio} value={userData.bio} name={"bio"} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Birthdate */}
                    <div>
                        <label className="text-gray-700 text-sm font-semibold">Birthdate</label>
                        <div className="mt-2">
                            <InputFeilds type="date" placeholder="Birthdate" value={userData.birthdate} name={"birthdate"} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Account Type */}
                    <div>
                        <label className="text-gray-700 text-sm font-semibold">Account Type</label>
                        <select 
                            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={user.accountType}
                            onChange={(e) => setUserData({...userData, accountType: e.target.value})}
                        >
                            <option id="public">Public</option>
                            <option id="private">Private</option>
                        </select>
                    </div>
                </form>

                {/* Submit Button */}
                <div className="mt-10 flex justify-center md:justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
