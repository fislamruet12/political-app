import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
} from "native-base";
import Modal from "react-native-modalbox";

import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";

import { Alert, ScrollView, View } from "react-native";
import { HelperType } from "../../../../../typings/form-data";
import LinearGradient from "react-native-linear-gradient";
import { height, width } from "../../../../utils/handy";
import { setHelperInfo } from "../../../../database/Database";
import { TouchableOpacity } from "react-native";
import { RankData, sectionName } from "../../../../utils/dataObj";

const HelpInputScreen = ({ open, setOpen, setreload, reload }: any) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    sectionName: Yup.string().required("Section is required."),
    userRank: Yup.string().required("Rank is Required"),
    bp: Yup.string().required("BP is Required"),
    helper: Yup.string().required("Helper name is required"),
    phone: Yup.string().required("phone is required"),
  });

  const initialValues: HelperType = {
    sectionName: "1",
    userRank: "1",
    bp: "",
    helper: "",
    phone: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setLoading(true);
      setHelperInfo(values)
        .then((res) => {
          // console.log("res", res);
          setLoading(false);

          if (res.error) {
            Alert.alert("An Error Occur");
          } else {
            let message = "Successfully Submitted";
            setOpen(false);
            setreload(!reload);
            Alert.alert("", message);
            //    navigationScreen(props.navigation, AddMore, message);
          }
        })
        .catch((err) => {
          // console.log("err1", err);
          setLoading(false);
          Alert.alert("", "Error Occured");
        });
    },
  });

  //console.log(formik.values);
  return (
    <Modal
      isOpen={open || reload}
      //  onClosed={() =>  setOpen(false)}
      style={{ height: height * 0.7, width: width * 0.85 }}
      position={"center"}
      swipeToClose={false}
      backdropPressToClose={false}
      backdropOpacity={0.7}
    >
      <Box>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            margin: 10,
          }}
        >
          <LinearGradient
            colors={["#f4f1f2", "#fafafa", "#f1d6d6"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            locations={[0, 0.4, 0.9]}
            style={{ flex: 1, width: width }}
          >
            <ScrollView style={{ padding: 15 }}>
              <Box>
                <FormControl
                  isRequired
                  isInvalid={formik.errors.bp && formik.touched.bp}
                >
                  <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
                    BP number
                  </FormControl.Label>
                  <Input
                    bg={"white"}
                    placeholder="BP number"
                    fontFamily="Montserrat-Bold"
                    fontSize={15}
                    value={formik.values.bp}
                    onChangeText={formik.handleChange("bp")}
                    onBlur={formik.handleBlur("bp")}
                  />
                  <FormControl.ErrorMessage
                    _text={{ fontFamily: "Montserrat-Bold" }}
                    marginLeft={1}
                  >
                    {formik.errors.bp}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
              <Box marginTop={3}>
                <FormControl
                  isRequired
                  isInvalid={formik.errors.helper && formik.touched.helper}
                >
                  <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
                    Name
                  </FormControl.Label>
                  <Input
                    bg={"white"}
                    placeholder="Name"
                    fontFamily="Montserrat-Bold"
                    fontSize={15}
                    value={formik.values.helper}
                    onChangeText={formik.handleChange("helper")}
                    onBlur={formik.handleBlur("helper")}
                  />
                  <FormControl.ErrorMessage
                    _text={{ fontFamily: "Montserrat-Bold" }}
                    marginLeft={1}
                  >
                    {formik.errors.helper}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>

              <Box marginTop={3}>
                <FormControl isRequired>
                  <FormControl.Label
                    _text={{ fontFamily: "Montserrat-Bold" }}
                    marginBottom={1}
                  >
                    Section Name
                  </FormControl.Label>
                  <Select
                    bg={"white"}
                    fontFamily={"Montserrat-Bold"}
                    placeholder="correction type"
                    selectedValue={formik.values.sectionName}
                    onValueChange={(itemValue: string) => {
                      formik.setFieldValue("sectionName", itemValue);
                    }}
                    _selectedItem={{
                      bg: "white",
                      endIcon: <CheckIcon size={5} />,
                    }}
                  >
                    {Object.keys(sectionName).map((item) => (
                      <Select.Item
                        key={item}
                        label={sectionName[item]}
                        value={item}
                        _text={{ fontFamily: "Montserrat-Regular" }}
                      />
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box marginTop={3}>
                <FormControl isRequired>
                  <FormControl.Label
                    _text={{ fontFamily: "Montserrat-Bold" }}
                    marginBottom={1}
                  >
                    Rank
                  </FormControl.Label>
                  <Select
                    bg={"white"}
                    fontFamily={"Montserrat-Bold"}
                    placeholder="correction type"
                    selectedValue={formik.values.userRank}
                    onValueChange={(itemValue: string) => {
                      formik.setFieldValue("userRank", itemValue);
                    }}
                    _selectedItem={{
                      bg: "white",
                      endIcon: <CheckIcon size={5} />,
                    }}
                  >
                    {Object.keys(RankData)
                      .reverse()
                      .map((item) => (
                        <Select.Item
                          _text={{ fontFamily: "Montserrat-Regular" }}
                          key={item}
                          label={RankData[item]}
                          value={item}
                        />
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Box marginTop={3}>
                <FormControl
                  isRequired
                  isInvalid={formik.errors.phone && formik.touched.phone}
                >
                  <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
                    Phone Number
                  </FormControl.Label>
                  <InputGroup>
                    <InputLeftAddon bg={"white"} children={"+880"} />
                    <Input
                      bg={"white"}
                      fontFamily="Montserrat-Regular"
                      fontSize={15}
                      placeholder="Phone number"
                      keyboardType="phone-pad"
                      value={formik.values.phone}
                      onChangeText={formik.handleChange("phone")}
                      onBlur={formik.handleBlur("phone")}
                      w={{
                        base: "87%",
                        md: "87%",
                      }}
                    />
                  </InputGroup>
                  <FormControl.ErrorMessage
                    _text={{ fontFamily: "Montserrat-Bold" }}
                    marginLeft={1}
                  >
                    {formik.errors.phone}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
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
            <Box zIndex={100} position={"absolute"} right={-15} top={-30}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setOpen(false)}
              >
                <Box backgroundColor={"white"} padding={2} rounded="full">
                  <Text fontFamily="Montserrat-Bold" color="red.600">
                    X
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </LinearGradient>
        </View>
      </Box>
    </Modal>
  );
};

export default React.memo(HelpInputScreen);
