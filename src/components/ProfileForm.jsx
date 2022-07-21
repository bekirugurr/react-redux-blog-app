import React from "react";
import {
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { updateCurrentUser } from "../redux/actions/authActions";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";

const ProfileForm = () => {
  const { key, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let initialUserInfo = {
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };
  let initialProfileInfo = {
    profile_bio: user.profile?.profile_bio,
    profile_pic: user.profile?.profile_pic,
    user: user.id
  };
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [profileInfo, setProfileInfo] = useState(initialProfileInfo);

  //! bu func u user ve profile için ayrı ayrı çağırıyoruz ki değişiklik hemen gelsin
  const fetchUserInfo = () => {
    let config = {
      method: "get",
      url: `https://blogapp-react-redux.herokuapp.com/auth/user/${user.id}/`,
    };
    axios(config)
      .then((response) => {    
        dispatch(updateCurrentUser(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    let isUserUpdateOk= true
    let isProfileUpdateOk= true
    let userConfig = {
      method: "patch",
      url: `https://blogapp-react-redux.herokuapp.com/auth/user/${user.id}/`,
      data: userInfo,
      headers: {
        Authorization: `Token ${key}`,
      },
    };

    try {
      const response = await axios(userConfig);
    } catch (error) {
        console.log(error);
        isUserUpdateOk= false
    } finally {
        fetchUserInfo()        
    }

    let profileConfig = user.profile
      ? {
          method: "patch",
          url: `https://blogapp-react-redux.herokuapp.com/auth/profile/${user.profile.id}/`,
          data: profileInfo,
          headers: {
            Authorization: `Token ${key}`,
            "Content-Type" : 'multipart/form-data'
          },
        }
      : {
          method: "post",
          url: `https://blogapp-react-redux.herokuapp.com/auth/profile/`,
          data: profileInfo,
          headers: {
            Authorization: `Token ${key}`,
            "Content-Type" : 'multipart/form-data'
          },
        };
    //! if bloku içine almamın nedeni eğer kişi profil_pic veya profil_bio eklemediyse sadece id ve user dan oluşan boş bir profil oluşturmasını engellemek
    if(profileInfo.profile_bio || profileInfo.profile_pic){
    try {
      const response = await axios(profileConfig);
    } catch (error) {
        console.log(error);
        isProfileUpdateOk= false
    } finally {
        fetchUserInfo()        
    }}

    //! if bloku içindekiler ancak iki update işlemi de başarılı olursa true verecek ve success bildirimini verecek

    if(isUserUpdateOk && isProfileUpdateOk){
        toastSuccessNotify('Profile updated succesfully')
    }else{
        toastErrorNotify('You made something wrong. Repeat')
    }
  };
  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleUpdateProfile}
      sx={{ px: "0" }}
    >
      <TextField
        id="outlined-basic-title"
        label="Username"
        variant="outlined"
        name="username"
        value={userInfo.username}
        fullWidth
        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
        required
        sx={{ mb: "1rem" }}
      />
       <TextField
        id="outlined-basic-email"
        label="Email"
        variant="outlined"
        name="email"
        value={userInfo.email}
        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        fullWidth
        required
        sx={{ mb: "1rem" }}
      /> 
      <TextField
        id="outlined-basic-first-name"
        label="First Name"
        variant="outlined"
        name="first_name"
        value={userInfo.first_name}
        onChange={(e) =>
          setUserInfo({ ...userInfo, first_name: e.target.value })
        }
        fullWidth
        sx={{ mb: "1rem" }}
      />
      <TextField
        id="outlined-basic-last-name"
        label="Last Name"
        variant="outlined"
        name="last_name"
        value={userInfo.last_name}
        onChange={(e) =>
          setUserInfo({ ...userInfo, last_name: e.target.value })
        }
        fullWidth
        sx={{ mb: "1rem" }}
      />
     
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ mb: "1rem" }}       
        onChange={(e) => setProfileInfo({ ...profileInfo, profile_pic: e.target.files[0] })}
      >
        {user.profile ? "Change" : "Upload"} Profile Photo
        <input hidden accept="image/*" type="file" />
      </Button> 

      <TextField
        id="outlined-basic-profile-bio"
        label="Bio"
        variant="outlined"
        name="profile_bio"
        value={profileInfo.profile_bio}
        onChange={(e) =>
          setProfileInfo({ ...profileInfo, profile_bio: e.target.value })
        }
        fullWidth
        multiline
        minRows={5}
        sx={{ mb: "1rem" }}
      />  
      <Button
        variant="contained"
        fullWidth
        type="submit"
        sx={{
          ":hover": {
            bgcolor: "#ffffff",
            color: "#046582",
            outline: "1px solid #4c95ab",
          },
        }}
      >
        UPDATE
      </Button>
    </Box>
  );
};

export default ProfileForm;
