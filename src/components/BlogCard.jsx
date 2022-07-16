import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import defaultPostPic from "../assets/defaultPostPic.png";
import { elapsedTime, determineCategoryColor, determinePostCategory } from "../helpers/functions";
import { useSelector } from "react-redux";
import { toastErrorNotify } from "../helpers/toastNotify";


const BlogCard = ({
  id,
  is_viewed,
  is_liked,
  views_count,
  likes_count,
  profile_pic,
  post_detail,
  title,
  content,
  post_pic,
  publish_date,
  writer,
  writer_name,
  status,
  category,
  comments,
  slug
}) => {
  const navigate = useNavigate();
  const { key } = useSelector((state) => state.auth);

  const openDetails = () => {
    if(!key){
      toastErrorNotify('Login to get details')
      navigate('/login')
    }
    navigate(`/details/${slug}`, {state: { post_detail, id, is_viewed }});
  };
  return (
    <Card
      sx={{
        maxWidth: 310,
        backgroundColor: "white",
        mx: "auto",
        cursor: "pointer",
        ':hover': {
          boxShadow: "8px 8px 8px 3px #968c8c"
        }
      }}
      onClick={openDetails}
    >
      <CardMedia component="img" height="140" image={ post_pic || defaultPostPic } alt={title} />
      <CardContent sx={{ backgroundColor: "#efeefe" }}>
        <Typography
          variant="body1"
          component="div"
          sx={{ fontFamily: "Girassol", textAlign: "start", color: "#0a0e10", py:'0', mt:'0', height: '3rem', display:'flex', aligntItems:'center', fontSize:'1.5rem', lineHeight:'90%'}}
        >
          {title} 
          
        </Typography>
        <Box sx={{display:'flex', justifyContent:'space-between', pr:'0.8rem'}}>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ color: determineCategoryColor(category), fontFamily: "Segoe UI", textTransform:'upperCase', display:'flex', flexGrow:"1",  fontSize: "0.9rem", ':hover': {fontWeight:'bolder'} }}
        >
          {determinePostCategory(category)}

        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ color: "gray", fontFamily: "Roboto", display:'flex', justifyContent:'start',  fontSize: "0.8rem" }}
        >
          {elapsedTime(publish_date)} ago

        </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            height: "3.7rem",
            fontFamily: "Arial",
            textAlign: "start",
            color: "black",
          }}
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions sx={{display:"flex", justifyContent:"flex-end", pr:'2rem', py:"0"}}>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Roboto",
            fontSize: "0.75rem",
            pl: "0.7rem",
            pt: "0.2rem",
            display: "flex",
          }}
        >
          by
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Roboto",
            fontSize: "1.1rem",
            pr: "1.5rem",
            display: "flex",
          }}
        >
          {writer_name}
        </Typography>
        {profile_pic ? (
          <Avatar
            alt="writer_avatar"
            src={`http://127.0.0.1:8000/` + profile_pic}
            sx={{ height: "2.5rem", width: "2.5rem" }}
          />
        ) : (
          <AccountCircleIcon />
        )}

      </CardActions>
      <CardActions sx={{ p: "0"}}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: is_liked ? "crimson" : "gray" }} />
        </IconButton>
        <Typography>{likes_count}</Typography>
        <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography>{comments.length}</Typography>
        <IconButton aria-label="views_count">
          <VisibilityIcon />
        </IconButton>
        <Typography>{views_count}</Typography>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
