import {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
  useCallback,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "../api/types";
import jwt_decode from "jwt-decode";
import AuthService from "../api/auth";
import { Center, Spinner } from "native-base";

type NullableUser = User | null;

interface AuthContextValues {
  isAuthenticated: boolean;
  user: NullableUser;
  completeLogin: (access: string, refresh: string) => void;
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

const decodeToken = (token: string) => {
  const decodedToken = jwt_decode<JWTContent>(token);
  const user = {
    id: decodedToken.user_id,
    username: decodedToken.username,
    email: decodedToken.email,
  };
  return user;
};

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [user, setUser] = useState<NullableUser>(null);

  useEffect(() => {
    const retrieveTokens = async () => {
      setIsLoading(true);
      const access = await SecureStore.getItemAsync("access");
      const refresh = await SecureStore.getItemAsync("refresh");

      if (!access && !refresh) {
        setIsLoading(false);
        setToken(null);
        setUser(null);
        return;
      }

      if (!access && refresh) {
        AuthService.refreshToken(refresh)
          .then((res) => {
            setToken(res.data.access);
            const user = decodeToken(res.data.access);
            setUser(user);
          })
          .catch((err) => {
            setToken(null);
            setUser(null);
          })
          .finally(() => setIsLoading(false));
        return;
      }

      if (access) {
        setToken(access);
        const user = decodeToken(access);
        setUser(user);
        setIsLoading(false);
      }
    };
    retrieveTokens();
  }, []);

  const completeLogin = useCallback(async (access: string, refresh: string) => {
    setIsLoading(true);
    Promise.all([
      SecureStore.setItemAsync("access", access),
      SecureStore.setItemAsync("refresh", refresh),
    ])
      .then(() => {
        setIsLoading(false);
        setToken(access);
        const decodedToken = jwt_decode<JWTContent>(access);
        const user = {
          id: decodedToken.user_id,
          username: decodedToken.username,
          email: decodedToken.email,
        };
        setUser(user);
      })
      .catch(() => {
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const completeLogout = useCallback(() => {
    setIsSigningOut(true);
    AuthService.logout().finally(() => {
      Promise.all([
        SecureStore.deleteItemAsync("access"),
        SecureStore.deleteItemAsync("refresh"),
      ])
        .then(() => {
          setToken(null);
          setUser(null);
        })
        .finally(() => setIsSigningOut(false));
    });
  }, []);

  if (isLoading)
    // todo implement loading screen
    return (
      <Center flex={1}>
        <Spinner size="lg" />
      </Center>
    );

  if (isSigningOut)
    // todo implement loading screen
    return (
      <Center flex={1}>
        <Spinner size="lg" />
      </Center>
    );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
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
