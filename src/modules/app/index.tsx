import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { APP_NAVIGATION } from "../../../typings/navigation";

import HelperScreen from "./dashboard/helper";
import PartySingleScreen from "./district/partydetails/single";

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
        title: "HELP DESK",
        headerTitleStyle: { fontFamily: "Montserrat-Bold" },
      }}
      name={APP_NAVIGATION.HELPER}
      component={HelperScreen}
    />
    
  </Stack.Navigator>
);

export default App;
