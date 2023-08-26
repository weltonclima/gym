import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "native-base";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {

  const { colors } = useTheme();

  const auth = false;

  return (
    <NavigationContainer theme={{
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: colors.gray[700],
      }
    }}>
      {auth ?
        <AppRoutes />
        :
        <AuthRoutes />
      }

    </NavigationContainer>
  )
}