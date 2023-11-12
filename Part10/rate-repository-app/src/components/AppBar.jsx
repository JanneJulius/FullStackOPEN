import { StyleSheet, ScrollView, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Link, useLocation } from "react-router-native";

import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 0,
    backgroundColor: theme.colors.barColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
});

const AppBar = ({ token, setToken }) => {
  const authStorage = useAuthStorage();
  const location = useLocation();

  const removeToken = async () => {
    await authStorage.removeAccessToken();
    setToken(null);
  };

  const isTabSelected = (tabPath) => {
    return location.pathname === tabPath;
  };

  if (token) {
    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <Link to="/" style={isTabSelected("/") ? styles.selectedTab : {}}>
            <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
              Repositories
            </Text>
          </Link>
          <Link
            to="/create"
            style={isTabSelected("/create") ? styles.selectedTab : {}}
          >
            <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
              Create a Review
            </Text>
          </Link>
          <Link
            to="/myreviews"
            style={isTabSelected("/myreviews") ? styles.selectedTab : {}}
          >
            <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
              MyReviews
            </Text>
          </Link>
          <Link to="/signin" onPress={removeToken}>
            <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
              Logout
            </Text>
          </Link>
        </ScrollView>
      </View>
    );
  }

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Link to="/" style={isTabSelected("/") ? styles.selectedTab : {}}>
          <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
            Repositories
          </Text>
        </Link>
        <Link
          to="/signup"
          style={isTabSelected("/signup") ? styles.selectedTab : {}}
        >
          <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
            Sign Up
          </Text>
        </Link>
        <Link
          to="/signin"
          style={isTabSelected("/signin") ? styles.selectedTab : {}}
        >
          <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
            Login
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};
export default AppBar;
