import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import { APP_NAVIGATION } from '../../../typings/navigation';
import RightIcon from '../../component/rightIcon';
import {width} from '../../utils/handy';
import LandingScreen from '../app/dashboard/dashboard';


import ContentDrawerScreen from './content';

const Drawer = createDrawerNavigator();
const DrawerScreen = ({navigation}:any) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <ContentDrawerScreen {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {width: width / 2, borderTopRightRadius: 20},
      }}>
      <Drawer.Screen
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

      
    </Drawer.Navigator>
  );
};
export default DrawerScreen;
