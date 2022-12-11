import { Text, View } from "native-base";
import React from "react";
import { Alert, Image, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  APP_NAVIGATION,
  PROBLEM_NAVIGATION,
  ROOT_NAVIGATION,
} from "../../typings/navigation";
import { User } from "../../typings/structures";

import { icons } from "../assets/icons";
import { SetUserInfo } from "../database/Database";
import actions from "../state/actions";
import { RootState } from "../state/reducer";
const RightIcon = ({ navigation }: any) => {
  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.currentUser.user);
  const LogOut = () => {
    dispatch(actions.user.removeUser());
  };
  return (
    <View>
      {user && user?.role?.is_super === 1 && (
        <TouchableOpacity
          onPress={() => navigation.navigate(ROOT_NAVIGATION.FORM)}
        >
          <View
            flexDirection={"row"}
            justifyContent={"space-between"}
            marginX={3}
           
            padding={1}
          >
            <Text fontSize={16} fontFamily={'Montserrat-Bold'}>ADMIN</Text>
            <Image
              source={icons.dual}
              style={{ height: 25, width: 25, marginRight: 10 }}
            />
          </View>
        </TouchableOpacity>
      )}

      {user && (
         <TouchableOpacity onPress={() => LogOut()}>
        <View
          flexDirection={"row"}
          justifyContent={"space-between"}
          marginX={3}
         borderTopColor="gray.500"
         borderTopWidth={.2}
          padding={1}
          marginTop={1}
         
        >
            <Text fontSize={16} fontFamily={'Montserrat-Bold'}>LOGOUT</Text>
         
            <Image
              source={icons.user}
              style={{ height: 25, width: 25, marginLeft: 10 }}
            />
        
        </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RightIcon;
