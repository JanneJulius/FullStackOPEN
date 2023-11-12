import React from "react";
import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_MY_REVIEWS } from "../graphql/queries";
import Text from "./Text";
import Review from "./Review";

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_MY_REVIEWS);

  if (loading) {
    return <Text>Loading reviews...</Text>;
  }

  if (error) {
    return <Text>Error fetching reviews</Text>;
  }

  let userReviews;
  if (data.me) {
    userReviews = data.me.reviews.edges.map(({ node }) => node);
  }

  return (
    <FlatList
      data={userReviews}
      renderItem={({ item }) => (
        <Review item={item} isOwnReviewList={true} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
