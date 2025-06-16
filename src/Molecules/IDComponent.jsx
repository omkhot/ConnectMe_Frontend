import { useEffect, useState } from "react";
import AppLogo from "../Atoms/AppLogo";
import Button from "../Atoms/Buttons";
import InputFeilds from "../Atoms/InputFeilds";
import BackgroundWrapper from "../Hooks/BackgroundWrapper";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/AxiosSetup";

function CompleteProfileComponent() {

    const [socialId, setSocialId] = useState('');
    const [tempUser, setTempUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTempUser = async () => {
            try {
                const res = await axiosInstance.get('/auth/getTempUser', { withCredentials: true });
                setTempUser(res.data);
            } catch (err) {
                console.log("Temp user fetch error:", err);
                alert("Session expired. Please login again.");
                navigate("/");
            }
        };

        fetchTempUser();
    }, []);

    const handleNext = async () => {
        if (!socialId.trim()) {
            alert("Please enter a valid Social ID");
            return;
        }

        try {
            const payload = {
                ...tempUser,
                socialId
            };

            const res = await axiosInstance.post('/auth/completeProfile', payload, { withCredentials: true });
            console.log("Response from complete profile:", res.data);

            alert("Profile created successfully!");
            navigate('/home');
            
    
        } catch (error) {
            console.log("Error creating profile:", error);
            const msg = error?.response?.data?.message || "Something went wrong";
            alert(msg);
        }
    };

    return(
        <>
            <BackgroundWrapper>

            
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 mx-auto my-10">
                <div>
                <div className="w-[100%] text-center">
                    <div className="flex items-center justify-center space-x-2">
                        <AppLogo />
                        <h1 className="text-3xl text-blue-600 font-bold">ConnectMe</h1>
                    </div>
                    
                    <p className="text-gray-500 mt-2">Create Your Own SocialID To Join with ConnectMe!!</p>
                </div>
                </div>

                <div className="space-y-6">

                    <div className="w-full flex flex-col items-center justify-center">

                        <div className="w-[90%] mb-5">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">SocialID</label>
                            <InputFeilds type={"text"} placeholder={"socialId"} name={"socialId"} value={socialId} onChange={(e) => setSocialId(e.target.value)}  />
                        </div>

                        <div>
                            <p>SocialId should be:</p>
                            <ol className="list-disc text-gray-600">
                                <li>SocialId should be unique</li>
                                <li>Should be a alphanumeric</li>
                                <li>Should be a minimum 4 character long</li>
                            </ol>                            
                        </div>

                        <div className="w-[20%] ml-auto mt-5">
                            <Button text={"Create"} type={"button"} onClick={handleNext} />
                        </div>           
                        
                    </div>
                </div>
            </div>

            </BackgroundWrapper>
        </>
    )
}

export default CompleteProfileComponent;