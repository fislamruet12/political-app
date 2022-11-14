import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PROBLEM_NAVIGATION } from "../../../../typings/navigation";
import ProblemListScreen from "./divisionList";
import RightIcon from "../../../component/rightIcon";
import SolverInputScreen from "./solve";
import PrintScreen from "./print";

const Stack = createNativeStackNavigator();

const ProblemScreen = ({navigation}:any) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      options={{
        headerShown: true,
        title: "DIVISION/METRO LIST",
        headerTitleStyle: { fontFamily: "Montserrat-Bold",fontSize:14 },
        // headerRight: () => (
        //   <RightIcon navigation={navigation} />
        // ),
      }}
      name={PROBLEM_NAVIGATION.PROBLEMINFO}
      component={ProblemListScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        title: "SOLVER STATUS",
        headerTitleStyle: { fontFamily: "Montserrat-Bold",fontSize:14 },
      }}
      name={PROBLEM_NAVIGATION.SOLVER}
      component={SolverInputScreen}
    />
     <Stack.Screen
      options={{
        headerShown: true,
        title: "PDF/IMAGE",
        headerTitleStyle: { fontFamily: "Montserrat-Bold",fontSize:14 },
      }}
      name={PROBLEM_NAVIGATION.PRINT}
      component={PrintScreen}
    />
  </Stack.Navigator>
);

export default ProblemScreen;
