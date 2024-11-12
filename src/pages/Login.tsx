import { useEffect, useRef } from "react";
import { auth, provider } from "../firebaseconfig";
import { signInWithPopup } from "firebase/auth";
import gsap from "gsap";

const Login = ({ setIsAuth, setUserName }: { setIsAuth: React.Dispatch<React.SetStateAction<boolean>>; setUserName: React.Dispatch<React.SetStateAction<string>> }) => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      setIsAuth(true);
      setUserName(result.user.displayName || "");
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userName", result.user.displayName || "");
    });
  };
  
  const loginRef = useRef(null);

  useEffect(() => {
    gsap.from(loginRef.current, { opacity: 0, x: 50 });
    gsap.to(loginRef.current, { opacity: 1, x: 0, delay: 0.5 });
  }, []);

  useEffect(() => {
    document.title = 'Dev Talks | Login';
  }, []);

  return (
    <div ref={loginRef} className="md:w-1/3 w-full flex justify-center justify-self-center md:mt-32  mt-40 bg-white md:shadow-md h-96">
      <div className="flex-row mt-20">
        <div className="flex justify-center items-center">
          <h1 className="font-semibold md:text-2xl text-3xl">Welcome To The Dev Talks!</h1>
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={signInWithGoogle} className="flex justify-center items-center md:text-xl text-2xl rounded md:gap-1 gap-2 border w-36 hover:bg-gray-100">
            Login with 
            <img width="24" height="15" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
