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
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  elapsedTime,
  determineCategoryColor,
  determinePostCategory,
} from "../helpers/functions";
import CommentForm from "../components/CommentForm";
import loadingGif from "../assets/loading.gif";
import defaultPostPic from "../assets/defaultPostPic.png";



const Details = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const post_url = location.state.post_detail;
  const postId = location.state.id;
  const isPostViewed = location.state.is_viewed
  const [postIsViewed, setPostIsViewed] = useState(isPostViewed);
  const [postDetail, setPostDetail] = useState({});
  const [isDeleteDivOpen, setIsDeleteDivOpen] = useState(false);
  const { key, user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const isOwnPost = user.username == postDetail.writer_name

  const handleView = () => {
    if (!postIsViewed) {
      setPostIsViewed(true)
      let data = {
        who_viewed: user.id,
        post: postId,
      };
      let config = {
        method: "post",
        url: "https://blogapp-react-redux.herokuapp.com/post/view/",
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
  }
  

  const getPostDetail = async (post_url) => {
    let config = {
      method: "get",
      url: post_url,
      headers: {
        Authorization: `Token ${key}`,
      },
    };

    try {
      const { data } = await axios(config);
      setPostDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetail(post_url);
    handleView()
  }, []);


  const handleLikeClick = () => {
    setPostDetail({ ...postDetail, is_liked: !postDetail.is_liked });
    let config;
    if (postDetail.is_liked) {
      config = {
        method: "delete",
        url: `https://blogapp-react-redux.herokuapp.com/post/like/${postDetail.like_id}`,
        headers: {
          Authorization: `Token ${key}`,
        },
      };
    } else {
      config = {
        method: "post",
        url: `https://blogapp-react-redux.herokuapp.com/post/like/`,
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
        getPostDetail(post_url);
      })
      .catch((error) => {
        console.log(error);
      });

  };


const handleDeleteClick = () => {
  let config = {
    method: "delete",
    url: `https://blogapp-react-redux.herokuapp.com/post/post/${postDetail.id}`,
    data: {
      post: postDetail.id,
    },
    headers: {
      Authorization: `Token ${key}`,
    },
  }
  axios(config)
  .then((response) => {
    console.log(response);
    navigate('/');
  })
  .catch((error) => {
    console.log(error);
  });
}

  return (
    <>
    {isDeleteDivOpen ? (
      <Card sx={{ maxWidth: 450, mt:'2rem', border:'1px solid dodgerBlue', borderRadius:'10px', mx:"auto", py:"1rem"  }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          Are you sure?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Do you want to delete the post permanantly?
        </Typography>
      </CardContent>
      <CardActions sx={{display:'flex', justifyContent:'center', gap:"3rem"}}>
        <Button variant="contained" size="small" color='error' onClick={handleDeleteClick}>Delete</Button>
        <Button variant="contained" size="small" onClick={()=>setIsDeleteDivOpen(false)}>Cancel</Button>
      </CardActions>
    </Card>
    ):(
    <>
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
              p: "1.5rem 1.5rem 0",
            }}
          >
            <CardMedia
              component="img"
              width="100%"
              sx={{ maxHeight: "20rem", borderRadius: "5px" }}
              image={postDetail.post_pic || defaultPostPic}
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
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleLikeClick}
                >
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
                    py: "0",
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
                    src={postDetail.profile_pic}
                    sx={{ height: "2.5rem", width: "2.5rem" }}
                  />
                ) : (
                  <AccountCircleIcon sx={{ height: "2.5rem", width: "2.5rem" }}/>
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
            <CommentForm id={postDetail.id} getPostDetail={getPostDetail} post_detail={postDetail.post_detail} />
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontFamily: "Segoe UI",
                textAlign: "start",
                fontWeight: "600",
                p: "0 0.6rem 0.6rem",
                borderBottom: "1px solid #a2a4a556",
              }}
            >
              Comments
            </Typography>
            {postDetail.comments?.map((comment) => (
              <CardActions
                key={comment.id}
                sx={{
                  p: "0.7rem 0",
                  borderBottom: "1px solid #a2a4a556",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "0.5rem",
                }}
              >
                <Typography sx={{ fontSize: "0.7rem", pl: "0.5rem" }}>
                  Comment by <b>{comment.commenter_name}</b> -{" "}
                  <b>{elapsedTime(comment.date_stamp)}</b> ago
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>
                  {comment.content}
                </Typography>
              </CardActions>
            ))}


          {isOwnPost && (
            <CardActions sx={{display:'flex', justifyContent:'space-evenly', py:'1rem'}}>
              <Button variant='contained' onClick={()=> navigate('/update-blog', {state: { postDetail }} )}>UPDATE</Button>
              <Button variant='contained'  onClick={()=>setIsDeleteDivOpen(true)}>DELETE</Button>
            </CardActions>
          )}
          </Card>
          
        </>
      )}
      </>    )}
    </>
  );
};

export default Details;
