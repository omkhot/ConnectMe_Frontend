import { useContext, useState } from "react"
import AppLogo from "../Atoms/AppLogo"
import Button from "../Atoms/Buttons"
import InputFeilds from "../Atoms/InputFeilds"
import { GoogleSignIn, manualSignUp } from "../Axios/AuthRequests";
import AuthService from "../Contexts/AuthService";
import { useNavigate } from "react-router-dom";

function SignUpCard() {

    const [userCredentials, setUserCredentials] = useState({
        firstName: '',
        email: '',
        password: '',
        type: 'manualSignUp'
    });


    const [ConfirmPassword, setConfirmPassword] = useState('');
    const {setLoginMode} = useContext(AuthService);

    const navigate = useNavigate();

    const handelInputChange = (e) => {
        const { name, value } = e.target;
        setUserCredentials((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handelSignUpSubmit = async (e) => {
        e.preventDefault();
        console.log("User Credentials: ", userCredentials);
        if(userCredentials.password !== ConfirmPassword){
            console.log("Passwords do not match");
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await manualSignUp(userCredentials);
            const resData = res.data.tempUser;
            console.log("Response from signup: ", resData);

            const userData = {
                firstName: resData.firstName,
                email: resData.email,
                password: resData.password
            }

            navigate('/completeProfile');
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Signup failed");
        }
    }

    const handelGoogleSignIn = async() => {
        await GoogleSignIn();           
    }

    return (
        <>
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">

                <div className="w-[100%] text-center">
                    <div className="flex items-center justify-center space-x-2">
                        <AppLogo />
                        <h1 className="text-3xl text-blue-600 font-bold">ConnectMe</h1>
                    </div>
                    
                    <p className="text-gray-500 mt-2">Let's connect with ConnectMe</p>
                </div>

                <form className="space-y-6">

                    <div className="w-full flex flex-col items-center justify-center">

                        <div className="w-[90%] mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
                            <InputFeilds type={"text"} placeholder={"First Name"} name={"firstName"} value={userCredentials.firstName} onChange={handelInputChange} />
                        </div>

                        <div className="w-[90%] mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <InputFeilds type={"email"} placeholder={"Email"} name={"email"} value={userCredentials.email} onChange={handelInputChange}  />
                        </div>

                        <div className="w-[90%] mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <InputFeilds type={"password"} placeholder={"Password"} name={"password"} value={userCredentials.password} onChange={handelInputChange} />
                        </div>

                        <div className="w-[90%] mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Confirm Password</label>
                            <InputFeilds type={"password"} placeholder={"Confirm Password"} name={"password"} value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>           
                        
                    </div>
                </form>



                <div className="w-[90%] flex flex-col py-2 items-center justify-center mx-auto">
                    <Button text="Sign Up" type="login" onClick={handelSignUpSubmit}/>
                    <h1 className="text-sm font-semibold text-center text-gray-600 ml-5 mt-2">
                        Already have an account? <span className="text-blue-500 hover:cursor-pointer hover:underline" onClick={() => setLoginMode(true)} >Sign In</span>
                    </h1>
                </div>

                <div>

                <div className="flex items-center gap-4 my-2">
                        <hr className="flex-grow border-gray-300" />
                        <span className="text-gray-400 text-sm">OR</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <div className="w-[90%] flex items-center justify-center mx-auto mt-5">
                        <Button 
                            text={"Continue with Google"} 
                            type={"buttonWithImage"} 
                            imgLink={"https://img.icons8.com/color/48/000000/google-logo.png"}
                            onClick={handelGoogleSignIn}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default SignUpCard;