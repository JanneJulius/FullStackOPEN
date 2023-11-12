import Text from "./Text";
import React from "react";
import useCreateReview from "../hooks/useCreateReview";
import { View, Pressable, StyleSheet, AlertIOS } from "react-native";
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
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating must be between 0 and 100")
    .min(0)
    .max(100),
  text: yup.string(),
});

const initValues = {
  ownerName: "",
  repositoryName: "",
  rating: null,
  text: "",
};

const ReviewContainer = ({ onSubmit }) => {
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
              name="ownerName"
              placeholder="Repository owner name"
              style={styles.item}
            />
            <FormikTextInput
              name="repositoryName"
              placeholder="Repository name"
              style={styles.item}
            />
            <FormikTextInput
              name="rating"
              placeholder="Rating between 0 and 100"
              style={styles.item}
            />
            <FormikTextInput
              name="text"
              placeholder="Review"
              style={styles.item}
              multiline={true}
            />

            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text color="textSecondary">Create a review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const CreateReview = () => {
  const [creteReview, result] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values;

    try {
      const res = await creteReview({
        ownerName,
        rating,
        repositoryName,
        text,
      });

      if (res) {
        navigate(`/repository/${res.repositoryId}`);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error in creating review",
        text2: error.message,
        position: "top",
      });
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
