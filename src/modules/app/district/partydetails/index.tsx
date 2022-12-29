import React, { useEffect, useState } from "react";
import { Box, Button, Center, CheckIcon, Select, Text } from "native-base";

import { FlatList } from "react-native-gesture-handler";
import { Alert, Image, Linking, TouchableOpacity } from "react-native";
import Loading from "../../../../component/loading";
import { height, width } from "../../../../utils/handy";
import { getDistrictPartyInfo } from "../../../../database/Database";
import { partyNameObj } from "../../../databaseForm/utils/partyName";
import { designationObj } from "../../../databaseForm/utils/podobi";
import { partyObjToArr, queryParOrg, queryParOrgSn } from "../../../databaseForm/utils/functions";
import { APP_NAVIGATION, EDIT_NAVIGATION } from "../../../../../typings/navigation";
import { partyName } from "../../../databaseForm/utils/partyName";
import { positionObj } from "../../../databaseForm/utils/position";
import { icons } from "../../../../assets/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/reducer";

const PartyDetailsScreen = (props: any) => {
  const user = useSelector((state: RootState) => state.currentUser.user);

  const info = props.route.params;
  const [service, setService] = React.useState("1");
  const [loading, setLoading] = useState(false);
  const [partydetails, setpartydetails] = useState({});
  props.navigation.setOptions({
    title: info.bn_name,
  });
  const getComData = () => {
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
  }
  useEffect(() => {
  
    const unsubscribe = props.navigation.addListener('focus', () => {
      getComData()
    });
   return unsubscribe;
  }, []);

  const renderItem = ({ item, index }: { item: any; index: string }) => {
    let single = partydetails["_" + service]
    let prtInfo = single[item]

    //   console.log('item',prtInfo,item);

    return (
      <Box marginX={1}>
        <Box bg="black" marginTop={1} roundedTop="md" padding={3}>
          <Box borderBottomColor={"coolGray.200"} borderBottomWidth={1} mb={2}>
            <Box flexDirection={"row"} alignItems="center">

              <Box>
                <Text
                  fontFamily={"Montserrat-Bold"}
                  fontSize={15}
                  mr={2}
                  color="white"
                  numberOfLines={1}
                  maxW={width * 0.8}
                >
                  {queryParOrgSn(item.substring(1))}
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
                    <Box flexDirection={'row'} justifyContent="space-between">
                      <Text

                        maxWidth={width - 10}
                        fontFamily={"Montserrat-Medium"}
                        fontSize={14}
                        color={"white"}
                      >
                        {designationObj[index?.podobi]?.name} {index.status === 0 ? null : "( " + positionObj[index?.status].bn_name + " )"} : {index.name}
                      </Text>
                      {
                        user?.role.is_super === 1 &&
                        <Box >
                          <TouchableOpacity onPress={() => props.navigation.navigate(EDIT_NAVIGATION.EDITCOMMITY, index)}>
                            <Image style={{ width: 20, height: 20 }} source={icons.edit} />
                          </TouchableOpacity>
                        </Box>
                      }
                    </Box>
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
                {

                }
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
  console.log(partydetails)
  return (
    <Box bg="coolGray.600" flex={1}>
      <Center>
        <Box>
          <Select
            selectedValue={service}
            minWidth={width - 20}
            accessibilityLabel="Choose Service"
            placeholder="Choose party"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" color="white" />,
            }}
            mt={1}
            color="white"
            defaultValue={service}
            onValueChange={(itemValue) => setService(itemValue)}
          >
            {partyName.map((value) => (
              <Select.Item
                key={value.id}
                label={value.bn_name}
                value={value.id.toString()}
              />
            ))}
          </Select>
        </Box>
      </Center>
      <FlatList
        data={Object.keys(partydetails === {} ? {} : partydetails["_" + service] ? partydetails["_" + service] : {})}
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
