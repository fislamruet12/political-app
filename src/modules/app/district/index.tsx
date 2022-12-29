import React, { useState } from "react";
import { Box, Button, Text } from "native-base";
import { height, width } from "../../../utils/handy";
import { FlatList } from "react-native-gesture-handler";
import { APP_NAVIGATION } from "../../../../typings/navigation";

import Loading from "../../../component/loading";
import { districtInfo } from "../../databaseForm/utils/functions";

const div = (id: string) => {
  return id === "9" ? " " : " বিভাগ";
};
const DashBoardScreen = (props: any) => {
  const divInfo = props.route.params;
  const [loading, setLoading] = useState(false);
  props.navigation.setOptions({
    title: divInfo?.bn_name + div(divInfo?.id),
  });

  const districtList = districtInfo(divInfo?.id);

  const renderItem = ({ item, index }: { item: any; index: string }) => {
    let dinfo = item;
    //console.log(dinfo);
    return (
      <Box marginX={2}>
        <Box bg="black" marginTop={2} roundedTop="md" padding={3}>
          <Box borderBottomColor={"coolGray.100"} borderBottomWidth={1} mb={2}>
            <Box flexDirection={"row"} alignItems="center">
              <Box>
                <Text
                  fontFamily={"Montserrat-Bold"}
                  fontSize={16}
                  mr={2}
                  color="white"
                  numberOfLines={1}
                  maxW={width * 0.8}
                >
                  {dinfo?.bn_name} {dinfo?.division_id === "9" ? "" : "জেলা"}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            flexDirection={"row"}
            justifyContent="flex-end"
            alignItems={"center"}
            padding={2}
          >
            {/* <Box mr={5}>
              <Button
                alignSelf={"center"}
                bg={"coolGray.600"}
                borderTopRightRadius={"lg"}
                onPress={() => {}}
                _text={{
                  fontFamily: "Montserrat-Bold",
                  fontSize: 12,
                  color: "white",
                }}
              >
                উপজেলা সমূহ
              </Button>
            </Box> */}
            <Box>
              <Button
                alignSelf={"center"}
                bg={"coolGray.600"}
                onPress={() =>
                  props.navigation.navigate(APP_NAVIGATION.PARTY, dinfo)
                }
                _text={{
                  fontFamily: "Montserrat-Bold",
                  fontSize: 12,
                  color: "white",
                }}
                borderTopRightRadius={"lg"}
              >
                পার্টি সমূহ
              </Button>
            </Box>
          </Box>
        </Box>
        <Box height={0.3} bg="primary.800" roundedBottom={"full"} />
      </Box>
    );
  };
  return (
    <Box bg="coolGray.600" flex={1}>
      <FlatList
        data={districtList}
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

export default DashBoardScreen;
