import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROOT_NAVIGATION } from "../../typings/navigation";

import App from "./app";
import Auth from "./auth";
import FormMainNavigation from "./databaseForm";

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROOT_NAVIGATION.APP} component={App} />
      <Stack.Screen name={ROOT_NAVIGATION.AUTH} component={Auth} />
      <Stack.Screen
        name={ROOT_NAVIGATION.FORM}
        component={FormMainNavigation}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
