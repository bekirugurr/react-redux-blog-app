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
import defaultAvatar from "../assets/avatar.png";



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
        p:'1rem 1rem 0',
        border: '1px solid #968c8c83',
        ':hover': {
          boxShadow: "8px 8px 8px 3px #968c8c"
        }
      }}
      onClick={openDetails}
    >
      <CardMedia component="img" height="190" image={ post_pic || defaultPostPic } alt={title} sx={{borderRadius:'5px', border:"1px solid #968c8c83"}}/>
      <CardContent sx={{borderBottom:'1px solid #968c8c83'}}>
        <Typography
          variant="body1"
          component="div"
          sx={{ fontFamily: "Girassol", textAlign: "start", color: "#0a0e10", py:'0', mt:'0', height: '3rem', display:'flex', aligntItems:'center', fontSize:'1.5rem', lineHeight:'90%'}}
        >
          {title} 
          
        </Typography>
        
        <Typography
          variant="body1"
          gutterBottom
          sx={{ color: determineCategoryColor(category), fontFamily: "Segoe UI", textTransform:'upperCase', display:'flex', flexGrow:"1",  fontSize: "0.9rem", ':hover': {fontWeight:'bolder'} }}
        >
          {determinePostCategory(category)}

        </Typography>
      
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
      <CardActions sx={{display:"flex", justifyContent:"flex-start", pl:'0.5rem', py:"0"}}>
      {profile_pic ? (
          <Avatar
            alt="writer_avatar"
            src={ profile_pic }
            sx={{ height: "2.5rem", width: "2.5rem", border: '1px solid gray' }}
          />
        ) : (
          <AccountCircleIcon sx={{ height: "2.5rem", width: "2.5rem" }}/>
        )}

<CardActions sx={{display:"flex", flexDirection:'column', alignItems:'start', pl:"0"}}>
        <CardActions sx={{display:"flex", justifyContent:"flex-start", pr:'2rem', py:"0"}}>


        <Typography
          variant="body2"
          sx={{
            fontFamily: "Roboto",
            fontSize: "0.75rem",
            pt: "0.2rem",
            display: "flex",
          }}
        >
          posted by
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Roboto",
            fontSize: "1.1rem",
            display: "flex",
          }}
        >
          {writer_name}
        </Typography>


      </CardActions>
      <CardActions sx={{display:"flex", justifyContent:"flex-start", py:"0", pl:"0"}}>

      <Typography
          variant="body2"
          sx={{
            fontFamily: "Roboto",
            fontSize: "1.1rem",
            display: "flex",
          }}
        >
          {elapsedTime(publish_date)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Roboto",
            fontSize: "0.75rem",
            pt: "0.2rem",
            display: "flex",
          }}
        >
          ago
        </Typography>
      </CardActions>
</CardActions>
      </CardActions>
      <CardActions sx={{ p: "0.5rem 0", borderTop:"1px solid #968c8c83"}}>
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
