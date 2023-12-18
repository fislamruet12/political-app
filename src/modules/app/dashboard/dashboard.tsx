import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Pressable,
  Stack,
  Text,
  View,
} from "native-base";
import { RootState } from "../../../state/reducer";
import LinearGradient from "react-native-linear-gradient";
import {
  APP_NAVIGATION,
  PARLAMENT_NAVIGATION,
  ROOT_NAVIGATION,
} from "../../../../typings/navigation";
import { useSelector } from "react-redux";
import Loading from "../../../component/loading";
import MsgScreen from "../../auth/signin/msg";
import { GetAccessInfo } from "../../../database/Database";
import DeviceInfo from "react-native-device-info";
import { width } from "../../../utils/handy";
import { Image } from "react-native";
import { icons } from "../../../assets/icons";
import { mainZone } from "../../databaseForm/utils/division";
const LandingScreen = (props: any) => {
  const user = useSelector((state: RootState) => state.currentUser.user);
  const [dicision, setdicision] = useState(0);
  const [uniqId, setuniqId] = useState("");
  const [refresh, setrefesh] = useState(false);

  const Login = (path: any, value: any) => {
    console.log(value);
    if (user) {
      props.navigation.navigate(path, value);
    } else {
      props.navigation.push(ROOT_NAVIGATION.AUTH);
    }
  };
  useEffect(() => {
    DeviceInfo.getUniqueId().then((number) => {
      console.log("serial1", number);
      // AddUser()
      GetAccessInfo(number).then((err) => {
        console.log("err", err);
        if (err?.data === null) {
          setdicision(1);
        } else {
          setdicision(2);
        }
      });
      setuniqId(number);
    });
  }, [refresh]);

  if (dicision === 0) return <Loading />;
  if (dicision === 1)
    return (
      <MsgScreen uniqId={uniqId} setrefresh={setrefesh} refresh={refresh} />
    );

  return (
    
    <Box
      flex={1}
      justifyContent="center"
      alignItems={"center"}
      bg={"coolGray.600"}
    >
      <HStack flexWrap="wrap" justifyContent="center" alignItems={"center"}>
        {mainZone.map((value) => (
          <Pressable
            marginTop={5}
            key={value.id}
            margin={1}
            onPress={() => Login(APP_NAVIGATION.PROBLEM, value)}
          >
            <Center
              height={40}
              width={40}
              rounded="md"
              shadow={3}
              bg={"coolGray.700"}
            >
              <Image source={value.icon} style={{ width: 40, height: 40 }} />

              <Text color={"white"} fontFamily="Montserrat-Bold" fontSize={16}>
                {value.bn_name}
              </Text>
            </Center>
          </Pressable>
        ))}
        <Pressable
          marginTop={5}
          margin={1}
          onPress={() => Login(PARLAMENT_NAVIGATION.PARLAMENT, {})}
        >
          <Center
            height={40}
            width={40}
            rounded="md"
            shadow={3}
            bg={"coolGray.700"}
          >
            <Image source={icons.assemble} style={{ width: 40, height: 40 }} />

            <Text color={"white"} fontFamily="Montserrat-Bold" fontSize={16}>
              সংসদ সদস্য
            </Text>
          </Center>
        </Pressable>
        <Pressable
          marginTop={5}
          margin={1}
          onPress={() => Login(ROOT_NAVIGATION.DUDOK, {})}
        >
          <Center
            height={40}
            width={40}
            rounded="md"
            shadow={3}
            bg={"coolGray.700"} 
          >
            <Image source={icons.bribe} style={{ width: 40, height: 40 }} />

            <Text color={"white"} fontFamily="Montserrat-Bold" fontSize={16}>
              দুদক
            </Text>
          </Center>
        </Pressable>
      </HStack>

      <Box position={"absolute"} bottom={3}>
        <Text
          maxW={width * 0.8}
          fontSize={10}
          color={"white"}
          fontFamily="Montserrat-Bold"
        >
          Maintained and Developed by - AME, Md Faridul Islam. SB, BD POLICE.
        </Text>
      </Box>
    </Box>
  );
};

export default LandingScreen;
