import {
  screen,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../components/SignIn";

const credentials = { username: "Janne", password: "password" };

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );
      fireEvent.changeText(
        getByPlaceholderText("Username"),
        credentials.username
      );
      fireEvent.changeText(
        getByPlaceholderText("Password"),
        credentials.password
      );
      fireEvent.press(screen.getByText("Login"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual(credentials);
      });
    });

    it("does not call onSubmit function with wrong/missing arguments", async () => {
      const onSubmit = jest.fn();
      const { getByPlaceholderText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );
      const bothMissing = { username: "", password: "" };
      fireEvent.changeText(
        getByPlaceholderText("Username"),
        bothMissing.username
      );
      fireEvent.changeText(
        getByPlaceholderText("Password"),
        bothMissing.password
      );
      fireEvent.press(screen.getByText("Login"));

      const shortUsername = { username: "Jane", password: "password" };
      fireEvent.changeText(
        getByPlaceholderText("Username"),
        shortUsername.username
      );
      fireEvent.changeText(
        getByPlaceholderText("Password"),
        shortUsername.password
      );
      fireEvent.press(screen.getByText("Login"));

      const shortPassword = { username: "Janne", password: "pass" };
      fireEvent.changeText(
        getByPlaceholderText("Username"),
        shortPassword.username
      );
      fireEvent.changeText(
        getByPlaceholderText("Password"),
        shortPassword.password
      );
      fireEvent.press(screen.getByText("Login"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(0);
      });
    });
  });
});
