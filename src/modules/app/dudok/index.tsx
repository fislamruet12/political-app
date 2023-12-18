import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DudokPurbo from './home';
import { mainZone } from '../../databaseForm/utils/division';

const Tab = createMaterialTopTabNavigator();


const DudokMain = ({ navigation }) => {

    return (
        <Tab.Navigator screenOptions={
            {
                tabBarLabelStyle: { fontSize: 12, color: 'white', fontFamily: 'Montserrat-Regular' },
                tabBarStyle: { backgroundColor: "#456" },
            }
        } >
            {
                mainZone.map((value, index) => (
                    <Tab.Screen key={index} name={value.bn_name} options={{ tabBarLabel: value.bn_name }} children={() => <DudokPurbo id={value.id} navigation={navigation} />} />
                ))
            }
        </Tab.Navigator>
    );
};


export default DudokMain;
