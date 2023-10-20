import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNotification } from "../context/NotificationContext";
import { setToken } from "../services/blogs";
import loginService from "../services/login";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  max-width: 300px;
  background-color: #faebd7;
  text-align: center;
`;

const FormTitle = styled.h2`
  margin: 0;
  margin-bottom: 30px;
  font-size: 36px;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const LoginButton = styled.button`
  background-color: #faebd7;
  color: black;
  padding: 5px 10px;
  margin: 20px auto;
  border-color: #e69833;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e69833;
  }
`;

const LoginForm = () => {
  const { dispatch: userDispatch } = useUser();
  const { dispatch: notificationDispatch } = useNotification();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setToken(user.token);
      setUsername("");
      setPassword("");
      userDispatch({ type: "LOGIN", user });

      notificationDispatch({
        type: "SET_NOTIFICATION",
        message: `${user.username} logged in.`,
        notificationType: "success",
      });
    } catch (exception) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        message: `Logging in failed = ${exception.response.data.error}`,
        notificationType: "error",
      });
    }
  };

  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
      <form onSubmit={handleLogin}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </FormGroup>
        <LoginButton id="loginButton" type="submit">
          Login
        </LoginButton>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
