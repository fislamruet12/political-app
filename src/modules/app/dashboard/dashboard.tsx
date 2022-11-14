import React, { useEffect, useState } from "react";
import { Box, Button, Text, View } from "native-base";
import { RootState } from "../../../state/reducer";
import LinearGradient from "react-native-linear-gradient";
import {
  APP_NAVIGATION,
  ROOT_NAVIGATION,
} from "../../../../typings/navigation";
import { useSelector } from "react-redux";
import Loading from "../../../component/loading";
import MsgScreen from "../../auth/signin/msg";
import { GetAccessInfo } from "../../../database/Database";
import DeviceInfo from "react-native-device-info";
import { width } from "../../../utils/handy";
const LandingScreen = (props: any) => {
  const user = useSelector((state: RootState) => state.currentUser.user);
  const [dicision, setdicision] = useState(0);
  const [uniqId, setuniqId] = useState("");
  const [refresh, setrefesh] = useState(false);

  const Login = (path: any) => {
    if (user) {
      props.navigation.push(path);
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
      <Box>
        <Button
          alignSelf={"center"}
          bg={"coolGray.900"}
          onPress={() => Login(APP_NAVIGATION.PROBLEM)}
          size="lg"
          _text={{
            fontFamily: "Montserrat-Bold",
            fontSize: 16,
            color: "white",
          }}
          borderTopRightRadius={"lg"}
        >
          পার্টি সমূহ
        </Button>
      </Box>
      <Box marginTop={5}>
        <Button
          alignSelf={"center"}
          bg={"coolGray.900"}
          size="lg"
          onPress={() => Login(APP_NAVIGATION.PROBLEM)}
          _text={{
            fontFamily: "Montserrat-Bold",
            fontSize: 16,
            color: "white",
          }}
          borderTopRightRadius={"lg"}
        >
          সংসদ সদস্য
        </Button>
      </Box>
      <Box position={"absolute"} bottom={3} >
        <Text maxW={width*.8} fontSize={15}  color={"black"} fontFamily="Montserrat-Bold">
          Maintained and Developed by - AME, Md Faridul Islam. SB, BD POLICE.
        </Text>
      </Box>
    </Box>
  );
};

export default LandingScreen;
