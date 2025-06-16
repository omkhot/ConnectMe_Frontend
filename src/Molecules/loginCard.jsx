import { useContext, useState } from "react";
import AppLogo from "../Atoms/AppLogo";
import Button from "../Atoms/Buttons";
import InputFeilds from "../Atoms/InputFeilds";
import { GoogleSignIn, manualLogin } from "../Axios/AuthRequests";
import AuthService from "../Contexts/AuthService";
import UserData from "../Contexts/UserData";
import { useNavigate } from "react-router-dom";

function LoginCard(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setLoginMode} = useContext(AuthService);
    const {setUser} = useContext(UserData);
    const navigate = useNavigate();

    const handelInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handelManualSubmit = async(e) => {
        e.preventDefault();

        if(email === '' || password === '') {
            alert("Please enter email and password.");
            return;
        };
        console.log(email, password);
        try {
            const res = await manualLogin({
                email: email,
                password: password
            });
            console.log("Response from manual login:", res);
            setUser(res.data.data.user);
            navigate('/home');
        } catch (error) {
            console.log("Error from manual login:", error);
            if(error.response.status === 404) {
                alert("User with this email does not exist.");
            }
            else if(error.response.status === 400) {
                alert(error.response.data.error);
            }
        }
    }

    const handelGoogleSignIn = async() => {
        try {
            await GoogleSignIn();
        } catch (error) {
            console.log(error);
        }                   
    }

    return(
        <>
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">

                <div className="w-[100%] text-center">
                    <div className="flex items-center justify-center space-x-2">
                        <AppLogo />
                        <h1 className="text-3xl text-blue-600 font-bold">ConnectMe</h1>
                    </div>
                    
                    <p className="text-gray-500 mt-2">Welcome back! Ready to connect?</p>
                </div>

                <form className="space-y-6">

                    <div className="w-full flex flex-col items-center justify-center">

                        <div className="w-[90%] mb-5">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <InputFeilds type={"email"} placeholder={"Email"} name={"email"} value={email} onChange={handelInputChange}  />
                        </div>

                        <div className="w-[90%] mb-5">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <InputFeilds type={"password"} placeholder={"Password"} name={"password"} value={password} onChange={handelInputChange} />
                        </div>

                        <div className="w-[90%]">
                            <p className="text-sm  font-semibold text-gray-600 hover:cursor-pointer hover:underline hover:text-blue-500">Forgot Password?</p>
                        </div>           
                        
                    </div>
                </form>

                

                <div className="w-[90%] flex flex-col py-2 items-center justify-center mx-auto">
                    <Button text="Sign In" type="login" onClick={handelManualSubmit}/>
                    <h1 className="text-sm font-semibold text-center text-gray-600 ml-5 mt-2">
                        Don't have an account? <span className="text-blue-500 hover:cursor-pointer hover:underline" onClick={() => setLoginMode(false)}>Sign Up</span>
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


export default LoginCard;