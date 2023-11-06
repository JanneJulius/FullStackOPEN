import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const SIGNUP = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;

export const CREATEREVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      rating
      repositoryId
      text
      userId
    }
  }
`;
