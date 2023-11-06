import { SIGNIN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGNIN);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });
    await authStorage.setAccessToken(data?.authenticate?.accessToken);
    apolloClient.resetStore();
    return data?.authenticate;
  };

  return [signIn, result];
};

export default useSignIn;
