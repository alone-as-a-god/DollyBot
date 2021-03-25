import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import theme from "./Theme";
import Dashboard from "./pages/Dashboard/Dashboard";
import Commands from "./pages/Commands/Commands";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import YourServers from "./pages/YourServers/YourServers";
import { useEffect, useState } from "react";

const auth = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("code")) {
    console.log(urlParams.get("code"));
    window.location.href = "http://localhost:3000/dashboard";
    return true;
  }
};

function App() {
  const [user, setUser] = useState({
    username: "schnippolo",
    id: "314996127692881921",
    avatar: "0e0284c927a28d6c5ca4b9c6f8665e2e",
  });
  useEffect(() => {
    auth();
  }, []);
  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar user={user} />
          <Switch>
            <Route path="/dashboard" exact render={() => <YourServers />}></Route>
            <Route path="/dashboard/:id" render={() => <Dashboard />}></Route>
            <Route path="/commands" exact render={() => <Commands />}></Route>
            <Route path="/about" exact render={() => <About />}></Route>
            <Route path="/" exact render={() => <Home></Home>}></Route>
            <Route exact render={() => <NotFound />}></Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
