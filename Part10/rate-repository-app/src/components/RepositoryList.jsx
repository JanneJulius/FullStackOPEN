import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import React, { useState } from "react";
import Select from "./Picker";
import { Searchbar } from "react-native-paper";
import theme from "../theme";
import { useDebounce } from "use-debounce";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchContainer: {
    backgroundColor: theme.colors.barColor,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedValue, setSelectedValue, searchQuery, setSearchQuery } =
      this.props;
    return (
      <>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            theme={{
              colors: {
                onSurface: "white",
                onSurfaceVariant: "white",
                outline: "white",
                elevation: {
                  level3: theme.colors.barColor,
                },
              },
            }}
          />
        </View>
        <Select
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </>
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedValue, setSelectedValue] = useState("Latest repositories");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories({
    selectedSort: selectedValue,
    searchKeyword: searchKeyword,
    first: 4,
  });

  const onEndReach = () => {
    fetchMore();
    //console.log("You have reached the end of the list");
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
