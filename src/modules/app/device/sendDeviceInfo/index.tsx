import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Input,
  Select,
  Text,
} from "native-base";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";

import { Alert, ScrollView } from "react-native";
import { PersonTyp } from "../../../../../typings/form-data";
import LinearGradient from "react-native-linear-gradient";
import { divisions } from "../../../databaseForm/utils/division";
import { districts } from "../../../databaseForm/utils/district";
import { partyName } from "../../../databaseForm/utils/partyName";
import { designation } from "../../../databaseForm/utils/podobi";
import {
  districtInfo,
  singledistrictInfo,
} from "../../../databaseForm/utils/functions";
import { TouchableOpacity } from "react-native";
import { setDistrictPartyInfo } from "../../../../database/Database";
import { navigationScreen } from "../../../../utils/navigate";
const SendPartyInfoScreen = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [exp1, setexp1] = useState(true);
  const [exp2, setexp2] = useState(true);
  const validationSchema = Yup.object().shape({
    divisionId: Yup.number().test(
      "selection",
      "Division is Required",
      (number) => number !== 0
    ),
    districtId: Yup.number().test(
      "selection",
      "District is Required",
      (number) => number !== 0
    ),
    partyId: Yup.number(),
    podobi: Yup.number(),
    name: Yup.string().required("Name is Required"),
    contact_number: Yup.string().required("Phone number is Required"),
    fatherName: Yup.string().required("Father Name is Required"),
    motherName: Yup.string().required("Mother Name is Required"),
    nid: Yup.string().required("NID is Required"),
    presentAddress: Yup.string().required("Present address is required."),
    parmanentAddress: Yup.string().required("Parmanent address is required."),
    createDate: Yup.number(),
  });

  const initialValues: PersonTyp = {
    divisionId: 0,
    districtId: 0,
    partyId: 1,
    podobi: 1,
    name: "",
    contact_number: "",
    fatherName: "",
    motherName: "",
    nid: "",
    presentAddress: "",
    parmanentAddress: "",
    createDate: new Date().getTime(),
    active: 1,
  };
  const AddMore = () => {};
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      setDistrictPartyInfo(values)
        .then((res) => {
          console.log("res", res);
          setLoading(false);

          if (res.error) {
            Alert.alert("An Error Occur");
          } else {
            let message = "Successfully Submitted";
            navigationScreen(props.navigation, AddMore, message);
          }
        })
        .catch((err) => {
          console.log("err1", err);
          setLoading(false);
          Alert.alert("", "Duplicate Unique device ID");
        });
    },
  });
  const districtlist = districtInfo(formik.values.divisionId.toString());

  console.log(formik.values);
  return (
    <LinearGradient
      colors={["#f4f1f2", "#fafafa", "#f7f4f4"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      locations={[0, 0.4, 0.9]}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ padding: 15 }}>
        <Box>
          {exp1 && (
            <Box>
              <Box>
                <FormControl
                  isRequired
                  isInvalid={
                    formik.errors.divisionId && formik.touched.divisionId
                  }
                >
                  <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
                    বিভাগের নাম
                  </FormControl.Label>
                  <Select
                    bg={"white"}
                    boxSize={"sm"}
                    fontFamily={"Montserrat-Bold"}
                    placeholder="বিভাগের নাম"
                    selectedValue={formik.values.divisionId.toString()}
                    onValueChange={(itemValue: string) => {
                      formik.setFieldValue("divisionId", parseInt(itemValue));
                      formik.setFieldValue(
                        "districtId",
                        singledistrictInfo(itemValue)
                      );
                    }}
                    _selectedItem={{
                      bg: "white",
                      endIcon: <CheckIcon size={5} />,
                    }}
                  >
                    {divisions.map((item) => (
                      <Select.Item
                        _text={{ fontFamily: "Montserrat-Regular" }}
                        key={item.id}
                        label={item.bn_name}
                        value={item.id}
                      />
                    ))}
                  </Select>
                  <FormControl.ErrorMessage
                    _text={{ fontFamily: "Montserrat-Bold" }}
                    marginLeft={1}
                  >
                    {formik.errors.divisionId}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>

              <Box marginTop={2}>
                <FormControl
                  isRequired
                  isInvalid={
                    formik.errors.districtId && formik.touched.districtId
                  }
                >
                  <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
                    জেলার নাম
                  </FormControl.Label>
                  <Select
                    bg={"white"}
                    fontFamily={"Montserrat-Bold"}
                    placeholder="জেলার নাম"
                    selectedValue={formik.values.districtId + ""}
                    onValueChange={(itemValue: string) => {
                      formik.setFieldValue("districtId", parseInt(itemValue));
                    }}
                    _selectedItem={{
                      bg: "white",
                      endIcon: <CheckIcon size={5} />,
                    }}
                  >
                    {districtlist.map((item) => (
                      <Select.Item
                        _text={{ fontFamily: "Montserrat-Regular" }}
                        key={item.id}
                        label={item.bn_name}
                        value={item.id}
                      />
                    ))}
                  </Select>
                  <FormControl.ErrorMessage
                    _text={{ fontFamily: "Montserrat-Bold" }}
                    marginLeft={1}
                  >
                    {formik.errors.districtId}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>

              <Box marginTop={2}>
                <FormControl
                  isRequired
                  isInvalid={formik.errors.partyId && formik.touched.partyId}
                >
                  <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
                    রাজনৈতিক দলের নাম
                  </FormControl.Label>
                  <Select
                    bg={"white"}
                    fontFamily={"Montserrat-Bold"}
                    placeholder=" রাজনৈতিক দলের নাম"
                    selectedValue={formik.values.partyId + ""}
                    onValueChange={(itemValue: string) => {
                      formik.setFieldValue("partyId", parseInt(itemValue));
                    }}
                    _selectedItem={{
                      bg: "white",
                      endIcon: <CheckIcon size={5} />,
                    }}
                  >
                    {partyName.map((item) => (
                      <Select.Item
                        _text={{ fontFamily: "Montserrat-Regular" }}
                        key={item.id}
                        label={item.name}
                        value={item.id + ""}
                      />
                    ))}
                  </Select>
                  <FormControl.ErrorMessage
                    _text={{ fontFamily: "Montserrat-Bold" }}
                    marginLeft={1}
                  >
                    {formik.errors.partyId}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
              <Box marginTop={2}>
                <FormControl
                  isRequired
                  isInvalid={formik.errors.podobi && formik.touched.podobi}
                >
                  <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
                    পদের নাম
                  </FormControl.Label>
                  <Select
                    bg={"white"}
                    fontFamily={"Montserrat-Bold"}
                    placeholder="পদের নাম"
                    selectedValue={formik.values.podobi + ""}
                    onValueChange={(itemValue: string) => {
                      formik.setFieldValue("podobi", parseInt(itemValue));
                    }}
                    _selectedItem={{
                      bg: "white",
                      endIcon: <CheckIcon size={5} />,
                    }}
                  >
                    {designation.map((item) => (
                      <Select.Item
                        _text={{ fontFamily: "Montserrat-Regular" }}
                        key={item.id}
                        label={item.name}
                        value={item.id + ""}
                      />
                    ))}
                  </Select>
                  <FormControl.ErrorMessage
                    _text={{ fontFamily: "Montserrat-Bold" }}
                    marginLeft={1}
                  >
                    {formik.errors.podobi}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
            </Box>
          )}
          <TouchableOpacity onPress={() => setexp1(!exp1)}>
            <Box bg="gray.700" padding={2} marginTop={2}>
              <Box alignSelf={"flex-end"} justifyContent="center">
                <Text
                  fontSize={18}
                  marginRight={2}
                  color={"green.300"}
                  fontFamily="Montserrat-Medium"
                >
                  {exp1 ? "\u005E" : "\u02C5"}
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box>
          <Box>
            {exp2 && (
              <Box>
                <Box marginTop={2}>
                  <FormControl
                    isRequired
                    isInvalid={formik.errors.name && formik.touched.name}
                  >
                    <FormControl.Label
                      _text={{ fontFamily: "Montserrat-Bold" }}
                    >
                      নাম
                    </FormControl.Label>
                    <Input
                      bg={"white"}
                      fontFamily={"Montserrat-Bold"}
                      type="text"
                      placeholder="নাম"
                      value={formik.values.name}
                      onChangeText={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                    />
                    <FormControl.ErrorMessage
                      _text={{ fontFamily: "Montserrat-SemiBold" }}
                      marginLeft={1}
                    >
                      {formik.errors.name}
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Box>
                <Box marginTop={2}>
                  <FormControl
                    isRequired
                    isInvalid={
                      formik.errors.contact_number &&
                      formik.touched.contact_number
                    }
                  >
                    <FormControl.Label
                      _text={{ fontFamily: "Montserrat-Bold" }}
                    >
                      মোবাইল নাম্বার
                    </FormControl.Label>
                    <Input
                      bg={"white"}
                      fontFamily={"Montserrat-Bold"}
                      placeholder="মোবাইল নাম্বার"
                      keyboardType="phone-pad"
                      value={formik.values.contact_number}
                      onChangeText={formik.handleChange("contact_number")}
                      onBlur={formik.handleBlur("contact_number")}
                    />
                    <FormControl.ErrorMessage
                      _text={{ fontFamily: "Montserrat-SemiBold" }}
                      marginLeft={1}
                    >
                      {formik.errors.contact_number}
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Box>
                <Box marginTop={2}>
                  <FormControl
                    isRequired
                    isInvalid={
                      formik.errors.fatherName && formik.touched.fatherName
                    }
                  >
                    <FormControl.Label
                      _text={{ fontFamily: "Montserrat-Bold" }}
                    >
                      বাবার নাম
                    </FormControl.Label>
                    <Input
                      bg={"white"}
                      fontFamily={"Montserrat-Bold"}
                      placeholder="বাবার নাম"
                      value={formik.values.fatherName}
                      onChangeText={formik.handleChange("fatherName")}
                      onBlur={formik.handleBlur("fatherName")}
                    />
                    <FormControl.ErrorMessage
                      _text={{ fontFamily: "Montserrat-SemiBold" }}
                      marginLeft={1}
                    >
                      {formik.errors.fatherName}
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Box>
                <Box marginTop={2}>
                  <FormControl
                    isRequired
                    isInvalid={
                      formik.errors.motherName && formik.touched.motherName
                    }
                  >
                    <FormControl.Label
                      _text={{ fontFamily: "Montserrat-Bold" }}
                    >
                      মাতার নাম
                    </FormControl.Label>
                    <Input
                      bg={"white"}
                      fontFamily={"Montserrat-Bold"}
                      placeholder="মাতার নাম"
                      value={formik.values.motherName}
                      onChangeText={formik.handleChange("motherName")}
                      onBlur={formik.handleBlur("motherName")}
                    />
                    <FormControl.ErrorMessage
                      _text={{ fontFamily: "Montserrat-SemiBold" }}
                      marginLeft={1}
                    >
                      {formik.errors.motherName}
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Box>
                <Box marginTop={2}>
                  <FormControl
                    isRequired
                    isInvalid={formik.errors.nid && formik.touched.nid}
                  >
                    <FormControl.Label
                      _text={{ fontFamily: "Montserrat-Bold" }}
                    >
                      জাতীয় পরিচয় পত্র নাম্বার
                    </FormControl.Label>
                    <Input
                      bg={"white"}
                      fontFamily={"Montserrat-Bold"}
                      placeholder="জাতীয় পরিচয় পত্র নাম্বার"
                      value={formik.values.nid}
                      onChangeText={formik.handleChange("nid")}
                      onBlur={formik.handleBlur("nid")}
                    />
                    <FormControl.ErrorMessage
                      _text={{ fontFamily: "Montserrat-SemiBold" }}
                      marginLeft={1}
                    >
                      {formik.errors.nid}
                    </FormControl.ErrorMessage>
                  </FormControl>
                </Box>
              </Box>
            )}
          </Box>
          <TouchableOpacity onPress={() => setexp2(!exp2)}>
            <Box bg="gray.700" padding={2} marginTop={2}>
              <Box alignSelf={"flex-end"} justifyContent="center">
                <Text
                  fontSize={18}
                  marginRight={2}
                  color={"green.300"}
                  fontFamily="Montserrat-Medium"
                >
                  {exp2 ? "\u005E" : "\u02C5"}
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box marginTop={2}>
          <FormControl
            isRequired
            isInvalid={
              formik.errors.presentAddress && formik.touched.presentAddress
            }
          >
            <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
              বর্তমান ঠিকানা
            </FormControl.Label>
            <Input
              bg={"white"}
              fontFamily={"Montserrat-Bold"}
              placeholder="বর্তমান ঠিকানা"
              value={formik.values.presentAddress}
              onChangeText={formik.handleChange("presentAddress")}
              onBlur={formik.handleBlur("presentAddress")}
            />
            <FormControl.ErrorMessage
              _text={{ fontFamily: "Montserrat-SemiBold" }}
              marginLeft={1}
            >
              {formik.errors.presentAddress}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Box marginTop={2}>
          <FormControl
            isRequired
            isInvalid={
              formik.errors.parmanentAddress && formik.touched.parmanentAddress
            }
          >
            <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
              স্থায়ী ঠিকানা
            </FormControl.Label>
            <Input
              bg={"white"}
              fontFamily={"Montserrat-Bold"}
              placeholder="স্থায়ী ঠিকানা"
              value={formik.values.parmanentAddress}
              onChangeText={formik.handleChange("parmanentAddress")}
              onBlur={formik.handleBlur("parmanentAddress")}
            />
            <FormControl.ErrorMessage
              _text={{ fontFamily: "Montserrat-SemiBold" }}
              marginLeft={1}
            >
              {formik.errors.parmanentAddress}
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
    </LinearGradient>
  );
};

export default SendPartyInfoScreen;
