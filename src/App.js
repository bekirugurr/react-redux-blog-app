import "./App.css";
import Router from "./router/Router";
import { createTheme, ThemeProvider } from "@mui/material";
import Girassol from "./assets/Girassol.ttf";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/actions/authActions";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    let currentUserInfo= localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : '';  
    dispatch(setCurrentUser(currentUserInfo));

  }, [])
  

  const myTheme = createTheme({
    typography: {
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={myTheme}>
        <Router />
        <ToastContainer /> 
      </ThemeProvider>
    </div>
  );
}

export default App;
