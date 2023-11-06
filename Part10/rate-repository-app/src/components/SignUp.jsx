import Text from "./Text";
import React from "react";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    marginTop: 10,
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#CDCDCD",
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    width: "90%",
    borderRadius: 5,
    backgroundColor: theme.colors.languageColor,
    display: "flex",
    alignItems: "center",
  },
});

const valSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required("Username with length 1-30 is required"),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required("Password with length 5-50 is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirmation is required"),
});
const initValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
        initialValues={initValues}
        onSubmit={onSubmit}
        validationSchema={valSchema}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <FormikTextInput
              name="username"
              placeholder="Username"
              style={styles.item}
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              style={styles.item}
              secureTextEntry="true"
            />
            <FormikTextInput
              name="passwordConfirmation"
              placeholder="Password confirmation"
              style={styles.item}
              secureTextEntry="true"
            />

            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text color="textSecondary">Sign Up</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const SignUp = ({ setToken }) => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      const res = await signIn({ username, password });

      if (res && res.accessToken) {
        setToken(res.accessToken);
        navigate("/");
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error in signing up",
        text2: e.message,
        position: "top",
      });
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
