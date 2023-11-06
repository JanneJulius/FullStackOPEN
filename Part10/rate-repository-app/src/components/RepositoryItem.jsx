import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Pressable } from "react-native";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.unitColor,
    padding: 20,
    display: "flex",
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  upper: {
    flexDirection: "row",
  },
  upperRight: {
    marginLeft: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    minHeight: 80,
    justifyContent: "space-around",
  },
  languageContainer: {
    backgroundColor: theme.colors.languageColor,
    borderRadius: 5,
    marginTop: 5,
  },
  languageText: {
    padding: 5,
    color: theme.colors.textSecondary,
  },
  lower: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
});

const upperPart = ({ item }) => {
  return (
    <View style={styles.upper}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image}></Image>
      <View style={styles.upperRight}>
        <Text testID="repositoryName" fontSize="subheading" fontWeight="bold">
          {item.fullName}
        </Text>
        <Text testID="description" style={{ maxWidth: 300 }}>
          {item.description}
        </Text>
        <View style={styles.languageContainer}>
          <Text testID="language" style={styles.languageText}>
            {item.language}
          </Text>
        </View>
      </View>
    </View>
  );
};

const formatNumber = (stringNumber) => {
  const number = parseInt(stringNumber);
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  }
  return number.toString();
};

const lowerPart = ({ item }) => {
  return (
    <View style={styles.lower}>
      <View>
        <Text testID="stargazersCount" fontWeight="bold">
          {formatNumber(item.stargazersCount)}
        </Text>
        <Text>Stars</Text>
      </View>
      <View>
        <Text testID="forksCount" fontWeight="bold">
          {formatNumber(item.forksCount)}
        </Text>
        <Text>Forks</Text>
      </View>
      <View>
        <Text testID="reviewCount" fontWeight="bold">
          {formatNumber(item.reviewCount)}
        </Text>
        <Text>Reviews</Text>
      </View>
      <View>
        <Text testID="ratingAverage" fontWeight="bold">
          {item.ratingAverage}
        </Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  //console.log(item.id);

  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`/repository/${item.id}`);
  };
  return (
    <Pressable onPress={handlePress}>
      <View testID="repositoryItem" style={styles.item} key={item.id}>
        {upperPart({ item })}
        {lowerPart({ item })}
      </View>
    </Pressable>
  );
};
export default RepositoryItem;
