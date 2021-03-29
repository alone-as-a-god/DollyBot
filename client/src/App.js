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
import { UserProvider } from "./UserContext";
import { YourServersContext, YourServersProvider } from "./pages/YourServers/YourServersContext";
function App() {
  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <Navbar />

            <Switch>
              <Route path="/dashboard" exact render={() => <YourServers />}></Route>
              <Route
                path="/dashboard/:id"
                render={() => (
                  <YourServersProvider>
                    <Dashboard />
                  </YourServersProvider>
                )}
              ></Route>
              <Route path="/commands" exact render={() => <Commands />}></Route>
              <Route path="/about" exact render={() => <About />}></Route>
              <Route path="/" exact render={() => <Home></Home>}></Route>
              <Route exact render={() => <NotFound />}></Route>
            </Switch>

            <Footer />
          </UserProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
