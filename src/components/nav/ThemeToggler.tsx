import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react"

const ThemeToggler = () => {

    const [ theme, setTheme] = useState<any>(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

    const toggleChange = () => {
        if(theme == 'light'){
            setTheme('dark')
        }
        else{
            setTheme('light');
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme: any = localStorage.getItem('theme');
        document.querySelector('html')?.setAttribute("data-theme", localTheme);
    })

  return (
    <div>
       {theme == 'light' ? <MoonIcon className="hover:text-primary cursor-pointer" onClick={toggleChange} /> : <SunIcon className="hover:text-primary cursor-pointer" onClick={toggleChange} />}
    </div>
  )
}

export default ThemeToggler