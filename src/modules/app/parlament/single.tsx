import { Box, HStack, Text, VStack ,Button, useToast} from "native-base"
import React from "react"
import {  Linking } from "react-native"
import { MemberType } from "../../../../typings/form-data"
import { width } from "../../../utils/handy"
import { querysingleDistrict } from "../../databaseForm/utils/functions"
import { partyNameObj } from "../../databaseForm/utils/partyName"
import Clipboard from "@react-native-clipboard/clipboard";
const SingleMember=({mem})=>{
  const toast = useToast();
    return(
        <Box>
        <Box bg="black" marginTop={2} marginX={1} roundedTop="md" padding={3}>
          <Box borderBottomColor={"coolGray.200"} borderBottomWidth={1} mb={2}>
            <Box flexDirection={"row"} alignItems="center">
              <Box>
                <Text color={'white'} fontFamily={"Montserrat-Bold"} fontSize={15} mr={2}>
                  {mem.parlament_seat}.
                </Text>
              </Box>
              <Box>
                <Text color={'white'} fontFamily={"Montserrat-Bold"} fontSize={16}>
                  {mem.name}
                </Text>
              </Box>
            </Box>
          </Box>

          <HStack justifyContent="space-between">
            <VStack>
              <Text color={'white'} fontFamily={"Montserrat-Bold"} fontSize={13}>
                সংসদীয় আসন - {mem.parlament_seat}
              </Text>
              <Text color={'white'} fontFamily={"Montserrat-Bold"} fontSize={13}>
                {querysingleDistrict(mem.districtId.toString())}-{" "}
                {mem.districtOrder}
              </Text>
              <Text color={'white'} fontFamily={"Montserrat-Bold"} fontSize={10} maxWidth={width * .4}>
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
                  +88{mem?.contact_number}
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
              onPress={() => {  Clipboard.setString(mem.nid)
                toast.show({
                   duration:10,
                  title: `${mem.nid} is copied.`,
                  bg:'red.900'
                }); }}
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
    )
}
export default React.memo( SingleMember)