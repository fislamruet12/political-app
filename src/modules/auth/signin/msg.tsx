import { Box, Text } from "native-base";
import React from "react";
import { Alert, Image, TouchableOpacity } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { icons } from "../../../assets/icons";

const MsgScreen = ({ uniqId ,setrefresh,refresh}:any) => {
  return (
    <Box flex={1} bg="white" justifyContent={"center"} alignItems={"center"}>
      <Box>
        <Text fontFamily={"Montserrat-Bold"}>Device not found.</Text>
      </Box>
      <Box>
        <Text fontFamily={"Montserrat-Bold"}>
          Please , contact your admin with,
        </Text>
      </Box>
      <Box>
        <Text color={"green.900"} fontFamily={"Montserrat-Bold"} underline>
          {uniqId}
        </Text>
      </Box>
      <Box margin={10}>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(uniqId);
            Alert.alert("", "Copy Successfully-" + uniqId);
          }}
        >
          <Text color={"red.900"} fontFamily={"Montserrat-Bold"} underline>
            Copy this Id
          </Text>
        </TouchableOpacity>
      </Box>
      <Box marginTop={5}>
        <TouchableOpacity
          onPress={() => {
            setrefresh(!refresh)
          }}
        >
          <Text color={"red.900"} fontFamily={"Montserrat-Bold"} underline>
            Refresh
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
export default MsgScreen;
