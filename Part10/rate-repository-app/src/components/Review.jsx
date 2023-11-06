import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textSecondary,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },
  rating: {
    borderWidth: 1,
    borderColor: theme.colors.languageColor,
    backgroundColor: theme.colors.textSecondary,
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rightSide: {
    marginTop: 15,
  },
  textContainer: {
    maxWidth: 350,
  },
});

const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

const Review = ({ item }) => {
  return (
    <View testID="repositoryItem" key={item.id} style={styles.container}>
      <View style={styles.rating}>
        <Text>{item.rating}</Text>
      </View>
      <View style={styles.rightSide}>
        <Text fontWeight="bold">{item.user.username}</Text>
        <Text>{formatDate(item.createdAt)}</Text>
        <View style={styles.textContainer}>
          <Text>{item.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default Review;
