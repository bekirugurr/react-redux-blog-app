import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const BlogCard = ({id, img, header, date, text, email}) => {
const navigate = useNavigate()

const handleClick = () => {
  navigate(`/details/${id}`)
}

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "white", mx:"auto", cursor:"pointer"}} onClick={handleClick}>
      <CardMedia
        component="img"
        height="140"
        image={img}
        alt={header}
      />
      <CardContent sx={{ backgroundColor: "#efeefe" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontFamily: "Girassol", textAlign: "start", color: "#04617D" }}
        >
          {header}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ color: "gray", fontFamily: "Roboto", textAlign: "start" }}
        >
          {date}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            height: "2.5rem",
            fontFamily: "Arial",
            textAlign: "start",
            color: "black",
          }}
        >
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <AccountCircleIcon />
        <Typography
          variant="body1"
          sx={{ fontFamily: "Roboto", fontSize: "20px", px:'1rem' }}
        >
          {email}
        </Typography>
      </CardActions>
      <CardActions sx={{px:"0"}}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Typography>56</Typography>
        <IconButton aria-label="comment">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography>56</Typography>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
