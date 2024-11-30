import { useRef } from "react"
import { useAnimation } from "../../hooks/useAnimation";

const ScreenLoader = () => {

  const loaderRef = useRef<HTMLDivElement>(null);

  useAnimation(loaderRef);

  return (
    <div>
        <div ref={loaderRef} className="w-full h-screen bg-transparent flex justify-center items-center">
        <div className="flex-row">
        <img src="/logo/logo.png" />
        <span className="loading loading-spinner text-accent flex justify-self-center mt-3"></span>
        </div>
      </div>
    </div>
  )
}

export default ScreenLoader