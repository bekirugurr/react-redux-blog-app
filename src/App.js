import "./App.css";
import AppRouter from "./router/AppRouter";
import { createTheme, ThemeProvider } from "@mui/material";
import Girassol from "./assets/Girassol.ttf";

function App() {
  const myTheme = createTheme({
    typography: {
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={myTheme}>
        <AppRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;
