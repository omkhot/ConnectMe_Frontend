import { useContext } from 'react';
import BackgroundWrapper from '../Hooks/BackgroundWrapper'
import LoginCard from '../Molecules/loginCard'
import AuthService from '../Contexts/AuthService';
import SignUpCard from '../Molecules/SignUpCard';
function AuthPage() {

    const {loginMode} = useContext(AuthService);
    return (
        <div className="w-full h-screen flex">
            <BackgroundWrapper>
                {!loginMode && <SignUpCard />}
                {loginMode && <LoginCard />}
            </BackgroundWrapper>
        </div>
    )
}

export default AuthPage