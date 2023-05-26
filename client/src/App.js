import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from 'pages/mainPage';
import LoginPage from "pages/loginPage";
import ProfilePage from "pages/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> 
        <Routes>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/main" element={<MainPage />}/>
          <Route path="/profile/:userId" element={<ProfilePage />}/>
        </Routes>
      </ThemeProvider>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
