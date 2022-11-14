import { Box, CheckIcon, Select, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";

import { HelperType } from "../../../../../typings/form-data";
import { icons } from "../../../../assets/icons";
import { GetDutyofficerInfo, GetHelperInfo } from "../../../../database/Database";
import { RankData } from "../../../../utils/dataObj";

let FontSize = 18;
const DutyOfficerScreen = ({setshare}:any) => {
  const [helperInfo, sethelperInfo] = useState([]);
  const [name, setname] = useState("");
  const [singlehelper, setsinglehelper] = useState();
  useEffect(() => {
    GetDutyofficerInfo({
      sethelperInfo: sethelperInfo,
      setsinglehelper:setsinglehelper
    });
  }, []);
 // console.log(singlehelper);
  return (
    <Box alignItems={"flex-end"} marginBottom={50} marginRight={5}>
      <Box mt={2} justifyContent="center" alignItems={"center"}>
        <Select
          // bg={"red.300"}
          width={200}
          borderWidth={0}
          fontSize={FontSize}
          placeholderTextColor="gray.800"
          textAlign="center"
          fontFamily={"Montserrat-Regular"}
          placeholder="ডিউটি অফিসার"
          defaultValue="ডিউটি অফিসার"
        //  opacity={0}
          accessibilityLabel="ডিউটি অফিসার"
         // selectedValue={name}
          selectedValue="ডিউটি অফিসার"
          dropdownIcon={<Image source={icons.add} style={{width:0,height:0}}/>}
          onValueChange={(itemValue: any) => {
            console.log("helper", itemValue);
            let obj = JSON.parse(itemValue) as HelperType;
            setname(itemValue);
            setsinglehelper(obj)
            setshare(false)
          }}
          _selectedItem={{
            bg: "white",
            endIcon: <CheckIcon size={5} />,
          }}
        >
          {helperInfo.map((item: HelperType) => (
            <Select.Item
              key={item?.bp}
              label={item?.helper}
              value={JSON.stringify(item)}
              _text={{ fontFamily: "Montserrat-Regular" }}
            />
          ))}
        </Select>
        {/* <TouchableOpacity onPress={() => console.log("press")}>
          <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
            ডিউটি অফিসার
          </Text>
        </TouchableOpacity> */}
        <Text mt={10} fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
         ({singlehelper?.helper})
        </Text>
        <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
         {RankData[singlehelper?.userRank]}(নিঃ)
        </Text>
        <Text fontFamily={"Montserrat-Regular"} fontSize={FontSize}>
          কম্পিউটার ল্যাব, এসবি, ঢাকা।
        </Text>
      </Box>
    </Box>
  );
};
export default React.memo(DutyOfficerScreen);
