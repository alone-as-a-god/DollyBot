import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import theme from "./Theme";
import { useState } from "react";

function App() {
  const [homeWasOpened, setHomeWasOpened] = useState(false); //needed so that animation only happens when first opened
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Route path="/" exact render={() => <Home wasOpened={homeWasOpened} setWasOpened={setHomeWasOpened}></Home>}></Route>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
