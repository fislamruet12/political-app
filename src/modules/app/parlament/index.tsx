import {
  Box,
  Button,
  Center,
  CheckIcon,
  FlatList,
  HStack,
  Select,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { MemberType } from "../../../../typings/form-data";
import Loading from "../../../component/loading";
import { getParlamentInfo } from "../../../database/Database";
import { height, width } from "../../../utils/handy";
import { partyNames } from "../../../utils/party";
import { mainZone } from "../../databaseForm/utils/division";
import { querysingleDistrict } from "../../databaseForm/utils/functions";
import { partyNameObj,partyName } from "../../databaseForm/utils/partyName";
const ParlamenMembertList = (props: any) => {
  const [data, setData] = useState([]);
  const [zone, setzone] = useState("1");

  
  const Parmlament_mem = () => {
    getParlamentInfo({
      zone: parseInt(zone),
    }).then((res) => {
      console.log(res.data);
      if (res.data === null) {
        setData([]);
      } else {
        setData(res.data);
      }
    });
  };
  useEffect(() => {
    Parmlament_mem();
  }, [zone]);
  const renderItem = ({ item, index }: { item: any; index: string }) => {
    const mem = item as MemberType;

    return (
      <Box>
        <Box bg="black"  marginTop={2} marginX={1} roundedTop="md" padding={3}>
          <Box borderBottomColor={"coolGray.200"} borderBottomWidth={1} mb={2}>
            <Box flexDirection={"row"} alignItems="center">
              <Box>
                <Text color={'white'}fontFamily={"Montserrat-Bold"} fontSize={16} mr={2}>
                  {parseInt(index) + 1}.
                </Text>
              </Box>
              <Box>
                <Text color={'white'}fontFamily={"Montserrat-Bold"} fontSize={17}>
                  {mem.name}
                </Text>
              </Box>
            </Box>
          </Box>

          <HStack justifyContent="space-between">
            <VStack>
              <Text color={'white'} fontFamily={"Montserrat-Bold"} fontSize={15}>
                সংসদীয় আসন - {mem.parlament_seat}
              </Text>
              <Text color={'white'} fontFamily={"Montserrat-Bold"} fontSize={15}>
                {querysingleDistrict(mem.districtId.toString())}-{" "}
                {mem.districtOrder}
              </Text>
              <Text color={'white'}fontFamily={"Montserrat-Bold"} fontSize={12} maxWidth={width*.4}>
                ({mem.elakaName})
              </Text>
            </VStack>
            <VStack bg={'gray.100'}>
              <Box ml={2}>
                <Text
                  color={"green.900"}
                  fontFamily={"Montserrat-Bold"}
                  fontSize={13}
                >
                  {partyNameObj[mem.partyId].bn_name}
                </Text>
                <Text fontFamily={"Montserrat-Regular"} fontSize={13} underline>
                  {mem.nid}
                </Text>
                <Text
                  fontFamily={"Montserrat-Regular"}
                  fontSize={13}
                  underline={true}
                >
                  +88{item?.contact_number}
                </Text>
              </Box>
            </VStack>
          </HStack>
          <Box marginTop={1} flexDirection={"row"} justifyContent="flex-end">
            <Button
              alignSelf={"center"}
              bg={"coolGray.600"}
              onPress={() =>
                // Linking.openURL(`tel:+88${index?.contact_number}`)
                Linking.openURL(
                  `whatsapp://send?phone=+880${mem?.contact_number}`
                )
              }
              size={"sm"}
              _text={{
                fontFamily: "Montserrat-Bold",
                fontSize: 10,
                color: "white",
              }}
            >
              হোয়াটসঅ্যাপ
            </Button>
            <Button
              alignSelf={"center"}
              bg={"coolGray.600"}
              marginLeft={2}
              onPress={() => Linking.openURL(`tel:+88${mem?.contact_number}`)}
              size={"sm"}
              _text={{
                fontFamily: "Montserrat-Bold",
                fontSize: 10,
                color: "white",
              }}
            >
              কল করুন
            </Button>
            <Button
              alignSelf={"center"}
              bg={"coolGray.600"}
              marginLeft={2}
              onPress={() => {}}
              size={"sm"}
              _text={{
                fontFamily: "Montserrat-Bold",
                fontSize: 10,
                color: "white",
              }}
            >
             copy NID
            </Button>
            {/* <Button
              alignSelf={"center"}
              bg={"coolGray.600"}
              onPress={
                () => {} //  props.navigation.navigate(APP_NAVIGATION.DETAILS, index)
              }
              size={"sm"}
              marginLeft={2}
              _text={{
                fontFamily: "Montserrat-Bold",
                fontSize: 10,
                color: "white",
              }}
            >
              সম্পাদনা
            </Button> */}
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <Box bg={"coolGray.600"} flex={1}>
        <Center>
        <Box>
          <Select
            selectedValue={zone}
            minWidth={width - 20}
            accessibilityLabel="Choose Service"
            placeholder="Choose party"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            color="white"
            defaultValue={zone}
            onValueChange={(itemValue) => setzone(itemValue)}
          >
            {mainZone.map((value) => (
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
        data={data}
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
export default ParlamenMembertList;
