import React, { useEffect, useState } from "react";
import { Box, Button, Text, View } from "native-base";
import { height, width } from "../../../../utils/handy";
import LinearGradient from "react-native-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import { Image, Linking, TouchableOpacity } from "react-native";
import { icons } from "../../../../assets/icons";
import { GetHelperInfo } from "../../../../database/Database";
import { HelperType } from "../../../../../typings/form-data";
import Loading from "../../../../component/loading";
import HelpInputScreen from "./helperInput";
import { RankData, sectionName } from "../../../../utils/dataObj";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/reducer";

const HelperScreen = (props: any) => {
  const user = useSelector((state: RootState) => state.currentUser.user);
  const [helperInfo, sethelperInfo] = useState([]);
  const [open, setOpen] = useState(false);
  const [reload, setreload] = useState(false);
  useEffect(() => {
    GetHelperInfo({
      sethelperInfo: sethelperInfo,
    });
  }, [reload]);

  const renderItem = ({ item, index }: { item: any; index: string }) => {
    let helpinfo = helperInfo[item] as HelperType;
    return (
      <Box>
        <Box bg="white" marginTop={2} roundedTop="md" padding={3}>
          <Box flexDirection={'row'} justifyContent="space-between">
            <Box flexDirection={"row"} alignItems="center">
              <Box
                width={width * 0.15}
                rounded={"full"}
                borderColor="coolGray.200"
                borderWidth={1}
              >
                <Box alignSelf={"center"}>
                  <Image
                    source={icons.idea}
                    style={{ width: 30, height: 30 }}
                  />
                </Box>
              </Box>
              <Box
                flexDirection={"row"}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box ml={4} width={0.55 * width}>
                  <Text
                    lineHeight={22}
                    fontFamily={"Montserrat-Bold"}
                    fontSize={16}
                  >
                    {helpinfo.helper}
                    <Text
                      lineHeight={22}
                      fontFamily={"Montserrat-Regular"}
                      fontSize={12}
                    >
                      {"\t\t"}_({sectionName[helpinfo.sectionName]})
                    </Text>
                  </Text>
                  <Text
                    fontFamily={"Montserrat-Regular"}
                    fontSize={12}
                    lineHeight={12}
                    my={1}
                    maxWidth={220}
                  >
                    {RankData[helpinfo.userRank]}
                  </Text>

                  <Text
                    fontFamily={"Montserrat-Regular"}
                    fontSize={12}
                    color="primary.800"
                    maxWidth={220}
                  >
                    +880{helpinfo.phone}
                  </Text>
                  {/* <Text
                  fontFamily={"Montserrat-Regular"}
                  fontSize={14}
                  underline={true}
                  maxWidth={220}
                >
                 {new Date(dinfo.createDate).toISOString()}
                </Text> */}
                </Box>
              </Box>
            </Box>
            <Box>
              <Button
                alignSelf={"center"}
                bg={"gray.300"}
                borderTopLeftRadius={"full"}
                onPress={() => Linking.openURL(`tel:+880${helpinfo.phone}`)}
                _text={{
                  fontFamily: "Montserrat-Bold",
                  fontSize: 10,
                  color: "red.900",
                }}
              >
                CALL
              </Button>
            </Box>
          </Box>
        </Box>
        <Box height={0.3} bg="primary.800" roundedBottom={"full"} />
      </Box>
    );
  };

  return (
    <LinearGradient
      colors={["#fae3e6", "#fafafa", "#ffffff"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      locations={[0, 0.4, 0.9]}
      style={{ flex: 1 }}
    >
      <Box margin={1} marginBottom={60}>
        <FlatList
          data={Object.keys(helperInfo)}
          renderItem={renderItem}
          ListEmptyComponent={
            <Box marginTop={height / 2}>
              <Loading />
            </Box>
          }
        />
      </Box>
      {user && user?.role?.is_super === 1 && (
        <Box position={"absolute"} bottom={5} right={5}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(true)}>
            <LinearGradient
              colors={["#5b23cc", "#8a6bb0", "#112bc0"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              locations={[0, 0.4, 0.9]}
              style={{
                borderRadius: 30,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                fontSize={25}
                color={"white"}
                fontFamily={"Montserrat-Bold"}
              >
                +
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Box>
      )}
      {user && user?.role?.is_super === 1 && (
        <HelpInputScreen
          open={open}
          setOpen={setOpen}
          reload={reload}
          setreload={setreload}
        />
      )}
    </LinearGradient>
  );
};

export default HelperScreen;
