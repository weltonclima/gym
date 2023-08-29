import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@services/api";
import { TOKEN_STORAGE, USER_STORAGE } from "@utils/storageConfig";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { ISignIn } from "src/interfaces/ISignIn";
import { IUser } from "src/interfaces/IUser";

interface AuthContextProps {
  handleUpdateUser: (user: IUser | null) => Promise<void>;
  user: IUser | null;
  handleSignIn: (value: ISignIn) => Promise<void>;
  handleSignOut: () => Promise<void>;
  isLoadingUserStorage: boolean;
  token: string;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState("");
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true);

  const handleUpdateUser = useCallback(async (user: IUser | null) => {
    setUser(user);
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
  }, [])

  const handleSignIn = useCallback(async (value: ISignIn) => {
    setUser(value.user);

    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(value.user));
    await AsyncStorage.setItem(TOKEN_STORAGE, value.token);

    api.defaults.headers.common['Authorization'] = `Bearer ${value.token}`;
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      setIsLoadingUserStorage(true)
      setUser(null);
      setToken("");
      await AsyncStorage.removeItem(USER_STORAGE);
      await AsyncStorage.removeItem(TOKEN_STORAGE);
    }
    catch (error) { throw error }
    finally { setIsLoadingUserStorage(false) }
  }, [])

  useEffect(() => {
    const getAsyncStorage = async () => {
      try {
        const userStorage = await AsyncStorage.getItem(USER_STORAGE);
        const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

        if (!!userStorage && !!tokenStorage) {
          setUser(JSON.parse(userStorage));
          setToken(tokenStorage);
          api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
        }
      }
      catch (error) { throw error; }
      finally { setIsLoadingUserStorage(false) }
    };
    getAsyncStorage();
  }, [])

  return (
    <AuthContext.Provider value={{
      handleUpdateUser,
      user,
      handleSignIn,
      handleSignOut,
      isLoadingUserStorage: isLoadingUserStorage,
      token,
    }}>
      {children}
    </AuthContext.Provider>
  )
}