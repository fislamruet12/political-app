import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashBoardScreen from "./district";
import { APP_NAVIGATION } from "../../../typings/navigation";
import ComplainScreen from "./complain";
import DeviceScreen from "./device";
import RightIcon from "../../component/rightIcon";
import ProblemScreen from "./division";
import HelperScreen from "./dashboard/helper";
import PartyDetailsScreen from "./district/partydetails";
import PartySingleScreen from "./district/partydetails/single";
import LandingScreen from "./dashboard/dashboard";

const Stack = createNativeStackNavigator();

const App = ({ navigation }: any) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      options={{
        headerShown: true,
        title: "DASHBOARD",
        headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 16 },
        headerRight: () => (
          <RightIcon navigation={navigation} />
        ),
      }}
      name={APP_NAVIGATION.LANDING}
      component={LandingScreen}
    />
    
    <Stack.Screen name={APP_NAVIGATION.PROBLEM} component={ProblemScreen} />
    <Stack.Screen
      options={{
        headerShown: true,
        title: "DISTRICT LIST",
        headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 14 },
        // headerRight: () => (
        //   <RightIcon navigation={navigation} />
        // ),
      }}
      name={APP_NAVIGATION.DASHBOARD}
      component={DashBoardScreen}
    />
    <Stack.Screen  options={{
        headerShown: true,
        title: "DISTRICT PARTY LIST",
        headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 14 },
        // headerRight: () => (
        //   <RightIcon navigation={navigation} />
        // ),
      }} name={APP_NAVIGATION.PARTY} component={PartyDetailsScreen} />

    <Stack.Screen options={{
        headerShown: true,
        title: "DETAILS",
        headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 14 },
        // headerRight: () => (
        //   <RightIcon navigation={navigation} />
        // ),
      }} name={APP_NAVIGATION.DETAILS} component={PartySingleScreen} />
    <Stack.Screen name={APP_NAVIGATION.DEVICE} component={DeviceScreen} />
    <Stack.Screen
      options={{
        headerShown: true,
        title: "HELP DESK",
        headerTitleStyle: { fontFamily: "Montserrat-Bold" },
      }}
      name={APP_NAVIGATION.HELPER}
      component={HelperScreen}
    />
  </Stack.Navigator>
);

export default App;
