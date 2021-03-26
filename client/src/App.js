import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import theme from "./Theme";
import Dashboard from "./pages/Dashboard/Dashboard";
import Commands from "./pages/Commands/Commands";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/dashboard" exact render={() => <Dashboard />}></Route>
            <Route path="/commands" exact render={() => <Commands />}></Route>
            <Route path="/about" exact render={() => <About />}></Route>
            <Route path="/" exact render={() => <Home></Home>}></Route>
            <Route exact render={() => <NotFound />}></Route>
          </Switch>

          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
