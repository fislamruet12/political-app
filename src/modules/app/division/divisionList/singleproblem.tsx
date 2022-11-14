import { Box, Text } from "native-base";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import {
  APP_NAVIGATION,
  ROOT_NAVIGATION,
} from "../../../../../typings/navigation";
import { icons } from "../../../../assets/icons";
import { RootState } from "../../../../state/reducer";

import { sectionName } from "../../../../utils/dataObj";
import { height, width } from "../../../../utils/handy";
const SingleProblem = ({
  dinfo,
  index,
  navigation,
}: {
  dinfo: any;
  index: string;
  navigation: any;
}) => {
  let user = useSelector((state: RootState) => state.currentUser.user);
  const Login = (dinfo:any) => {
    if (user) {
      navigation.push(APP_NAVIGATION.DASHBOARD,dinfo);
    } else {
      navigation.push(ROOT_NAVIGATION.AUTH);
    }
  };
  //console.log(dinfo)
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 6 }}
      activeOpacity={0.4}
      onPress={() => Login(dinfo)}
    >
      <Box bg="black" marginTop={1} roundedTop="md" padding={4}>
        <Box
          flexDirection={"row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box
            flexDirection={"row"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            {/* <Box>
              <Text fontFamily={"Montserrat-Bold"} fontSize={15} mr={2}>
                {parseInt(index) + 1}.
              </Text>
            </Box> */}

            <Box>
              <Text
                maxWidth={220}
                fontFamily={"Montserrat-Medium"}
                fontSize={16}
                color={"white"}
              >
                {dinfo?.bn_name}
              </Text>
            </Box>
          </Box>
          <Box>
            <Box>
              <Image source={icons.play} style={{ height: 25, width: 25 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
export default React.memo(SingleProblem);
