import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../services/blogs";
import { useNotification } from "../context/NotificationContext";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border: 1px solid #faebd7;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  width: 100%;
  margin: 20px auto;
`;

const FormTitle = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  font-size: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CreateButton = styled.button`
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

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const createMutation = useMutation({
    mutationFn: (newBlogData) => create(newBlogData),
    onSuccess: (newBlog) => {
      queryClient.setQueryData(["blogs"], (prevBlogs) => {
        return prevBlogs.concat(newBlog);
      });

      dispatch({
        type: "SET_NOTIFICATION",
        message: `Current User created a blog ${newBlog.title}`,
        notificationType: "success",
      });
    },
    onError: (error) => {
      dispatch({
        type: "SET_NOTIFICATION",
        message: `Creating a blog failed = ${error.response.data.error}`,
        notificationType: "error",
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();

    createMutation.mutate({
      title: title,
      author: author,
      url: url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
    toggleVisibility();
  };

  return (
    <FormContainer>
      <FormTitle>Create New Blog</FormTitle>
      <form onSubmit={onCreate}>
        <FormGroup>
          <Label htmlFor="title">Title:</Label>
          <Input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="author">Author:</Label>
          <Input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="url">URL:</Label>
          <Input
            id="url"
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </FormGroup>
        <CreateButton type="submit">Create</CreateButton>
      </form>
    </FormContainer>
  );
};

export default BlogForm;
