import {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
  useCallback,
} from "react";
import { User } from "../api/types";

type NullableUser = User | null;

interface AuthContextValues {
  isAuthenticated: boolean;
  user: NullableUser;
  completeLogin: (token: string) => void;
  completeLogout: () => void;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

interface AuthContextProviderProps {
  children: ReactNode;
}

interface JWTContent {
  token_type: "access";
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  // extra fields
  username: string;
  email: string;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<NullableUser>(null);

  const completeLogin = useCallback((token: string) => {
    // reset storage, set token, decode it and then set user
  }, []);

  const completeLogout = useCallback(() => {
    // reset storage and clear token and user
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: true, // todo replace with !!user later
        user,
        completeLogin,
        completeLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
