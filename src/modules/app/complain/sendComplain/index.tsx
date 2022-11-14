import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "native-base";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";

import { Alert, ScrollView } from "react-native";
import { ProblemRequestType } from "../../../../../typings/form-data";
import LinearGradient from "react-native-linear-gradient";
import {  width } from "../../../../utils/handy";
import {
  setProblemInfo,
  setUpdateDeviceInfo,
} from "../../../../database/Database";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/reducer";
import { complainNavigationScreen } from "../../../../utils/navigate";
import {
  DeviceNameData,
  problemTypeData,
  roomInfoType,
  sectionName,
} from "../../../../utils/dataObj";

const SendComplainScreen = (props: any) => {
  const deviceInfo = useSelector(
    (state: RootState) => state.currentDevice.deviceInfo
  );

  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required("Phone number is Required"),
    roomNumber: Yup.string(),
    correctionType: Yup.string().required("Correction type is Required"),
    issueDate: Yup.number(),
    deviceIdentityNumber: Yup.string(),
    solveStatus: Yup.number(),
    description: Yup.string().required("Problem description is required"),
  });

  const initialValues: ProblemRequestType = {
    deviceIdentityNumber: deviceInfo?.deviceIdentityNumber,
    roomNumber: deviceInfo?.roomNumber,
    correctionType: "1",
    description: "ok",
    issueDate: new Date().getTime(),
    phoneNumber: "",
    solveStatus: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      // console.log(values);
      setLoading(true);
      setProblemInfo(values)
        .then((res) => {
          // console.log(res);
          if (res.error) {
            Alert.alert("", "Unexpected error occur");
            setLoading(false);
          } else {
            setLoading(false);
            complainNavigationScreen(
              props.navigation,
              () => {
                console.log("press");
              },
              "Succesfully submitted"
            );
          }
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert("", "Unexpected error occur");
        });
    },
  });

  //console.log(formik.errors,formik.values);
  return (
    <LinearGradient
      colors={["#f4f1f2", "#fafafa", "#f1d6d6"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      locations={[0, 0.4, 0.9]}
      style={{ flex: 1, width: width }}
    >
      <ScrollView style={{ padding: 15 }}>
        <Box>
          <FormControl isRequired>
            <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
              RoomNumber {}
            </FormControl.Label>
            <Input
              bg={"white"}
              isDisabled={true}
              fontFamily="Montserrat-Bold"
              fontSize={15}
              value={formik.values.roomNumber + "   [ "+sectionName[deviceInfo?.sectionName] +"]"}
            />
            <FormControl.ErrorMessage
              _text={{ fontFamily: "Montserrat-Bold" }}
              marginLeft={1}
            >
              {formik.errors.roomNumber}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Box marginTop={4}>
          <FormControl isRequired>
            <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
              FloorNumber 
            </FormControl.Label>
            <Input
              bg={"white"}
              isDisabled={true}
              fontFamily="Montserrat-Bold"
              fontSize={15}
              value={
                deviceInfo?.floorNumber +
                "\t\t [ " +
                roomInfoType[deviceInfo?.buildingName] +
                " ]"
              }
            />
          </FormControl>
        </Box>

        <Box marginTop={4}>
          <FormControl isRequired>
            <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
              Device Name
            </FormControl.Label>
            <Input
              bg={"white"}
              isDisabled={true}
              fontFamily="Montserrat-Bold"
              fontSize={15}
              value={
                DeviceNameData[deviceInfo?.deviceName]
              }
            />
          </FormControl>
        </Box>

        <Box marginTop={4}>
          <FormControl
            isRequired
            isInvalid={formik.errors.phoneNumber && formik.touched.phoneNumber}
          >
            <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
             User Phone Number
            </FormControl.Label>
            <InputGroup>
              <InputLeftAddon bg={"white"} children={"+880"} />
              <Input
                bg={"white"}
                fontFamily="Montserrat-Regular"
                fontSize={15}
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={formik.values.phoneNumber}
                onChangeText={formik.handleChange("phoneNumber")}
                onBlur={formik.handleBlur("phoneNumber")}
                w={{
                  base: "87%",
                  md: "87%",
                }}
              />
            </InputGroup>
            <FormControl.ErrorMessage
              _text={{ fontFamily: "Montserrat-SemiBold" }}
              marginLeft={1}
            >
              {formik.errors.phoneNumber}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>

        <Box marginTop={4}>
          <FormControl isRequired>
            <FormControl.Label
              _text={{ fontFamily: "Montserrat-Bold" }}
              marginBottom={1}
            >
              Correction type
            </FormControl.Label>
            <Select
              bg={"white"}
              fontFamily={"Montserrat-Bold"}
              placeholder="correction type"
              selectedValue={formik.values.correctionType}
              onValueChange={(itemValue: string) => {
                formik.setFieldValue("correctionType", itemValue);
              }}
              _selectedItem={{
                bg: "white",
                endIcon: <CheckIcon size={5} />,
              }}
            >
              {Object.keys(problemTypeData).map((item) => (
                <Select.Item
                  _text={{ fontFamily: "Montserrat-Regular" }}
                  key={item}
                  label={problemTypeData[item]}
                  value={item}
                />
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* <Box marginTop={4}>
          <FormControl
            isRequired
            isInvalid={formik.errors.description && formik.touched.description}
          >
            <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
              Problem description
            </FormControl.Label>
            <Input
              type="text"
              bg={"white"}
              multiline
              fontFamily={"Montserrat-Bold"}
              placeholder="Problem description"
              value={formik.values.description}
              onChangeText={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
            />
            <FormControl.ErrorMessage
              _text={{ fontFamily: "Montserrat-SemiBold" }}
              marginLeft={1}
            >
              {formik.errors.description}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box> */}

        <Box marginBottom={5}>
          <Button
            bg={"red.300"}
            _text={{ fontFamily: "Montserrat-Bold" }}
            isLoading={loading}
            isLoadingText="Requesting"
            mt={5}
            onPress={formik.handleSubmit}
          >
            CONFIRM
          </Button>
        </Box>
      </ScrollView>
    </LinearGradient>
  );
};

export default SendComplainScreen;
