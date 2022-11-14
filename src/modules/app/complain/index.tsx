import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SendComplainScreen from "./sendComplain";
import { COMPLAIN_NAVIGATION } from "../../../../typings/navigation";

const Stack = createNativeStackNavigator();

const ComplainScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      options={{
        headerShown: true,
        title: "Notify ICT",
        headerTitleStyle: { fontFamily: "Montserrat-Bold" },
      }}
      name={COMPLAIN_NAVIGATION.SENDCOMPLAIN}
      component={SendComplainScreen}
    />
  </Stack.Navigator>
);

export default ComplainScreen;
