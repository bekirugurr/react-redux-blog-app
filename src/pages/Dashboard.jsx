import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPostsData, expandPostsData } from "../redux/actions/postsActions";
import { setLoading, clearLoading } from "../redux/actions/appActions";
import loadingGif from "../assets/loading.gif";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { key } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.app);
  const { postsList, previousPage, nextPage } = useSelector(
    (state) => state.postData
  );

  const getPosts = async () => {
    let config = key
      ? {
          method: "get",
          url: "https://blogapp-react-redux.herokuapp.com/post/post/",
          headers: {
            Authorization: `Token ${key}`,
          },
        }
      : {
          method: "get",
          url: "https://blogapp-react-redux.herokuapp.com/post/post/",
        };
    try {
      dispatch(setLoading());
      const { data } = await axios(config);
      const postsData = {
        nextPage: data.next,
        previousPage: data.previous,
        postsList: data.results,
      };
      console.log(postsData);
      dispatch(setPostsData(postsData));
      dispatch(clearLoading());
    } catch (error) {
      console.log(error);
      dispatch(clearLoading());
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleViewMore = async() => {
    let config = key
      ? {
          method: "get",
          url: nextPage,
          headers: {
            Authorization: `Token ${key}`,
          },
        }
      : {
          method: "get",
          url: nextPage,
        };
    try {
      const { data } = await axios(config);
      const postsData = {
        nextPage: data.next,
        previousPage: data.previous,
        postsList: data.results,
      };
      console.log(postsData);
      dispatch(expandPostsData(postsData));
    } catch (error) {
      console.log(error);
    }
  }
console.log(postsList);
  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Girassol",
          mb: "1.5rem",
          mt: "1rem",
          color: "#04617D",
        }}
      >
        ──── Dashboard ────
      </Typography>
      {loading ? (
        <CardMedia
          component="img"
          sx={{
            height: "7rem",
            width: "7rem",
            textAlign: "center",
            mx: "auto",
          }}
          image={loadingGif}
          alt="loading"
        ></CardMedia>
      ) : (
        <Box>
          <Grid
            container
            spacing={5}
            sx={{ p: "0 2rem 2rem", justifyContent: "center" }}
          >
            {postsList.map(
              (item) =>
                item.status == "P" && (
                  <Grid key={item.id} item lg={4} md={6} sm={12}>
                    <BlogCard {...item} />
                  </Grid>
                )
            )}

          </Grid>
          <Button
            onClick={handleViewMore}
            sx={{
              mb:'2rem',
              color: "white",
              bgcolor: "dodgerBlue",
              width: "8rem",
              ":hover": {
                bgcolor: "#0b69c7",
              },
            }}
          >
            View More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
