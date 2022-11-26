import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DEVICE_NAVIGATION } from "../../../../typings/navigation";
import SendDeviceInfoScreen from "./sendDeviceInfo";
import ScanScreen from "./qrcode";

import ScanBarCode from "./barcode";

const Stack = createNativeStackNavigator();

const DeviceScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      options={{
        headerShown: true,
        title: "UPLOAD DEVICE INFO",
        headerTitleStyle: { fontFamily: "Montserrat-Bold" },
      }}
      name={DEVICE_NAVIGATION.DEVICEINFO}
      component={SendDeviceInfoScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        title: "DEVICE QRCODE",
        headerTitleStyle: { fontFamily: "Montserrat-Bold" },
      }}
      name={DEVICE_NAVIGATION.QRCODE}
      component={ScanScreen}
    />
    <Stack.Screen
      options={{
        headerShown: true,
        title: "DEVICE BARCODE",
        headerTitleStyle: { fontFamily: "Montserrat-Bold" },
      }}
      name={DEVICE_NAVIGATION.BARCODE}
      component={ScanBarCode}
    />
  </Stack.Navigator>
);

export default DeviceScreen;
