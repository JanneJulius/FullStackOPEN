import { DELETEREVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETEREVIEW);

  const deleteReview = async ({ deleteReviewId }) => {
    const { data } = await mutate({
      variables: { deleteReviewId: deleteReviewId },
    });

    return data?.deleteReview;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
