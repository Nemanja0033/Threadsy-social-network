import gsap from "gsap";
import { useEffect, RefObject } from "react";

export const useAnimation = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      const animation = gsap.fromTo(element, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, delay: 0.1 }
      );
      
      return () => {
        animation.kill(); 
      };
    }
  }, [ref]);
};
