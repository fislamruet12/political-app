import { Box, Button, FormControl, Heading, Image, Input } from "native-base";
import React, { useEffect, useState } from "react";
import { icons } from "../../../assets/icons";
import { value_MIN_LENGTH } from "../../../config";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { AccessInData, SignInData } from "../../../../typings/form-data";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { GetUserInfo, SetAccesInfo } from "../../../database/Database";
import { Alert } from "react-native";

const AccessInScreen = (props: any) => {

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    value: Yup.string().required("Unique value is Required"),
  });

  const initialValues: AccessInData = {
    name: "",
    value: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      SetAccesInfo(values).then((res) => {
        if (res.error === true) {
          Alert.alert("","error occured");
        } else {
         
            Alert.alert("","success");
            formik.handleReset(initialValues)
        }
        setLoading(false);
      });
    },
  });

  return (
    <Box flex={1} padding={5} bg="white">
      <ScrollView>
      
        <Box>
          <Heading>Give Access</Heading>
        </Box>
        <Box marginTop={4}>
          <FormControl
            isRequired
            isInvalid={formik.errors.name && formik.touched.name}
          >
            <FormControl.Label>Name</FormControl.Label>
            <Input
              type="text"
            
              placeholder="name address"
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
            />
            <FormControl.ErrorMessage marginLeft={1}>
              {formik.errors.name}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Box marginTop={4}>
          <FormControl
            isRequired
            isInvalid={formik.errors.value && formik.touched.value}
          >
            <FormControl.Label>Unique value</FormControl.Label>
            <Input
              type="text"
              placeholder="value"
              value={formik.values.value}
              onChangeText={formik.handleChange("value")}
              onBlur={formik.handleBlur("value")}
            />
            <FormControl.ErrorMessage marginLeft={1}>
              {formik.errors.value}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>

        <Box m={3}>
          <Button
            mt={3}
            isLoading={loading}
            fontFamily="Montserrat-Bold"
            isLoadingText="Accessing..."
            _text={{ fontFamily: "Montserrat-Bold" }}
            onPress={formik.handleSubmit}
          >
           ACCESS
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default AccessInScreen;


