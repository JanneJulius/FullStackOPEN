import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import React, { useState, useEffect } from "react";
import AuthStorage from "../utils/authStorage";
import RepositoryDetail from "./RepositoryDetail";
import Constants from "expo-constants";
import CreateReview from "./CreateReview";
import Toast from "react-native-toast-message";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.barColor,
    paddingTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const [token, setToken] = useState(null);
  const authStorage = new AuthStorage();

  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await authStorage.getAccessToken();
        if (savedToken) {
          setToken(savedToken);
        }
      } catch (error) {
        console.error("Error loading token from AsyncStorage", error);
      }
    };

    loadToken();
  }, []);

  return (
    <View style={styles.container}>
      <AppBar token={token} setToken={setToken}></AppBar>
      <Toast />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:id" element={<RepositoryDetail />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/signin" element={<SignIn setToken={setToken} />} />
        <Route path="/signup" element={<SignUp setToken={setToken} />} />
        <Route path="/create" element={<CreateReview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
