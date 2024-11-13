export type AuthContextProps = {
    isAuth: boolean;
    userName: string;
    setIsAuth: (isAuth: boolean) => void;
    setUserName: (userName: string) => void;
  }
  