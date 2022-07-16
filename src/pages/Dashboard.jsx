import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../redux/actions/postsActions";

const Dashboard = () => {
  const dispatch = useDispatch()
  const { key } = useSelector((state) => state.auth);
  const { postsList, previousPage, nextPage} = useSelector((state) => state.postData);

  const getPosts = () => {
    let config = key ? {
      method : 'get',
      url: 'http://127.0.0.1:8000/post/post/',
      headers : {
        Authorization : `Token ${key}`
      }
    } : {
      method : 'get',
      url: 'http://127.0.0.1:8000/post/post/',
    }

    axios(config)
    .then(response => {
      console.log(response.data);
      const postsData = {
        nextPage : response.data.next,
        previousPage : response.data.previous,
        postsList : response.data.results
      }
      console.log(postsData)
      dispatch(setPostsData(postsData))
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    getPosts()
  }, [])
  

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{ fontFamily: "Girassol", mb: "1.5rem", mt:"1rem", color: "#04617D" }}
      >
        ──── Dashboard ────
      </Typography>
      <Grid
        container
        spacing={5}
        sx={{ p: "0 2rem 5rem", justifyContent: "center" }}
      >
        {postsList.map((item) => (
          item.status == 'P' &&  (
            <Grid key={item.id} item lg={4} md={6} sm={12}>
            <BlogCard {...item} />
          </Grid>
          )
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
