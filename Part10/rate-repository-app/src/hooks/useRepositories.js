import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const options = {
  "Latest repositories": { orderBy: "CREATED_AT", orderDirection: "DESC" },
  "Highest rated repositories": {
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC",
  },
  "Lowest rated repositories": {
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC",
  },
};

const useRepositories = ({ selectedSort, searchKeyword, first }) => {
  const variables = { ...options[selectedSort], searchKeyword, first };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
