import { Box, Button, FormControl, Input, Text } from "native-base";
import React from "react";
import { DEVICE_NAVIGATION } from "../../../../../typings/navigation";
const QrCodeText = ({ formik, navigation }: any) => {
  return (
    <Box marginTop={4} flexDirection={"row"}>
      <FormControl
        isRequired
        isInvalid={
          formik.errors.deviceIdentityNumber &&
          formik.touched.deviceIdentityNumber
        }
      >
        <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
          Device Unique Number
        </FormControl.Label>
        <Input
          type="text"
          bg={"white"}
          multiline
          fontFamily={"Montserrat-Bold"}
          placeholder="Unique number"
          value={formik.values.deviceIdentityNumber}
          onChangeText={formik.handleChange("deviceIdentityNumber")}
          onBlur={formik.handleBlur("deviceIdentityNumber")}
        //   InputRightElement={
        //     <Box flexDirection={'row'}>
        //         <Button
        //       onPress={() => navigation.navigate(DEVICE_NAVIGATION.QRCODE)}
        //       bg={"red.300"}
        //       _text={{ fontFamily: "Montserrat-Bold", fontSize: 12 }}
        //     >
        //       QRCODE
        //     </Button>
        //     <Button
        //      ml={2}
        //      size={"xs"}
        //       onPress={() => navigation.navigate(DEVICE_NAVIGATION.BARCODE)}
        //       bg={"red.300"}
        //       _text={{ fontFamily: "Montserrat-Bold", fontSize: 12 }}
        //     >
        //       BARCODE
        //     </Button>
        //     </Box>
        //   }
        />
        <FormControl.ErrorMessage
          _text={{ fontFamily: "Montserrat-SemiBold" }}
          marginLeft={1}
        >
          {formik.errors.deviceIdentityNumber}
        </FormControl.ErrorMessage>
      </FormControl>
      <Box>
        <Button
          bg={"red.800"}
          _text={{ fontFamily: "Montserrat-Bold" }}
          mt={5}
          onPress={() => {}}
        >
          QRCODE
        </Button>
      </Box>
    </Box>
  );
};
export default QrCodeText;
