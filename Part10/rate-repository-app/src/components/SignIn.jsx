import Text from "./Text";
import React from "react";
import useSignIn from "../hooks/useSignIn";
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
    .min(5, "Username must be at least 5 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const initValues = {
  username: "",
  password: "",
};

export const SignInContainer = ({ onSubmit }) => {
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

            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text color="textSecondary">Login</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const SignIn = ({ setToken }) => {
  const [signIn, result] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const res = await signIn({ username, password });
      if (res && res.accessToken) {
        setToken(res.accessToken);
        navigate("/");
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Error in login",
        text2: e.message,
        position: "top",
      });
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
