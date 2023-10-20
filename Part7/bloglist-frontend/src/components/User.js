import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import styled from "styled-components";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 10px;

  border-radius: 10px;
  border: 2px solid black;

  color: black;
`;

const UserName = styled.h2`
  font-size: 24px;
`;

const AddedBlogsHeader = styled.h3`
  font-size: 20px;
`;

const BlogList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: center;
`;

const BlogItem = styled.li`
  margin: 10px;
  font-size: 16px;
  background-color: white;
  border: 1px solid #e69833;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

const BackButton = styled.button`
  background-color: white;
  color: black;
  padding: 10px;
  border-color: #e69833;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #faebd7;
  }
`;

const User = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <>
      <TopBar />

      <UserContainer>
        <UserName>{user.name}</UserName>
        <AddedBlogsHeader>Added blogs</AddedBlogsHeader>
        <BlogList>
          {user.blogs.map((blog) => (
            <BlogItem key={blog.id}>{blog.title}</BlogItem>
          ))}
        </BlogList>
        <BackButton onClick={() => navigate("/users")}>
          Head back to Users
        </BackButton>
      </UserContainer>
    </>
  );
};

export default User;
