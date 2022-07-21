import {
  Box,
  TextField,
  InputLabel ,
  MenuItem,
  Typography,
  Button,
  FormControl ,
  Select 
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";


const BlogForm = () => {
  const {key, user} = useSelector((state) => state.auth);
  const navigate = useNavigate()
  let initialPostInfo = {
    title: '',
    content: '',
    status: 'P',
    category: 4,
    writer: user.id
  }
  const [postInfo, setPostInfo] = useState(initialPostInfo)


  const handleSubmit = async(e) => {
    e.preventDefault()
    let config = {
      method: "post",
      url: `https://blogapp-react-redux.herokuapp.com/post/post/`,
      data: postInfo,
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type" : 'multipart/form-data'
      },
    }
    try {
      const response = await axios(config);
      console.log(response)
      toastSuccessNotify('New post added succesfully')
      setPostInfo(initialPostInfo)
      navigate('/')
    } catch (error) {
        console.log(error);
        toastErrorNotify('New post addition failed')
    } 
  }

  return (
    <Box component="form" autoComplete="off"  onSubmit={handleSubmit}>
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
        <Button
        variant="outlined"
        component="label"
        fullWidth
        size="large"
        onChange={(e) => setPostInfo({ ...postInfo, post_pic: e.target.files[0] })}
        sx={{ 
          mb: "1rem", 
            ":hover": {
              bgcolor: "dodgerBlue", 
              color: "#ffffff",
            },
        }}       
      >
         Add Post Picture
        <input hidden accept="image/*" type="file" />
      </Button> 
      
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
      <Box sx={{ minWidth: 120, mb: "1rem", display:'flex', gap:"2rem" }}>
        
      <FormControl required  fullWidth>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value="P"
          label="Status"
          value={postInfo.status}
          onChange={(e) => setPostInfo({ ...postInfo, status: e.target.value })}
          >
          <MenuItem value={"P"}>Publish</MenuItem>
          <MenuItem value={'D'}>Draft</MenuItem>
        </Select>
      </FormControl>

      <FormControl required  fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={4}
          label="Category"
          value={postInfo.category}
          onChange={(e) => setPostInfo({ ...postInfo, category: e.target.value })}
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
          mb:"5rem",
          ":hover": {
            bgcolor: "#ffffff", 
            color: "dodgerBlue",
            outline:'1px solid dodgerBlue'
          },
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default BlogForm;
