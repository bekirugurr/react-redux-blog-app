import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import formLogo from "../assets/formLogo.png";
import googleLogo from "../assets/googleLogo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import axios from "axios";
import { setCurrentUser } from "../redux/actions/authActions";
import { setLoading, clearLoading } from "../redux/actions/appActions";
import loadingGif from "../assets/loading.gif";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/toastNotify";

const signUpValidationSchema = Yup.object({
  userName: Yup.string()
    .required("User Name is required !")
    .min(4, "User Name must be more than 3 characters!")
    .max(15, "User Name must be less than 15 characters!"),
  email: Yup.string().email("Invalid Email").required("Email is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password should be 8 chars minimum!")
    .matches(/\d+/, "Password must have a number!")
    .matches(/[a-z]+/, "Password must have a lowercase!")
    .matches(/[A-Z]+/, "Password must have a uppercase!")
    .matches(/[!?.@#$%^&*()-+]+/, "Password must have a special char!"),
  password2: Yup.string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.app);
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    password2: ""
  };

//! register func
const signUp = async(data) => {
try {
  dispatch(setLoading());
  let config = {
    method: 'post',
    url:'https://blogapp-react-redux.herokuapp.com/auth/register/',
    data: data
  }
  const res = await axios(config)
  let userData = {
    key : res.data.token,
    user : {
      username : res.data.username,
      email : res.data.email
    }
  }
  dispatch(setCurrentUser(userData))
  localStorage.setItem("userInfo", JSON.stringify(userData));
  dispatch(clearLoading());
  navigate('/')
  toastSuccessNotify("Signed up succesfully ");
} catch (error) {
  toastErrorNotify('Something is wrong. Try again!')
  console.log(error);
  dispatch(clearLoading());
}}

  const handleSubmit = (values, { resetForm }) => {
    let data = {
      username : values.userName,
      email: values.email,
      password: values.password,
      password2: values.password2
    } 
    signUp(data)
    resetForm();
  };
  const handleProviderSignUp = () => {
    
  }

  return (
    <Box
      sx={{
        backgroundImage: "url(https://picsum.photos/1300/800)",
        backgroundRepeate: "no-repeat",
        pt: "1.5rem",
        pb: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "1.5rem 2.5rem",
          alignItems: "center",
          width: "27rem",
          mx: "auto",
          bgcolor: "rgba(255,255,255, 0.7)",
          borderRadius: "7px",
        }}
      >
        <Card
          sx={{
            width: "8rem",
            height: "8rem",
            p: "1rem",
            backgroundColor: "#1976D2",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={formLogo}
            alt="logo"
            sx={{ height: "95%" }}
          />
        </Card>
        <Typography
          variant="h5"
          sx={{ fontFamily: "Girassol", m: "1rem", color: "#04617D" }}
        >
          ── Register ──
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={signUpValidationSchema}
        >
          {({ values, handleChange, handleSubmit, errors, touched, handleBlur}) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="userName"
                    label="User Name"
                    type="text"
                    variant="outlined"
                    value={values.userName}
                    onChange={handleChange}
                    helperText={touched.userName &&  errors.userName}
                    error={touched.userName &&  Boolean(errors.userName)}
                    onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    helperText={touched.email &&  errors.email}
                    error={touched.email &&  Boolean(errors.email)}
                    onBlur={handleBlur}
                    />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    helperText={touched.password &&  errors.password}
                    error={touched.password &&  Boolean(errors.password)}
                    onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password2"
                    label="Password Again"
                    type="password"
                    variant="outlined"
                    value={values.password2}
                    onChange={handleChange}
                    helperText={touched.password2 &&  errors.password2}
                    error={touched.password2 &&  Boolean(errors.password2)}
                    onBlur={handleBlur}
                    />
                </Grid>


                {loading ? (
                  <CardMedia
                    component="img"
                    sx={{
                      height: "5rem",
                      width: "5rem",
                      textAlign: "center",
                      mx: "auto",
                    }}
                    image={loadingGif}
                    alt="loading"
                  ></CardMedia>
                ) : (
                  <>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                      height: "2.5rem",
                      ":hover": {
                        bgcolor: "white",
                        color: "#046582",
                      },
                    }}
                  >
                    SIGN UP
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    // type="submit"
                    sx={{
                      height: "2.5rem",
                      bgcolor: "white",
                      color: "#046582",
                      ":hover": {
                        bgcolor: "#f0eded",
                        color: "#046582",
                      },
                    }}
                    onClick={handleProviderSignUp}

                  >
                    Continue with{" "}
                    <img
                      src={googleLogo}
                      alt="googleLogo"
                      style={{ height: "2rem" }}
                    />
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Typography sx={{ me: "3rem" }}>
                    Do you already have an account?
                  </Typography>
                  <Link
                    color={"primary"}
                    sx={{
                      fontWeight: "bold",
                      cursor: "pointer",
                      px: "1rem",
                      textDecoration: "none",
                    }}
                    href="/login"
                  >
                    Login
                  </Link>
                </Grid>

                </>
                )}
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Register;
