import { StyleSheet, ScrollView, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Link } from "react-router-native";

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
});

const AppBar = ({ token, setToken }) => {
  const authStorage = useAuthStorage();

  const removeToken = async () => {
    await authStorage.removeAccessToken();
    setToken(null);
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Link to="/">
          <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
            Repositories
          </Text>
        </Link>
        {token ? (
          <Link to="/create">
            <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
              Create a Review
            </Text>
          </Link>
        ) : (
          <Link to="/signup">
            <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
              Sign Up
            </Text>
          </Link>
        )}
        {token ? (
          <Link to="/signin" onPress={removeToken}>
            <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
              Logout
            </Text>
          </Link>
        ) : (
          <Link to="/signin">
            <Text fontWeight="bold" fontSize="subheading" color="textSecondary">
              Login
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};
export default AppBar;
