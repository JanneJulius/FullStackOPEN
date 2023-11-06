import { CREATEREVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

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
    const { data } = await mutate({ variables: { review: review } });

    return data?.createReview;
  };

  return [createReview, result];
};

export default useCreateReview;
