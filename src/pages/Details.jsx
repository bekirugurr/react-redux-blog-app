import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Avatar from "@mui/material/Avatar";
import { Box, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  elapsedTime,
  determineCategoryColor,
  determinePostCategory,
} from "../helpers/functions";

const Details = () => {
  const location = useLocation();
  const post_url = location.state.post_detail;
  const postId = location.state.id;
  const postIsViewed = location.state.is_viewed;
  const [postDetail, setPostDetail] = useState({});
  const { key, user } = useSelector((state) => state.auth);

  const getPostDetail = () => {
    let config = {
      method: "get",
      url: post_url,
      headers: {
        Authorization: `Token ${key}`,
      },
    };

    axios(config)
      .then((response) => {
        setPostDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const increaseViewsCount = () => {
    if (!postIsViewed) {
      let data = {
        who_viewed: user.id,
        post: postId,
      };
      let config = {
        method: "post",
        url: "http://127.0.0.1:8000/post/view/",
        data: data,
        headers: {
          Authorization: `Token ${key}`,
        },
      };

      axios(config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getPostDetail();
    increaseViewsCount();
  }, []);
  console.log(postDetail);

  const handleLikeClick = () => {
   setPostDetail({...postDetail, is_liked : !postDetail.is_liked})
   let config;
   if (postDetail.is_liked) {
      config = {
        method: "delete",
        url: `http://127.0.0.1:8000/post/like/${postDetail.like_id}`,
        headers: {
          Authorization: `Token ${key}`,
        },
      };
      console.log("BUUUURAAAAYAAA BAAAAK --> 4444");

    } else {
      config = {
        method: "post",
        url: `http://127.0.0.1:8000/post/like/`,
        data: {
          post: postDetail.id,
          who_liked: user.id,
        },
        headers: {
          Authorization: `Token ${key}`,
        }
      }; 
    }

    axios(config)
        .then((response) => {
          console.log(response);
          getPostDetail()
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Girassol",
          mb: "1.5rem",
          color: "#04617D",
          mt: "5rem",
        }}
      >
        ──── Details ────
      </Typography>
      <Card
        sx={{
          width: "75%",
          backgroundColor: "white",
          mx: "auto",
          mb: "2rem",
        }}
      >
        <CardMedia
          component="img"
          width="100%"
          image={postDetail.post_pic}
          alt={postDetail.title}
        />
        <CardContent sx={{ backgroundColor: "#efeefe" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontFamily: "Girassol", color: "#04617D", my: "1rem" }}
          >
            {postDetail.title}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: "gray", fontFamily: "Roboto" }}
          >
            Posted {elapsedTime(postDetail.publish_date)} ago
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "Arial",
              textAlign: "start",
              color: "black",
            }}
          >
            {postDetail.content}
          </Typography>
        </CardContent>
        <CardActions>
          {postDetail.profile_pic ? (
            <Avatar
              alt="writer_avatar"
              src={`http://127.0.0.1:8000/` + postDetail.profile_pic}
              sx={{ height: "2.5rem", width: "2.5rem" }}
            />
          ) : (
            <AccountCircleIcon />
          )}
          <Typography
            variant="body1"
            sx={{ fontFamily: "Roboto", fontSize: "20px", px: "1rem" }}
          >
            {postDetail.writer_name}
          </Typography>
        </CardActions>
        <CardActions sx={{ p: "0" }}>
          <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
            <FavoriteIcon
              sx={{ color: postDetail.is_liked ? "crimson" : "gray" }}
            />
          </IconButton>
          <Typography>{postDetail.likes_count}</Typography>
          <IconButton aria-label="comment">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography>{postDetail.comments?.length}</Typography>
          <IconButton aria-label="views_count">
            <VisibilityIcon />
          </IconButton>
          <Typography>{postDetail.views_count}</Typography>
        </CardActions>
      </Card>
      {user.username == postDetail.writer_name && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "40%",
            mx: "auto",
            my: "1rem",
          }}
        >
          <Button
            sx={{
              color: "black",
              bgcolor: "lightgray",
              width: "8rem",
              ":hover": {
                bgcolor: "#a7a7a7",
              },
            }}
          >
            UPDATE
          </Button>
          <Button
            sx={{
              color: "white",
              bgcolor: "#ed365b",
              width: "8rem",
              ":hover": {
                bgcolor: "#C51162",
              },
            }}
          >
            DELETE
          </Button>
        </Box>
      )}
    </>
  );
};

export default Details;
