import React from 'react'
import BlogForm from '../components/BlogForm'
import formLogo from "../assets/formLogo.png";
import { Card, CardMedia, Container, Typography } from '@mui/material';


const NewBlog = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        py: '1rem',
        alignItems: "center",
        width:"40rem",
        mt:"1rem"
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
        ── New Post ──
      </Typography>
    <BlogForm/>
    </Container>
  )
}

export default NewBlog