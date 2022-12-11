import React, { useEffect, useState } from "react";
import { Box, Button, Image, Input, Text } from "native-base";

import LinearGradient from "react-native-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import { Linking, TouchableOpacity } from "react-native";
import Loading from "../../../../component/loading";
import { height, width } from "../../../../utils/handy";
import { getDistrictPartyInfo } from "../../../../database/Database";
import { PersonTyp } from "../../../../../typings/form-data";
import { partyNameObj } from "../../../databaseForm/utils/partyName";
import { designationObj } from "../../../databaseForm/utils/podobi";
import { sin } from "react-native-reanimated";
import { queryParOrgSn } from "../../../databaseForm/utils/functions";

const PartySingleScreen = (props: any) => {
  const single = props.route.params as PersonTyp;
  console.log(single);
  
  return (
    <Box
      bg="coolGray.600"
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* <FlatList
        data={[1]}
        renderItem={renderItem}
        ListEmptyComponent={
          <Box marginTop={height / 2}>
            <Loading />
          </Box>
        }
      /> */}
       <Box marginX={1}
                  minW={width * 0.9}>
        <Box bg="black" roundedTop="md" padding={3}>
          <Box borderBottomColor={"coolGray.200"} borderBottomWidth={1} mb={2}>
            <Box flexDirection={"row"} alignItems="center">
              <Box>
                <Text
                  fontFamily={"Montserrat-Bold"}
                  fontSize={17}
                  mr={2}
                  color="white"
                  numberOfLines={1}
                  
                >
                  {single.name}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box ml={2}>
            <Box>
              <Text
               
                fontFamily={"Montserrat-Medium"}
                fontSize={16}
                color={"white"}
              >
                দল : {partyNameObj[single?.partyId]?.bn_name}
              </Text>
              <Text
               
                fontFamily={"Montserrat-Medium"}
                fontSize={16}
                color={"white"}
              >
                সংগঠন : {queryParOrgSn(single.organ)}
              </Text>
              <Text
               
                fontFamily={"Montserrat-Medium"}
                fontSize={14}
                color={"white"}
              >
                পদবি : {designationObj[single?.podobi]?.name}
              </Text>
              <Text
               
                fontFamily={"Montserrat-Medium"}
                fontSize={14}
                color={"white"}
              >
                মোবাইল : {single.contact_number}
              </Text>
              <Text
               
                fontFamily={"Montserrat-Medium"}
                fontSize={14}
                color={"white"}
              >
                বর্তমান ঠিকানা : {single.presentAddress}
              </Text>
              <Text
              
                fontFamily={"Montserrat-Medium"}
                fontSize={14}
                color={"white"}
              >
                স্থায়ী ঠিকানা: {single.parmanentAddress}
              </Text>
            </Box>
          </Box>
        </Box>

        {/* <Box height={0.3} bg="primary.800" roundedBottom={"full"} /> */}
      </Box>
    </Box>
  );
};

export default PartySingleScreen;
