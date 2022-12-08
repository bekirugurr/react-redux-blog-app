import React from "react";
import BlogForm from '../components/BlogForm'
import formLogo from "../assets/formLogo.png";
import { Card, CardMedia, Container, Typography } from '@mui/material';
import { useLocation } from "react-router-dom";

const UpdateBlog = () => {
  const location = useLocation();
  const postData = location.state.postDetail;
  console.log(postMessage)
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "1rem",
        alignItems: "center",
        width: "30rem",
        mt:"4rem"
      }}
    >
      <Card
        sx={{
          width: "8rem",
          height: "8rem",
          p: "1rem",
          backgroundColor: "#1976D2",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image={formLogo}
          alt="logo"
          sx={{ height: "95%" }}
        />
      </Card>
      <Typography
        variant="h4"
        sx={{ fontFamily: "Girassol", m: "1rem", color: "#04617D" }}
      >
        ── Update Blog ──
      </Typography>
      <BlogForm postData={postData}/>
      
    </Container>
  );
};

export default UpdateBlog;
