import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import Text from "./Text";
import React, { useState } from "react";
import Select from "./Picker";
import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  selectedValue,
  setSelectedValue,
  searchQuery,
  setSearchQuery,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <Select
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </View>
        )}
      />
    </View>
  );
};

const getVariables = ({ selectedValue }) => {
  switch (selectedValue) {
    case "Latest repositories":
      return {
        orderBy: "CREATED_AT",
        orderDirection: "ASC",
      };
    case "Highest rated repositories":
      return {
        orderBy: "RATING_AVERAGE",
        orderDirection: "DESC",
      };
    case "Lowest rated repositories":
      return {
        orderBy: "RATING_AVERAGE",
        orderDirection: "ASC",
      };

    default:
      return {
        orderBy: "CREATED_AT",
        orderDirection: "ASC",
      };
  }
};
const RepositoryList = () => {
  const [selectedValue, setSelectedValue] = useState("Latest repositories");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: getVariables({ selectedValue }),
  });

  if (loading) {
    return <Text>Loading repositories...</Text>;
  }

  if (error) {
    return <Text>Error fetching repositories</Text>;
  }

  const repositories = data.repositories;

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
