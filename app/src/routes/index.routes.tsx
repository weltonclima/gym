import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "native-base";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {

  const { colors } = useTheme();
  const { user, isLoadingUserStorage } = useAuth();

  if (isLoadingUserStorage)
    return <Loading />

  return (
    <NavigationContainer theme={{
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: colors.gray[700],
      }
    }}>
      {!!user ?
        <AppRoutes />
        :
        <AuthRoutes />
      }
    </NavigationContainer>
  )
}