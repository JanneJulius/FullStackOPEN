import React, { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlogViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BlogList = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
`;

const BlogItem = styled.div`
  border: 1px solid #e69833;
  border-radius: 15px;
  padding: 10px;
  margin: 10px;
  width: 50%;
  text-align: center;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

const BlogView = ({ blogs }) => {
  const ref = useRef();

  const toggleVisibility = () => {
    ref.current.toggleVisibility();
  };

  return (
    <>
      <TopBar />
      <BlogViewContainer>
        <Togglable buttonLabel="Create a Blog" ref={ref}>
          <BlogForm toggleVisibility={toggleVisibility} />
        </Togglable>
        <BlogList>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <BlogItem key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </BlogItem>
            ))}
        </BlogList>
      </BlogViewContainer>
    </>
  );
};

export default BlogView;
