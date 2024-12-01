import { useEffect, useRef } from "react";
import { auth, provider } from "../../firebaseconfig";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useAnimation } from "../../hooks/useAnimation";
import { setUsersInFirestore } from "../../helpers/setUserData";

const LoginForm = () => {
    let navigate = useNavigate();
    const { setIsAuth, setUserName } = useAuth();

  
    const signInWithGoogle = async () => {
      signInWithPopup(auth, provider).then(async (result) => {
        setIsAuth(true);
        setUserName(result.user.displayName || "");
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userName", result.user.displayName || "");
        localStorage.setItem("userID", result.user.uid)
        setUsersInFirestore();
        navigate('/')
      });
    };
    
    const loginRef = useRef(null);
  
    useAnimation(loginRef);
  
    useEffect(() => {
      document.title = 'Threadsy | Login';
    }, []);
  
    return (
      <div ref={loginRef} className="md:w-1/2 w-full flex justify-center justify-self-center md:mt-32  mt-40 h-96 rounded-md">
        <div className="flex-row mt-20">
          <div className="flex justify-center items-center">
            <img src="/logo/logo.png" className="md:w-1/3 w-1/3" alt="logo" />
            <h1 className="font-semibold md:text-5xl text-5xl">Threadsy</h1>
          </div>
          <div className="flex justify-center items-center">
            <h1 className="text-xl tracking-wide text-center">Connect with friend on Threadsy a lightweight soical network!</h1>
          </div>
          <div className="flex justify-center mt-6">
            <button onClick={signInWithGoogle} className="btn md:w-full w-[80%] btn-accent text-white md:btn-sm btn-lg">
              Sign Up
              <img width="24" height="15" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
            </button>
          </div>
        </div>
      </div>
    );
}

export default LoginForm