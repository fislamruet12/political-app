import { useFormik } from "formik";
import { Box, Button, CheckIcon, FormControl, Input, Select, Text } from "native-base"
import React, { useState } from "react"
import { Alert, ScrollView } from "react-native";
import { PersonTyp } from "../../../../../typings/form-data";
import { UpdateDistrictPartyInfo } from "../../../../database/Database";
import { width } from "../../../../utils/handy";
import { partyName } from "../../utils/partyName";
import { designation, designationObj } from "../../utils/podobi";
import { position, positionObj } from "../../utils/position";
import { validationSchema } from "../../utils/validation";
const EditComMem = (props: any) => {
    const singleCom = props.route.params
    const [loading, setLoading] = useState(false);
    let initialValues: PersonTyp = singleCom
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            console.log(values);
            setLoading(true);
            UpdateDistrictPartyInfo(values)
                .then((res: any) => {
                    console.log("res", res);
                    setLoading(false);

                    if (res?.error) {

                    } else {
                        let message = "Successfully Submitted";
                        setLoading(false);
                        Alert.alert("Updated")
                    }
                })
                .catch((err: any) => {
                    console.log("err1", err);
                    setLoading(false);

                });
        },
    });
    console.log(formik.values)
    return (
        <Box bg={"coolGray.600"} flex={1}>
            <ScrollView style={{ padding: 15 }}>
                {/* <Box textAlign={'center'}>
                    <Text color="white" fontFamily={'Montserrat-Bold'}>সংসদীয় আসন - {1}</Text>
                </Box> */}
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
                            isDisabled={true}
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
                                    label={item.bn_name}
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
                    >
                        <FormControl.Label _text={{ fontFamily: "Montserrat-Bold" }}>
                            পদবি
                        </FormControl.Label>
                        <Text
                            bg="gray.400"
                            maxWidth={width - 10}
                            fontFamily={"Montserrat-Medium"}
                            fontSize={14}
                            color={"gray.900"}
                            padding={2}
                        >
                            {designationObj[formik.values.podobi]?.name} {formik.values.status === 0 ? null : "( " + positionObj[formik.values.status].bn_name + " )"} : { }
                        </Text>
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
                            অবস্থান
                        </FormControl.Label>
                        <Select
                            bg={"white"}
                            fontFamily={"Montserrat-Bold"}
                            placeholder="অবস্থান"
                            selectedValue={formik.values.status + ""}
                            onValueChange={(itemValue: string) => {
                                formik.setFieldValue("status", parseInt(itemValue));
                            }}
                            _selectedItem={{
                                bg: "white",
                                endIcon: <CheckIcon size={5} />,
                            }}
                        >
                            <Select.Item
                                _text={{ fontFamily: "Montserrat-Regular" }}
                                key={0}
                                label={'দায়িত্বরত'}
                                value={"0"}
                            />
                            {position.map((item) => (
                                <Select.Item
                                    _text={{ fontFamily: "Montserrat-Regular" }}
                                    key={item.id}
                                    label={item.bn_name}
                                    value={item.id.toString()}
                                />
                            ))}
                        </Select>
                        <FormControl.ErrorMessage
                            _text={{ fontFamily: "Montserrat-Bold" }}
                            marginLeft={1}
                        >
                            {formik.errors.status}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Box>
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
                            _text={{ fontFamily: "Montserrat-Bold" }}
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
                            _text={{ fontFamily: "Montserrat-Regular" }}
                            marginLeft={1}
                        >
                            {formik.errors.contact_number}
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Box>
                <Box marginTop={2}>
                  <FormControl
                  
                  >
                    <FormControl.Label
                      _text={{ fontFamily: "Montserrat-Bold" }}
                    >
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
                  
                  </FormControl>
                </Box>
                <Box marginTop={2}>
                  <FormControl
                  
                  >
                    <FormControl.Label
                      _text={{ fontFamily: "Montserrat-Bold" }}
                    >
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

        </Box>
    )
}
export default EditComMem