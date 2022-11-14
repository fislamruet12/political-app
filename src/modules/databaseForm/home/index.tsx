import { Box, Button } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { FORM_NAVIGATION } from "../../../../typings/navigation";
import { RootState } from "../../../state/reducer";
import { AddUser } from "../../../utils/adduser";
import { width } from "../../../utils/handy";

const FormHomeScreen = (props) => {
  let user = useSelector((state: RootState) => state.currentUser.user);
 
  return (
    <Box justifyContent="center" alignItems={"center"} bg="black" flex={1}>
      <Box>
        <Button
          bg={"gray.300"}
          width={width / 2}
          // borderTopLeftRadius={"full"}
          onPress={() => props.navigation.navigate(FORM_NAVIGATION.DIVISIONHOME)}
          size="lg"
          _text={{
            fontFamily: "Montserrat-Bold",
            fontSize: 15,
            color: "red.900",
          }}
        >
          বিভাগ সমূহ
        </Button>
      </Box>
      <Box marginTop={5}>
        <Button
          size="lg"
          width={width / 2}
          bg={"gray.300"}
          onPress={() => {}}
          _text={{
            fontFamily: "Montserrat-Bold",
            fontSize: 15,
            color: "red.900",
          }}
        >
          মহানগর
        </Button>
      </Box>
      {/* <Box marginTop={5}>
        <Button
          size="lg"
          width={width / 2}
          bg={"gray.300"}
          onPress={() => AddUser()}
          _text={{
            fontFamily: "Montserrat-Bold",
            fontSize: 15,
            color: "red.900",
          }}
        >
          পার্টির নাম ইনপুট
        </Button>
      </Box> */}
    { user?.role?.is_super===1 &&
        <Box marginTop={5}>
        <Button
          size="lg"
          width={width / 2}
          bg={"gray.300"}
          onPress={() => props.navigation.navigate(FORM_NAVIGATION.ACCESS)}
          _text={{
            fontFamily: "Montserrat-Bold",
            fontSize: 15,
            color: "red.900",
          }}
        >
         ACCESS
        </Button>
      </Box>
    }
    </Box>
  );
};

export default FormHomeScreen;
