import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { APP_NAVIGATION, PARLAMENT_NAVIGATION, ROOT_NAVIGATION } from "../../typings/navigation";

import App from "./app";
import Auth from "./auth";
import FormMainNavigation from "./databaseForm";
import { Drawer } from "native-base";
import DrawerScreen from "./drawer";
import ProblemScreen from "./app/division";
import DashBoardScreen from "./app/district";
import PartyDetailsScreen from "./app/district/partydetails";
import ProblemListScreen from "./app/division/divisionList";
import PartySingleScreen from "./app/district/partydetails/single";
import ParlamenMembertList from "./app/parlament";

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROOT_NAVIGATION.ROOT} component={DrawerScreen} />
      <Stack.Screen name={ROOT_NAVIGATION.AUTH} component={Auth} />
      <Stack.Screen
        name={ROOT_NAVIGATION.FORM}
        component={FormMainNavigation}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: "DIVISION/METRO LIST",
          headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 16 },
          // headerRight: () => (
          //   <RightIcon navigation={navigation} />
          // ),
        }}
        name={APP_NAVIGATION.PROBLEM}
        component={ProblemListScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: "DISTRICT LIST",
          headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 16 },
        }}
        name={APP_NAVIGATION.DASHBOARD}
        component={DashBoardScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: "DISTRICT PARTY LIST",
          headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 16 },
        }}
        name={APP_NAVIGATION.PARTY}
        component={PartyDetailsScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: "DETAILS",
          headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 16 },
          // headerRight: () => (
          //   <RightIcon navigation={navigation} />
          // ),
        }}
        name={APP_NAVIGATION.DETAILS}
        component={PartySingleScreen}
      />
       <Stack.Screen
        options={{
          headerShown: true,
          title: "???????????? ???????????????",
          headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 16 },
          // headerRight: () => (
          //   <RightIcon navigation={navigation} />
          // ),
        }}
        name={PARLAMENT_NAVIGATION.PARLAMENT}
        component={ParlamenMembertList}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
