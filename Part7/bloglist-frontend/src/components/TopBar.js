import React from "react";
import { useUser } from "../context/UserContext";
import { useNotification } from "../context/NotificationContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TopBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #faebd7;
  color: black;
`;

const UpperPart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid black;
`;

const LowerPart = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 0;
`;

const LoggingInfoAndLogout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const UserImage = styled.img`
  width: 20px;
  height: 20px;
`;

const StyledButton = styled.button`
  background-color: #faebd7;
  color: black;
  padding: 5px 10px;
  margin-top: 5px;
  display: flex;
  border-color: #e69833;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e69833;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 5px;
  margin-right: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #e69833;
    text-decoration: underline;
  }
`;

const TopBar = () => {
  const { state: userState, dispatch: userDispatch } = useUser();
  const { dispatch: notificationDispatch } = useNotification();

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedBlogappUser");
      userDispatch({ type: "LOGOUT" });
      notificationDispatch({
        type: "SET_NOTIFICATION",
        message: `${userState.user.name} logged out.`,
        notificationType: "success",
      });
    } catch (exception) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        message: `Logging out failed = ${exception}`,
        notificationType: "error",
      });
    }
  };

  return (
    <TopBarContainer>
      <UpperPart>
        <Title>Blog App</Title>
        <LoggingInfoAndLogout>
          <div>
            <UserImage src="/images/UserIcon.png" alt="User Logo" />{" "}
            <em>{userState.user.name} logged in</em>
          </div>
          <StyledButton onClick={handleLogout}>Logout</StyledButton>
        </LoggingInfoAndLogout>
      </UpperPart>
      <LowerPart>
        <StyledLink to="/">Blogs</StyledLink>
        <StyledLink to="/users">Users</StyledLink>
      </LowerPart>
    </TopBarContainer>
  );
};

export default TopBar;
