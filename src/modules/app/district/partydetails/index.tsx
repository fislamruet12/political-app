import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "native-base";

import { FlatList } from "react-native-gesture-handler";
import { Alert, Linking } from "react-native";
import Loading from "../../../../component/loading";
import { height, width } from "../../../../utils/handy";
import { getDistrictPartyInfo } from "../../../../database/Database";
import { partyNameObj } from "../../../databaseForm/utils/partyName";
import { designationObj } from "../../../databaseForm/utils/podobi";
import { partyObjToArr } from "../../../databaseForm/utils/functions";
import { APP_NAVIGATION } from "../../../../../typings/navigation";

const PartyDetailsScreen = (props: any) => {
  const info = props.route.params;
  const [loading, setLoading] = useState(false);
  const [partydetails, setpartydetails] = useState({});
  props.navigation.setOptions({
    title:  info.bn_name 
  });
  useEffect(() => {
    getDistrictPartyInfo(info).then((res) => {
      if (res.error) {
        Alert.alert(res?.msg, "", [
          {
            text: "GO BACK",
            onPress: () => {
              props.navigation.goBack();
            },
            style: "cancel",
          },
        ]);
      } else {
        setpartydetails(res?.data);
      }
    });
  }, []);

  const renderItem = ({ item, index }: { item: any; index: string }) => {
    let dinfo = item;
    let prtInfo = partydetails[item];
    console.log(prtInfo);
    if (!prtInfo) return;
    let partyId = prtInfo[Object.keys(prtInfo)[0]].partyId;

    return (
      <Box marginX={1}>
        <Box bg="black" marginTop={1} roundedTop="md" padding={3}>
          <Box borderBottomColor={"coolGray.200"} borderBottomWidth={1} mb={2}>
            <Box flexDirection={"row"} alignItems="center">
              {/* <Box>
                <Text
                  fontFamily={"Montserrat-Bold"}
                  fontSize={14}
                  mr={2}
                  underline
                  color="white"
                >
                  {parseInt(item) + 1}.
                </Text>
              </Box> */}
              <Box>
                <Text
                  fontFamily={"Montserrat-Bold"}
                  fontSize={15}
                  mr={2}
                  color="white"
                  numberOfLines={1}
                  maxW={width * 0.8}
                >
                  {partyNameObj[partyId]?.name}
                </Text>
              </Box>
            </Box>
          </Box>

          {partyObjToArr(prtInfo).map((index, keys) => (
            <Box
              key={keys}
              bg={"coolGray.800"}
              padding={2}
              marginBottom={1}
              rounded="sm"
            >
              <Box>
                <Box>
                  <Box>
                    <Text
                      maxWidth={240}
                      fontFamily={"Montserrat-Medium"}
                      fontSize={14}
                      color={"white"}
                    >
                      {designationObj[index?.podobi]?.name} : {index.name}
                    </Text>
                    <Text
                      maxWidth={220}
                      fontFamily={"Montserrat-Medium"}
                      fontSize={12}
                      color={"white"}
                    >
                      মোবাইল : {index?.contact_number}
                    </Text>
                  </Box>
                  <Box></Box>
                </Box>
              </Box>
              <Box flexDirection={"row"} justifyContent="flex-end">
                <Button
                  alignSelf={"center"}
                  bg={"coolGray.600"}
                  onPress={() =>
                    // Linking.openURL(`tel:+88${index?.contact_number}`)
                    Linking.openURL(
                      `whatsapp://send?phone=+880${index?.contact_number}`
                    )
                  }
                  size={"sm"}
                  _text={{
                    fontFamily: "Montserrat-Bold",
                    fontSize: 12,
                    color: "white",
                  }}
                >
                  হোয়াটসঅ্যাপ
                </Button>
                <Button
                  alignSelf={"center"}
                  bg={"coolGray.600"}
                  marginLeft={2}
                  onPress={() =>
                     Linking.openURL(`tel:+88${index?.contact_number}`)
                   
                  }
                  size={"sm"}
                  _text={{
                    fontFamily: "Montserrat-Bold",
                    fontSize: 12,
                    color: "white",
                  }}
                >
                  কল করুন
                </Button>
                
                <Button
                  alignSelf={"center"}
                  bg={"coolGray.600"}
                  onPress={() =>
                    props.navigation.navigate(APP_NAVIGATION.DETAILS, index)
                  }
                  size={"sm"}
                  marginLeft={2}
                  _text={{
                    fontFamily: "Montserrat-Bold",
                    fontSize: 12,
                    color: "white",
                  }}
                >
                  ডিটেইলস
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        <Box height={0.3} bg="primary.800" roundedBottom={"full"} />
      </Box>
    );
  };

  return (
    <Box bg="coolGray.600" flex={1}>
      <FlatList
        data={Object.keys(partydetails)}
        renderItem={renderItem}
        ListEmptyComponent={
          <Box marginTop={height / 2}>
            <Loading />
          </Box>
        }
      />
    </Box>
  );
};

export default PartyDetailsScreen;
