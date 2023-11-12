import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textSecondary,
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
  },
  upper: {
    flexDirection: "row",
  },
  lower: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
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
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 170,
    flexDirection: "row",
    justifyContent: "center",
  },
  repositoryButton: {
    backgroundColor: theme.colors.languageColor,
  },
  deleteButton: {
    backgroundColor: "#C54650",
  },
});

const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

const Review = ({ item, isOwnReviewList, refetch }) => {
  const [deleteReview, result] = useDeleteReview();
  const navigate = useNavigate();

  const handleRepoPress = () => {
    navigate(`/repository/${item.repository.id}`);
  };

  const handleDeletePress = async (deleteReviewId) => {
    createAlert(deleteReviewId);
  };

  const createAlert = (deleteReviewId) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Ok",
          onPress: async () => {
            try {
              const res = await deleteReview({
                deleteReviewId,
              });

              if (res) {
                refetch();
              }
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
      ]
    );
  };

  if (!isOwnReviewList) {
    return (
      <View testID="repositoryItem" key={item.id} style={styles.container}>
        <View style={styles.upper}>
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
      </View>
    );
  }
  return (
    <View testID="repositoryItem" key={item.id} style={styles.container}>
      <View style={styles.upper}>
        <View style={styles.rating}>
          <Text>{item.rating}</Text>
        </View>
        <View style={styles.rightSide}>
          <Text fontWeight="bold">{item.repository.fullName}</Text>
          <Text>{formatDate(item.createdAt)}</Text>
          <View style={styles.textContainer}>
            <Text>{item.text}</Text>
          </View>
        </View>
      </View>
      <View style={styles.lower}>
        <Pressable
          style={[styles.button, styles.repositoryButton]}
          onPress={handleRepoPress}
        >
          <Text color="textSecondary">Repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeletePress(item.id)}
        >
          <Text color="textSecondary">Delete</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Review;
