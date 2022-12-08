import { useState } from "react";
import { Typography,  Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/toastNotify";

const CommentForm = ({id, getPostDetail, post_detail}) => {
  const { key, user } = useSelector((state) => state.auth);
  const [commentContent, setCommentContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    let data={
        content: commentContent,
        commenter: user.id,
        post: id
    }
    console.log(data);
    let config={
        method: 'post',
        url: 'https://blog-api-django.onrender.com/post/comment/',
        data: data,
        headers: {
            Authorization: `Token ${key}`,
          },
    }
    axios(config)
    .then((response) => {
      console.log(response.data);
      toastSuccessNotify('Comment added succesfully')
      getPostDetail(post_detail)
    })
    .catch((error) => {
      console.log(error);
      toastErrorNotify('Adding comment failed')
    });
    setCommentContent('')
  }


  
  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit} sx={{ display:"flex", flexDirection:"column", alignItems:"center", mb:'1rem'}}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontFamily: "Segoe UI",
          textAlign: "start",
          fontWeight: "600",
          p: " 0 0.6rem 0.6rem",
          borderBottom: "1px solid #a2a4a556",
          alignSelf:"start",
          width: "100%"
        }}
      >
        Leave a comment below
      </Typography>
      <TextField
        id="outlined-basic-content"
        label="Comment"
        variant="outlined"
        name="content"
        required
        multiline
        minRows={5}
        sx={{ m: "1rem",width:"100%"  }}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{width:"7rem",
          ":hover": {
            bgcolor: "#ffffff",
            color: "dodgerBlue",
            outline: "1px solid dodgerBlue",
            m: "0",
            boxShodow: "none",
          },
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default CommentForm;
