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
import React, { useEffect, useState } from "react";

import { ScrollView, View } from "react-native";
import {
  HelperSolverType,
  HelperType,
  SolverType,
} from "../../../../../typings/form-data";
import LinearGradient from "react-native-linear-gradient";
import { width } from "../../../../utils/handy";
import { GetHelperInfo, setSolverInfo } from "../../../../database/Database";
import {
  problemTypeData,
  RankData,
  sectionName,
} from "../../../../utils/dataObj";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { items } from "../../../../utils/demo";
import { generateSolverItem, getHelperQuery } from "./solver";
import MultiselectScreen from "../../../../component/multiselect";
let selected = 0;
const SolverInputScreen = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [helperInfo, sethelperInfo] = useState<HelperType[]>([]);
  const [selectedItems, setselectedItems] = useState([]);

  useEffect(() => {
    GetHelperInfo({
      sethelperInfo: sethelperInfo,
    });
  }, []);
  const validationSchema = Yup.object().shape({
    sectionName: Yup.string().required("Section is required."),
    userRank: Yup.string().required("Rank is Required"),
    bp: Yup.string().required("BP is Required"),
    helper: Yup.string().required("Solver name is required"),
    phone: Yup.string().required("phone is required"),
    actualIssue: Yup.string().required("Actual Issue is required"),
    demo: Yup.string(),
  });

  const initialValues: HelperSolverType = {
    sectionName: "",
    userRank: "",
    bp: "",
    helper: "",
    phone: "",
    actualIssue: "",
    demo: "",
  };
  const setFormik = (bp: string) => {
    const obj = getHelperQuery(bp, helperInfo) as HelperType;
    formik.setFieldValue("helper", obj.helper);
    formik.setFieldValue("bp", obj.bp);
    formik.setFieldValue("sectionName", obj.sectionName);
    formik.setFieldValue("userRank", obj.userRank);
    formik.setFieldValue("phone", obj.phone);
  };
  const onSelectedItemsChange = (selectedItemeds) => {
    setselectedItems(selectedItemeds);
    let bp = selectedItemeds[0];
    if (bp) {
      setFormik(bp);
      selected = selected + 1;
    } else {
      formik.setFieldValue("helper", "");
      formik.setFieldValue("bp", "");
      formik.setFieldValue("sectionName", "");
      formik.setFieldValue("userRank", "");
      formik.setFieldValue("phone", "");
      selected = 0;
    }
  };
  const Next = () => {
    let length = selectedItems.length;
    if (selected < length) {
      let bp = selectedItems[selected];
      setFormik(bp);
      selected += 1;
      console.log(selected);
    } else {
      selected = 0;
      let bp = selectedItems[selected];
      setFormik(bp);
      console.log(selected);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setLoading(true);
      let solverInfo: SolverType = {
        deviceIdentityNumber: props.route.params.deviceIdentityNumber,
        solverbp: selectedItems,
        actualIssue: values.actualIssue,
        solveDate: new Date().getTime(),
        dateString: new Date().toISOString().slice(0, 10),
      };

      console.log(solverInfo);
      setSolverInfo(solverInfo)
        .then((res) => {
          props.navigation.goBack();
          setLoading(false);
        })
        .catch();
    },
  });
  // console.log(formik.values);
  // console.log(selectedItems);
  let solverItems = [];
  if (helperInfo.length > 0) {
    solverItems = generateSolverItem(helperInfo);
  }
  console.log(solverItems);

  return (
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
            <View>
            
              <MultiselectScreen
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                solverItems={solverItems}
                selectText="সমাধানকারী...   "
                searchPlaceholderText="সমাধানকারী খুঁজুন.."
              />
            </View>

            <Box marginTop={3}>
              <FormControl
                isRequired
                isInvalid={formik.errors.helper && formik.touched.helper}
              >
                <Box
                  flexDirection={"row"}
                  justifyContent="space-between"
                  alignItems={"center"}
                  mb={1}
                >
                  <Box>
                    <FormControl.Label
                      _text={{ fontFamily: "Montserrat-Bold" }}
                    >
                      Name
                    </FormControl.Label>
                  </Box>
                  <Box>
                    {selectedItems.length > 1 && (
                      <Button
                        bg={"red.300"}
                        _text={{ fontFamily: "Montserrat-Bold" }}
                        size="xs"
                        onPress={() => Next()}
                      >
                        NEXT
                      </Button>
                    )}
                  </Box>
                </Box>
                <Select
                  bg={"white"}
                  isDisabled
                  fontSize={15}
                  fontFamily={"Montserrat-Bold"}
                  placeholder="Solver Name"
                  selectedValue={formik.values.helper}
                  onValueChange={(itemValue: any) => {
                    //  console.log('helper',itemValue)
                    formik.setFieldValue("demo", itemValue);
                    let obj = JSON.parse(itemValue) as HelperType;
                    formik.setFieldValue("helper", obj.helper);
                    formik.setFieldValue("bp", obj.bp);
                    formik.setFieldValue("sectionName", obj.sectionName);
                    formik.setFieldValue("userRank", obj.userRank);
                    formik.setFieldValue("phone", obj.phone);
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
                      value={item?.helper}
                      _text={{ fontFamily: "Montserrat-Regular" }}
                    />
                  ))}
                </Select>
                <FormControl.ErrorMessage
                  _text={{ fontFamily: "Montserrat-Bold" }}
                  marginLeft={1}
                >
                  {formik.errors.helper}
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>

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
                  isDisabled
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
              <FormControl isRequired>
                <FormControl.Label
                  _text={{ fontFamily: "Montserrat-Bold" }}
                  marginBottom={1}
                >
                  Section Name
                </FormControl.Label>
                <Select
                  bg={"white"}
                  isDisabled
                  fontSize={15}
                  fontFamily={"Montserrat-Bold"}
                  placeholder="correction type"
                  selectedValue={formik.values.sectionName}
                  onValueChange={(itemValue: string) => {
                    formik.setFieldValue("sectionName", itemValue);
                  }}
                >
                  {Object.keys(sectionName).map((item) => (
                    <Select.Item
                      key={item}
                      label={sectionName[item]}
                      value={item}
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
                  isDisabled
                  fontSize={15}
                  fontFamily={"Montserrat-Bold"}
                  placeholder="correction type"
                  selectedValue={formik.values.userRank}
                  onValueChange={(itemValue: string) => {
                    formik.setFieldValue("userRank", itemValue);
                  }}
                >
                  {Object.keys(RankData).map((item) => (
                    <Select.Item
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
                    isDisabled
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
            <Box marginTop={3}>
              <FormControl
                isRequired
                isInvalid={
                  formik.errors.actualIssue && formik.touched.actualIssue
                }
              >
                <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
                  Actual Issue
                </FormControl.Label>
                <Select
                  bg={"white"}
                  fontFamily={"Montserrat-Bold"}
                  placeholder="Issue name"
                  selectedValue={formik.values.actualIssue}
                  onValueChange={(itemValue: any) => {
                    formik.setFieldValue("actualIssue", itemValue);
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
                <FormControl.ErrorMessage
                  _text={{ fontFamily: "Montserrat-Bold" }}
                  marginLeft={1}
                >
                  {formik.errors.actualIssue}
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
      </View>
    </Box>
  );
};

export default React.memo(SolverInputScreen);
