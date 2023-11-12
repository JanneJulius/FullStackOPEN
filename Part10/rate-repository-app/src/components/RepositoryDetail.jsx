import React from "react";
import {
  View,
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import Text from "./Text";
import Review from "./Review";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: theme.colors.languageColor,
    marginTop: 0,
    marginRight: 10,
    marginBottom: 5,
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
  },
});

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text color="textSecondary">{title}</Text>
    </TouchableOpacity>
  );
};

const RepositoryDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>Loading repository details...</Text>;
  }

  if (error) {
    return <Text>Error fetching repository details</Text>;
  }

  const repository = data.repository;

  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const handleOpenGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <Review item={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <RepositoryItem item={repository} />
          <CustomButton title="Open in GitHub" onPress={handleOpenGitHub} />
        </View>
      )}
    />
  );
};

export default RepositoryDetail;
