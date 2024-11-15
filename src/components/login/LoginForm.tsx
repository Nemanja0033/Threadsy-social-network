import { useEffect, useRef } from "react";
import { auth, provider } from "../../firebaseconfig";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useAnimation } from "../../helpers/useAnimation";

const LoginForm = () => {
    let navigate = useNavigate();
    const { setIsAuth, setUserName } = useAuth();
  
    const signInWithGoogle = () => {
      signInWithPopup(auth, provider).then((result) => {
        setIsAuth(true);
        setUserName(result.user.displayName || "");
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userName", result.user.displayName || "");
        navigate('/')
      });
    };
    
    const loginRef = useRef(null);
  
    useAnimation(loginRef);
  
    useEffect(() => {
      document.title = 'Dev Talks | Login';
    }, []);
  
    return (
      <div ref={loginRef} className="md:w-1/3 w-full flex justify-center justify-self-center md:mt-32  mt-40 md:shadow-md h-96 rounded-md">
        <div className="flex-row mt-20">
          <div className="flex justify-center items-center">
            <h1 className="font-semibold md:text-4xl text-5xl">DevTalks</h1>
          </div>
          <div className="flex justify-center mt-6">
            <button onClick={signInWithGoogle} className="btn btn-accent text-white md:btn-sm btn-lg">
              Login with 
              <img width="24" height="15" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
            </button>
          </div>
        </div>
      </div>
    );
}

export default LoginForm