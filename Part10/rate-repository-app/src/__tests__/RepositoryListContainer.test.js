import { RepositoryListContainer } from "../components/RepositoryList";
import { render, screen, within } from "@testing-library/react-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      expect(repositoryItems.length).toBe(2);
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const firstRepositoryItemWithin = within(firstRepositoryItem);
      expect(
        firstRepositoryItemWithin.getByTestId("repositoryName")
      ).toHaveTextContent("jaredpalmer/formik");
      expect(
        firstRepositoryItemWithin.getByTestId("description")
      ).toHaveTextContent("Build forms in React, without the tears");
      expect(
        firstRepositoryItemWithin.getByTestId("language")
      ).toHaveTextContent("TypeScript");
      expect(
        firstRepositoryItemWithin.getByTestId("forksCount")
      ).toHaveTextContent("1.6k");
      expect(
        firstRepositoryItemWithin.getByTestId("stargazersCount")
      ).toHaveTextContent("21.9k");
      expect(
        firstRepositoryItemWithin.getByTestId("ratingAverage")
      ).toHaveTextContent("88");
      expect(
        firstRepositoryItemWithin.getByTestId("reviewCount")
      ).toHaveTextContent("3");

      const secondRepositoryItemWithin = within(secondRepositoryItem);
      expect(
        secondRepositoryItemWithin.getByTestId("repositoryName")
      ).toHaveTextContent("async-library/react-async");
      expect(
        secondRepositoryItemWithin.getByTestId("description")
      ).toHaveTextContent("Flexible promise-based React data loader");
      expect(
        secondRepositoryItemWithin.getByTestId("language")
      ).toHaveTextContent("JavaScript");
      expect(
        secondRepositoryItemWithin.getByTestId("forksCount")
      ).toHaveTextContent("69");
      expect(
        secondRepositoryItemWithin.getByTestId("stargazersCount")
      ).toHaveTextContent("1.8k");
      expect(
        secondRepositoryItemWithin.getByTestId("ratingAverage")
      ).toHaveTextContent("72");
      expect(
        secondRepositoryItemWithin.getByTestId("reviewCount")
      ).toHaveTextContent("3");
    });
  });
});
