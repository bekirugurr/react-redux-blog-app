import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CardMedia, Typography } from "@mui/material";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setPostsData } from "../redux/actions/postsActions";
import { setLoading, clearLoading } from "../redux/actions/appActions";
import loadingGif from '../assets/loading.gif'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { key } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.app);
  const { postsList, previousPage, nextPage} = useSelector((state) => state.postData);

  const getPosts = async() => {
    let config = key ? {
      method : 'get',
      url: 'http://127.0.0.1:8000/post/post/',
      headers : {
        Authorization : `Token ${key}`
      }
    } : {
      method : 'get',
      url: 'http://127.0.0.1:8000/post/post/'
    }
    try {
      dispatch(setLoading())
      const { data } = await axios(config)
      const postsData = {
        nextPage : data.next,
        previousPage : data.previous,
        postsList : data.results
      }
      console.log(postsData)
      dispatch(setPostsData(postsData))
      dispatch(clearLoading())
    } catch (error) {
      console.log(error);
      dispatch(clearLoading())
    }

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
      {loading ? (
      <CardMedia component="img" sx={{height:'7rem', width:'7rem', textAlign:'center', mx:'auto'}} image={ loadingGif } alt="loading" >
      </CardMedia>
      ) : (
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
      )}
    </Container>
  );
};

export default Dashboard;
