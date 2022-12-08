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
// import googleLogo from "../assets/googleLogo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/actions/authActions";
import { setLoading, clearLoading } from "../redux/actions/appActions";
import loadingGif from "../assets/loading.gif";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/toastNotify";

const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password should be 8 chars minimum!")
    .matches(/\d+/, "Password must have a number!")
    .matches(/[a-z]+/, "Password must have a lowercase!")
    .matches(/[A-Z]+/, "Password must have a uppercase!")
    .matches(/[!?.@#$%^&*()-+]+/, "Password must have a special char!"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.app);
  const initialValues = {
    email: "",
    password: "",
  };

  //! log in function
  const logIn = (data) => {
    let config = {
      method: "post",
      url: "https://blog-api-django.onrender.com/auth/login/",
      data: data,
    };
    dispatch(setLoading());
    axios(config)
      .then((response) => {
        console.log(response.data);
        dispatch(setCurrentUser(response.data));
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        dispatch(clearLoading());
        navigate("/");
        toastSuccessNotify("Logged in succesfully ");
      })
      .catch((error) => {
        toastErrorNotify('Something is wrong. Try again!')
        console.log(error);
        dispatch(clearLoading());
      });
  };

  const handleSubmit = (values, { resetForm }) => {
    let data = {
      email: values.email,
      password: values.password,
    };
    logIn(data);
    resetForm();
  };

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
          p: "1.5rem 2.5rem 2.5rem",
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
          ── Login ──
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginValidationSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
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
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
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
                        LOGIN
                      </Button>
                    </Grid>
{/*                     <Grid item xs={12}>
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
                        onClick={handleProviderLogin}
                      >
                        Continue with
                        <img
                          src={googleLogo}
                          alt="googleLogo"
                          style={{ height: "2rem" }}
                        />
                      </Button>
                    </Grid> */}
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Typography sx={{ me: "3rem" }}>
                        Don't you have an account?
                      </Typography>
                      <Link
                        color={"primary"}
                        sx={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          px: "1rem",
                          textDecoration: "none",
                        }}
                        href="/register"
                      >
                        Sign Up
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

export default Login;
