import { Box, Button, FormControl, Heading, Image, Input } from "native-base";
import React, { useState } from "react";
import { icons } from "../../../assets/icons";
import { PASSWORD_MIN_LENGTH } from "../../../config";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SignInData } from "../../../../typings/form-data";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { GetUserInfo } from "../../../database/Database";
import { Alert } from "react-native";
import actions from "../../../state/actions";


const SignInScreen = (props: any) => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required"),
    password: Yup.string()
      .min(PASSWORD_MIN_LENGTH, `Must be at least ${PASSWORD_MIN_LENGTH}`)
      .required("Password is required"),
  });

  const initialValues: SignInData = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      GetUserInfo(values).then((res) => {
        if (res.error === true) {
          Alert.alert("", res.msg);
        } else {
          let key = Object.keys(res.data);
          let userData = res?.data[key[0]];
          console.log("u", userData);
          dispatch(actions.user.saveUser(userData));
          props.navigation.goBack()
        }
        setLoading(false);
      });
    },
  });

 
  return (
    <Box flex={1} padding={5} bg="white">
      <ScrollView>
        <Box padding={10} alignSelf="center">
          <Image
            source={icons.service}
            alt="loc"
            style={{ width: 100, height: 100 }}
          />
        </Box>
        <Box>
          <Heading>Sign In</Heading>
        </Box>
        <Box marginTop={4}>
          <FormControl
            isRequired
            isInvalid={formik.errors.email && formik.touched.email}
          >
            <FormControl.Label>Email address</FormControl.Label>
            <Input
              type="text"
              keyboardType={"email-address"}
              placeholder="Email address"
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            <FormControl.ErrorMessage marginLeft={1}>
              {formik.errors.email}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Box marginTop={4}>
          <FormControl
            isRequired
            isInvalid={formik.errors.password && formik.touched.password}
          >
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              placeholder="password "
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
            />
            <FormControl.ErrorMessage marginLeft={1}>
              {formik.errors.password}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>

        <Box m={3}>
          <Button
            mt={3}
            isLoading={loading}
            fontFamily="Montserrat-Bold"
            isLoadingText="Signing..."
            _text={{ fontFamily: "Montserrat-Bold" }}
            onPress={formik.handleSubmit}
          >
            SIGN IN
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default SignInScreen;
