import HistorySvg from "@assets/history.svg";
import HomeSvg from "@assets/home.svg";
import ProfileSvg from "@assets/profile.svg";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";
import { Exercise } from "@screens/Exercise";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { useTheme } from "native-base";
import { Platform } from "react-native";

export type ExerciseProps = {
  id: number;
  category: string;
  img: string;
  title: string;
  subTitle: string;
  sequenceNumber: number;
  repetitionNumber: number;
};
type AppRoutesProps = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: ExerciseProps
}

export interface IAppRoutesProps extends NavigationProp<AppRoutesProps> { };

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export function AppRoutes() {

  const { sizes, colors } = useTheme();

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === "android" ? "auto" : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6]
      }
    }}>
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) =>
            <HomeSvg fill={color} width={size} height={size} />
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) =>
            <HistorySvg fill={color} width={size} height={size} />
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) =>
            <ProfileSvg fill={color} width={size} height={size} />
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  )
}