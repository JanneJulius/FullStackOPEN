import { CREATEREVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { GET_MY_REVIEWS } from "../graphql/queries";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATEREVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    rating = Number(rating);
    const review = {
      ownerName,
      repositoryName,
      rating,
      text,
    };
    const { data } = await mutate({
      variables: { review: review },
      refetchQueries: [{ query: GET_MY_REVIEWS }],
    });

    return data?.createReview;
  };

  return [createReview, result];
};

export default useCreateReview;
