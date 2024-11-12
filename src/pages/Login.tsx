
const Login = () => {

  (() => {
    document.title = 'Dev Talks | Login'
  })();

  return (
    <div className="md:w-1/3 w-full flex justify-center justify-self-center md:mt-20 mt-40 bg-white md:shadow-md h-96">
      <div className="flex-row mt-20">
        <div className="flex justify-center items-center">
          <h1 className="font-semibold text-2xl">Welcome To The Dev Talks!</h1>
        </div>
        <div className="flex justify-center mt-6">
          <button className="flex justify-center text-xl rounded gap-1 border w-36 hover:bg-gray-100 ">Login with <img width="24" height="15" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/></button>
        </div>
      </div>
    </div>
  )
}

export default Login