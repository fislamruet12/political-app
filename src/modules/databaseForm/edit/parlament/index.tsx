import { useFormik } from "formik";
import { Box, Button, CheckIcon, FormControl, Input, Select, Text } from "native-base"
import React, { memo, useState } from "react"
import { Alert, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { MemberType } from "../../../../../typings/form-data";
import { UpdateParlamentInfo } from "../../../../database/Database";
import actions from "../../../../state/actions";
import { validationSchema } from "../../utils/parlamentValidation";
import { partyName } from "../../utils/partyName";
const EditParlamentMem = (props: any) => {
  const dispatch=useDispatch()
  const singleMem = props.route.params as MemberType
  const [loading, setLoading] = useState(false);

  const initialValues: MemberType = {
    zone: singleMem.zone,
    parlament_seat: singleMem.parlament_seat,
    divisionId: singleMem.divisionId,
    districtId: singleMem.districtId,
    districtOrder: singleMem.districtOrder,
    partyId: singleMem.partyId,
    elakaName: singleMem.elakaName,
    name: singleMem.name,
    contact_number: singleMem.contact_number,
    nid: singleMem.nid,
    createDate: singleMem.createDate,
    active: singleMem.active,
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);

      setLoading(true);

      UpdateParlamentInfo(values)
        .then((res: any) => {
          console.log("res", res);
          setLoading(false);

          if (res?.error) {

          } else {
            let message = "Successfully Submitted";
            setLoading(false);
            dispatch(actions.member.saveMember(values))
            Alert.alert("","Updated")
            
          }
        })
        .catch((err: any) => {
          console.log("err1", err);
          setLoading(false);

        });
    },
  });
 // console.log(formik.values)
  return (
    <Box bg={"coolGray.600"} flex={1}>
      <ScrollView style={{ padding: 15 }}>
        <Box textAlign={'center'}>
           <Text color="white" fontFamily={'Montserrat-Bold'}>সংসদীয় আসন - {singleMem.parlament_seat}</Text>
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
              _text={{ fontFamily: "Montserrat-Regular" }}
              marginLeft={1}
            >
              {formik.errors.nid}
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

    </Box>
  )
}
export default EditParlamentMem
