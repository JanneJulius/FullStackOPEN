import React, { useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { setToken } from "./services/blogs";
import { useUser } from "./context/UserContext";
import { getAll as getAllUsers } from "./services/users";
import { getAll as getAllBlogs } from "./services/blogs";
import { Routes, Route, useMatch } from "react-router-dom";
import BlogView from "./components/BlogView";
import UserView from "./components/UserView";
import Blog from "./components/Blog";
import User from "./components/User";
import { useQueries } from "@tanstack/react-query";
import GlobalStyles from "./components/styles/GlobalStyles";
import styled from "styled-components";

const CenteredLoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const App = () => {
  const { state: userState, dispatch: userDispatch } = useUser();

  // Check if there is user credentials saved on local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "LOGIN", user });
      setToken(user.token);
    }
  }, [userDispatch]);

  const [userResult, blogResult] = useQueries({
    queries: [
      { queryKey: ["users"], queryFn: getAllUsers, retry: 1 },
      { queryKey: ["blogs"], queryFn: getAllBlogs, retry: 1 },
    ],
  });

  let user = null;
  const userMatch = useMatch("/users/:id");
  if (userMatch && userResult.isSuccess) {
    user = userResult.data.find((user) => user.id === userMatch.params.id);
  }
  let blog = null;
  const blogMatch = useMatch("/blogs/:id");

  if (blogMatch && blogResult.isSuccess) {
    blog = blogResult.data.find((blog) => blog.id === blogMatch.params.id);
  }

  if (userResult.isPending || blogResult.isPending) {
    return <span>Loading...</span>;
  }
  if (userResult.isError || blogResult.isError) {
    return (
      <span>
        Error: {userResult.error?.message} OR {blogResult.error?.message}
      </span>
    );
  }

  return (
    <>
      <GlobalStyles />
      {userState.user ? (
        <Routes>
          <Route path="/" element={<BlogView blogs={blogResult.data} />} />
          <Route path="/users" element={<UserView users={userResult.data} />} />
          <Route path="/users/:id" element={<User user={user} />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        </Routes>
      ) : (
        <CenteredLoginContainer>
          <LoginForm />
        </CenteredLoginContainer>
      )}
      <Notification />
    </>
  );
};

export default App;
