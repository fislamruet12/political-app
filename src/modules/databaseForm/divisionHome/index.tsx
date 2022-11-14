import { Box, Button } from "native-base";
import React from "react";
import { FORM_NAVIGATION } from "../../../../typings/navigation";
import { width } from "../../../utils/handy";

const DivisionHomeScreen = (props) => {
  return (
    <Box justifyContent="center" alignItems={"center"} bg="black" flex={1}>
    
      <Box marginTop={5}>
        <Button
          size="lg"
          width={width / 2}
          bg={"gray.300"}
          onPress={() => props.navigation.navigate(FORM_NAVIGATION.PARTYINPUT)}
          _text={{
            fontFamily: "Montserrat-Bold",
            fontSize: 15,
            color: "red.900",
          }}
        >
         জেলার পার্টি ইনপুট
        </Button>
      </Box>
      {/* <Box>
        <Button
          bg={"gray.300"}
          width={width / 2}
          // borderTopLeftRadius={"full"}
          onPress={() => {}}
          size="lg"
          _text={{
            fontFamily: "Montserrat-Bold",
            fontSize: 15,
            color: "red.900",
          }}
        >
         জেলার নাম ইনপুট
        </Button>
      </Box> */}
    </Box>
  );
};

export default DivisionHomeScreen;
