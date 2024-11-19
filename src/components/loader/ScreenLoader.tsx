
const ScreenLoader = () => {
  return (
    <div>
        <div className="w-full h-screen bg-transparent flex justify-center items-center">
        <div className="flex-row">
        <img src="/logo/logo.png" />
        <span className="loading loading-spinner text-accent flex justify-self-center mt-3"></span>
        </div>
      </div>
    </div>
  )
}

export default ScreenLoader