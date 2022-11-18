import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FORM_NAVIGATION } from "../../../typings/navigation";

import FormHomeScreen from "./home";
import DivisionHomeScreen from "./divisionHome";
import AccessInScreen from "./access";

const Stack = createNativeStackNavigator();

const FormMainNavigation = ({ navigation }: any) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen options={{
        headerShown: true,
        title: "DATA ENTRY HOME",
        headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 14 },
        // headerRight: () => (
        //   <RightIcon navigation={navigation} />
        // ),
      }}  name={FORM_NAVIGATION.FORMHOME} component={FormHomeScreen} />
    <Stack.Screen options={{
        headerShown: true,
        title: "DIVISION AREA",
        headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 14 },
        // headerRight: () => (
        //   <RightIcon navigation={navigation} />
        // ),
      }}  name={FORM_NAVIGATION.DIVISIONHOME} component={DivisionHomeScreen} />
 
  <Stack.Screen options={{
        headerShown: true,
        title: "Access",
        headerTitleStyle: { fontFamily: "Montserrat-Bold", fontSize: 14 },
        // headerRight: () => (
        //   <RightIcon navigation={navigation} />
        // ),
      }}  name={FORM_NAVIGATION.ACCESS} component={AccessInScreen} />
 
  </Stack.Navigator>
);

export default FormMainNavigation;
