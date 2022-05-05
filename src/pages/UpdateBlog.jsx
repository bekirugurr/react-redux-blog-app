import React from "react";
import BlogForm from '../components/BlogForm'
import formLogo from "../assets/formLogo.png";
import { Box, Button, Card, CardMedia, Container, Typography } from '@mui/material';

const UpdateBlog = () => {
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
          width: "12rem",
          height: "12rem",
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
      <BlogForm />
      
    </Container>
  );
};

export default UpdateBlog;
