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
import { useState } from "react";

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
});

const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const initialValues = {
    userName: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    setUserInfo({
      userName: values.userName,
      email: values.email,
      password: values.password,
    });
    resetForm();
  };
  console.log(userInfo);

  return (
    <Box
      sx={{
        backgroundImage: "url(https://picsum.photos/1600/900)",
        backgroundRepeate: "no-repeat",
        pt: "2.5rem",
        mt: "4rem",
        pb: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "2.5rem",
          alignItems: "center",
          width: "27rem",
          mx: "auto",
          bgcolor: "rgba(255,255,255, 0.5)",
          borderRadius: "7px",
        }}
      >
        <Card
          sx={{
            width: "12rem",
            height: "12rem",
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
              <Grid container spacing={3}>
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
                    REGISTER
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                      height: "2.5rem",
                      bgcolor: "white",
                      color: "#046582",
                      ":hover": {
                        bgcolor: "#f0eded",
                        color: "#046582",
                      },
                    }}
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
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Register;
