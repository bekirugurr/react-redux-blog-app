import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  Button,
  FormControl,
  Select,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";

const BlogForm = ({ postData }) => {
  const { key, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let initialPostInfo = {
    title: "",
    post_pic: "",
    content: "",
    status: "P",
    category: 4,
    writer: user.id,
  };
  const [postInfo, setPostInfo] = useState(postData || initialPostInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postData) {
      let config = {
        method: "patch",
        url: `https://blog-api-django.onrender.com/post/post/${postData.id}/`,
        data: {
          title: postInfo.title,
          content: postInfo.content,
          post_pic: postInfo.post_pic,
          status: postInfo.status,
          writer: postInfo.writer,
          category: postInfo.category,
          id: postInfo.id,
        },
        headers: {
          Authorization: `Token ${key}`,
          "Content-Type": "multipart/form-data",

        },
      };
      console.log(config.data)
      try {
        const response = await axios(config);
        console.log(response);
        toastSuccessNotify("Post updated succesfully");
        navigate('/')
      } catch (error) {
        console.log(error);
        toastErrorNotify("Post updation failed");
      }
    } else {
      let config = {
        method: "post",
        url: `https://blog-api-django.onrender.com/post/post/`,
        data: postInfo,
        headers: {
          Authorization: `Token ${key}`,
          "Content-Type": "multipart/form-data",
        },
      };
      console.log(config)
      console.log(postInfo)
      try {
        const response = await axios(config);
        console.log(response);
        toastSuccessNotify("New post added succesfully");
        setPostInfo(initialPostInfo);
        navigate("/");
      } catch (error) {
        console.log(error);
        toastErrorNotify("New post addition failed");
      }
    }
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic-title"
        label="Title"
        variant="outlined"
        name="title"
        fullWidth
        required
        value={postInfo.title}
        onChange={(e) => setPostInfo({ ...postInfo, title: e.target.value })}
        sx={{ mb: "1rem" }}
      />
      <TextField
        id="outlined-basic-post-pic"
        label="Post Image Link"
        variant="outlined"
        name="post_pic"
        fullWidth
        value={postInfo.post_pic}
        onChange={(e) => setPostInfo({ ...postInfo, post_pic: e.target.value })}
        sx={{ mb: "1rem" }}
      />

      <TextField
        id="outlined-basic-content"
        label="Content"
        variant="outlined"
        name="content"
        fullWidth
        required
        multiline
        minRows={10}
        sx={{ mb: "1rem" }}
        value={postInfo.content}
        onChange={(e) => setPostInfo({ ...postInfo, content: e.target.value })}
      />
      <Box sx={{ minWidth: 120, mb: "1rem", display: "flex", gap: "2rem" }}>
        <FormControl required fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            defaultValue="P"
            label="Status"
            value={postInfo.status}
            onChange={(e) =>
              setPostInfo({ ...postInfo, status: e.target.value })
            }
          >
            <MenuItem value={"P"}>Publish</MenuItem>
            <MenuItem value={"D"}>Draft</MenuItem>
          </Select>
        </FormControl>

        <FormControl required fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            defaultValue={4}
            label="Category"
            value={postInfo.category}
            onChange={(e) =>
              setPostInfo({ ...postInfo, category: e.target.value })
            }
          >
            <MenuItem value={1}>Software</MenuItem>
            <MenuItem value={2}>Book</MenuItem>
            <MenuItem value={3}>Movie</MenuItem>
            <MenuItem value={4}>Life</MenuItem>
            <MenuItem value={5}>Personal</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        fullWidth
        type="submit"
        sx={{
          mb: "5rem",
          ":hover": {
            bgcolor: "#ffffff",
            color: "dodgerBlue",
            outline: "1px solid dodgerBlue",
          },
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default BlogForm;
