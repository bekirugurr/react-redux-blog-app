import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import defaultAvatar from "../assets/avatar.png";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  const dispatch = useDispatch();
  const { key, user } = useSelector((state) => state.auth);

  return (
    <Card
      sx={{
        width: "37rem",
        backgroundColor: "white",
        mx: "auto",
        mb: "2rem",
        mt: "1rem",
        border: "1px solid #a2a4a556",
        p: "1.5rem",
      }}
    >
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #a2a4a556",
          p: "0",
        }}
      >
        <CardActions sx={{ p: "0", pb:'1rem' }}>
          <Avatar
            alt="writer_avatar"
            src={
              user.profile?.profile_pic
                ? user.profile.profile_pic
                : defaultAvatar
            }
            sx={{ height: "8rem", width: "8rem" }}
          />
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent:'space-evenly',
              alignItems: "start",
              py: "0",
              pl:'1rem',
              height:"7rem"
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Roboto",
                mx: "0",
              }}
            >
              {user.username}
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
              {user.email}
            </Typography>
          </CardActions>
        </CardActions>
      </CardActions>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Roboto",
            textAlign: "start",
            borderBottom: "1px solid #a2a4a556",
            p:'0.5rem 0'
          }}
        >
          Profile
        </Typography>
      <CardActions sx={{p:'1rem 0'}}>
          <ProfileForm/>
      </CardActions>
    </Card>
  );
};

export default Profile;
