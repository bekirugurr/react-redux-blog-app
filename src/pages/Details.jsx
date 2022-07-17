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
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  elapsedTime,
  determineCategoryColor,
  determinePostCategory,
} from "../helpers/functions";
import CommentForm from "../components/CommentForm";
import { setLoading, clearLoading } from "../redux/actions/appActions";
import loadingGif from '../assets/loading.gif'


const Details = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const post_url = location.state.post_detail;
  const postId = location.state.id;
  const postIsViewed = location.state.is_viewed;
  const [postDetail, setPostDetail] = useState({});
  const { key, user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.app);

  const getPostDetail = async() => {
    let config = {
      method: "get",
      url: post_url,
      headers: {
        Authorization: `Token ${key}`,
      },
    };

    try {
      const { data } = await axios(config)
      setPostDetail(data);
    } catch (error) {
      console.log(error);
    }

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
  }, []);

  console.log(postDetail);

  const handleLikeClick = () => {
    setPostDetail({ ...postDetail, is_liked: !postDetail.is_liked });
    let config;
    if (postDetail.is_liked) {
      config = {
        method: "delete",
        url: `http://127.0.0.1:8000/post/like/${postDetail.like_id}`,
        headers: {
          Authorization: `Token ${key}`,
        },
      };
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
        },
      };
    }

    axios(config)
      .then((response) => {
        console.log(response);
        getPostDetail();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    {loading ? (
            <CardMedia component="img" sx={{height:'7rem', width:'7rem', textAlign:'center', mx:'auto'}} image={ loadingGif } alt="loading" >
            </CardMedia>
    ):(
      <>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Girassol",
          mb: "1.5rem",
          color: "#04617D",
        }}
      >
        ──── Details ────
      </Typography>
      <Card
        sx={{
          width: "37rem",
          backgroundColor: "white",
          mx: "auto",
          mb: "2rem",
          border: "1px solid #a2a4a556",
          p: "1.5rem",
        }}
      >
        <CardMedia
          component="img"
          width="100%"
          sx={{ maxHeight: "20rem", borderRadius: "5px" }}
          image={postDetail.post_pic}
          alt={postDetail.title}
        />
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontFamily: "Segoe UI",
            textAlign: "start",
            fontWeight: "600",
            p: "0.8rem",
            borderBottom: "1px solid #a2a4a556",
          }}
        >
          {postDetail.title}
        </Typography>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #a2a4a556",
            py: "0",
          }}
        >
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

          <CardActions sx={{ py: "0" }}>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                py:'0'
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontFamily: "Roboto", fontSize: "1rem", pl: "1rem" }}
              >
                posted by <b>{postDetail.writer_name}</b>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "1rem",
                  mx: "0",
                  pl: "0.5rem",
                }}
              >
                <b>{elapsedTime(postDetail.publish_date)}</b> ago
              </Typography>
            </CardActions>
            {postDetail.profile_pic ? (
              <Avatar
                alt="writer_avatar"
                src={`http://127.0.0.1:8000/` + postDetail.profile_pic}
                sx={{ height: "2.5rem", width: "2.5rem" }}
              />
            ) : (
              <AccountCircleIcon />
            )}
          </CardActions>
        </CardActions>
        <CardContent>
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
        <CommentForm postId={postDetail.id} getPostDetail={getPostDetail}/>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontFamily: "Segoe UI",
            textAlign: "start",
            fontWeight: "600",
            p: " 0 0.6rem 0.6rem",
            borderBottom: "1px solid #a2a4a556",
          }}
        >
          Comments
        </Typography>
        {postDetail.comments?.map(comment => (
        <CardActions key={comment.id} sx={{ p: "0.7rem 0", borderBottom:'1px solid #a2a4a556', display:'flex', flexDirection:'column', alignItems:'start', gap:'0.5rem' }}>

          <Typography sx={{fontSize:'0.7rem', pl:'0.5rem'}}> Comment by <b>{comment.commenter_name}</b> - <b>{elapsedTime(comment.date_stamp)}</b> ago</Typography>
          <Typography sx={{fontSize:'1rem'}}>{comment.content}</Typography>
        </CardActions>
          )
          )}
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
      </>)}
    </>
  );
};

export default Details;
