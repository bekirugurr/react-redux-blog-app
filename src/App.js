import "./App.css";
import Router from "./router/Router";
import { createTheme, ThemeProvider } from "@mui/material";
import Girassol from "./assets/Girassol.ttf";
import { ToastContainer } from "react-toastify";

function App() {
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
