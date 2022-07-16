import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import logoB from "../assets/logoB.png";
import profilimg from "../assets/profilimg.png";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@mui/styles";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import CreateIcon from '@mui/icons-material/Create';
import {  useSelector, useDispatch } from "react-redux";
import { clearCurrentUser } from "../redux/actions/authActions";
import axios from "axios";


const navbarMuiStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    height: "3.2rem",

  },
  logo: {
    height: "3.2rem",
    cursor: "pointer",
  },
  nameArea: {
    display: "flex",
    alignItems: "center",
    px: "1.2rem",
    fontSize: "1rem",
    position: "absolute",
    right: "4.5rem",
    top: "1.1rem",
    fontFamily: "Roboto",
  },
  menuItems: {
    fontSize: "1rem",
    px: "1rem",
    textAlign:"center"
  },
  middleText: {
    cursor: "pointer",
    fontFamily: "Girassol",
    position: "absolute",
    right: "calc(50% - 5.8rem)",
    top: ".6rem",
    
  },
});

const Navbar = () => {
  const { user, key} = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const classes = navbarMuiStyles();

  const logout = () => {
    console.log(key);
    let config = {
      method : 'post',
      url : "http://127.0.0.1:8000/auth/logout/",
      headers : {
        Authorization : `Token ${key}`
      }
    }
    axios(config)
    .then(response => {
      dispatch(clearCurrentUser())
      navigate('/')
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    handleCloseUserMenu()
    logout()
  }

  return (
    <AppBar color="primary"  position="static" sx={{ height:"3.2rem", width:"100vw"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={classes.toolbar} variant="dense">
          <Box
            component="img"
            className={classes.logo}
            alt="Your logo."
            src={logoB}
            onClick={handleLogoClick}
          />
          <Box onClick={handleLogoClick}>
            <Typography
              variant="h5"
              className={classes.middleText}
              sx={{ fontFamily: "Girassol", display: { xs: 'none', md: 'flex' } }}
            >
              ────Blog────
            </Typography>
          </Box>

          {user && (
            <Typography className={classes.nameArea} variant="body">
              {user.username}
            </Typography>
          )}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              user.profile && user.profile.profile_pic ? (
                <IconButton onClick={handleOpenUserMenu} sx={{padding: "0", marginTop:".3rem"}}>
                  <Avatar
                    alt="User Avatar"
                    src={user.profile.profile_pic}
                    sx={{ height: "2.5rem", width: "2.5rem" }}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={handleOpenUserMenu} sx={{padding:"0", marginTop:".3rem"}}>
                  <Avatar sx={{ bgcolor: "white",height: "2rem", width: "2rem" }}>
                    <PersonIcon color="primary" />
                  </Avatar>
                </IconButton>
              )
            ) : (
              <>
              <Button
                size="medium"
                sx={{ color: "white", textTransform: "capitalize" }}
                endIcon={<LockOpenOutlinedIcon size="large" />}
                onClick={()=>navigate("/login")}
              >
                Login
              </Button>
              <Button
                size="medium"
                sx={{ color: "white", textTransform: "capitalize" }}
                endIcon={<CreateIcon size="large" />}
                onClick={()=>navigate("/Register")}
              >
                SignUp
              </Button>
              </>
            )}
            <Menu
              sx={{ my: "40px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography className={classes.menuItems}>
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography

                  className={classes.menuItems}
                  onClick={() => navigate("/new-blog")}
                >
                  New
                </Typography>
              </MenuItem>
              {user && (
                <MenuItem onClick={handleLogOut}>
                  <Typography className={classes.menuItems}>
                    Logout
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
