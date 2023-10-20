import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update, remove } from "../services/blogs";
import PropTypes from "prop-types";
import { useNotification } from "../context/NotificationContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TopBar from "./TopBar";

import styled from "styled-components";

const BlogContainer = styled.div`
  margin: 20px;
  padding: 20px;
  padding-top: 0;
  background-color: #fff;
  border: 1px solid #e69833;
  border-radius: 15px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 36px;
`;

const Author = styled.p`
  font-style: italic;
  color: #555;
`;

const Url = styled.p`
  color: #08f;
`;

const Button = styled.button`
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

const CommentInput = styled.input`
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin: 5px 0;
  padding: 5px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();
  const { state } = useUser();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const likeMutation = useMutation({
    mutationFn: (newBlogData) => update(newBlogData),
    onSuccess: (likedBlog) => {
      queryClient.setQueryData(["blogs"], (prevBlogs) => {
        return prevBlogs.map((blog) => {
          if (blog.id === likedBlog.id) {
            return { ...blog, likes: likedBlog.likes };
          }
          return blog;
        });
      });
      dispatch({
        type: "SET_NOTIFICATION",
        message: `User ${state.user.name} liked a blog ${blog.title}`,
        notificationType: "success",
      });
    },
    onError: (error) => {
      dispatch({
        type: "SET_NOTIFICATION",
        message: `Liking a blog failed = ${error.message}`,
        notificationType: "error",
      });
    },
  });

  const commentMutation = useMutation({
    mutationFn: (newBlogData) => update(newBlogData),
    onSuccess: (commentedBlog) => {
      queryClient.setQueryData(["blogs"], (prevBlogs) => {
        return prevBlogs.map((blog) => {
          if (blog.id === commentedBlog.id) {
            return { ...blog, comments: commentedBlog.comments };
          }
          return blog;
        });
      });
      setComment("");
      dispatch({
        type: "SET_NOTIFICATION",
        message: `Commented published for a blog ${blog.title}`,
        notificationType: "success",
      });
    },
    onError: (error) => {
      dispatch({
        type: "SET_NOTIFICATION",
        message: `Commenting a blog ${blog.title} failed`,
        notificationType: "error",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => remove(id),
    onSettled: (data, error, id) => {
      if (error) {
        dispatch({
          type: "SET_NOTIFICATION",
          message: `Removing a blog failed = ${error.message}`,
          notificationType: "error",
        });
      } else {
        queryClient.setQueryData(["blogs"], (prevBlogs) => {
          return prevBlogs.filter((blog) => blog.id !== id);
        });

        dispatch({
          type: "SET_NOTIFICATION",
          message: `User ${state.user.name} removed a blog ${blog.title}`,
          notificationType: "success",
        });
      }
    },
  });

  const likeBlog = (blog) => {
    likeMutation.mutate({ ...blog, likes: blog.likes + 1 });
  };

  const deleteBlog = (blog) => {
    navigate("/");
    deleteMutation.mutate(blog.id);
  };

  const addComment = (blog) => {
    if (comment === "") {
      dispatch({
        type: "SET_NOTIFICATION",
        message: `Comment label is empty!`,
        notificationType: "success",
      });
    } else {
      commentMutation.mutate({
        ...blog,
        comments: blog.comments.concat(comment),
      });
    }
  };

  return (
    <>
      <TopBar />

      <BlogContainer>
        <Title>{blog.title}</Title>
        <Author>{`by ${blog.author}`}</Author>
        <Url>{blog.url}</Url>
        <div>
          {blog.likes} <Button onClick={() => likeBlog(blog)}>Like</Button>
        </div>
        <div>{state.user.name}</div>
        <Button onClick={() => deleteBlog(blog)}>Remove</Button>
        <Button onClick={() => navigate("/")}>Back to Blogs</Button>
        <h3>Comments</h3>
        <CommentInput
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Add a new comment..."
        />
        <Button onClick={() => addComment(blog)}>Submit</Button>
        <CommentList>
          {blog.comments.map((comment, index) => (
            <CommentItem key={index}>{comment}</CommentItem>
          ))}
        </CommentList>
      </BlogContainer>
    </>
  );
};

Blog.propTypes = {
  setUpdate: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

export default Blog;
