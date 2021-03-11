import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import theme from "./Theme";
import Dashboard from "./pages/Dashboard/Dashboard";
import Commands from "./pages/Commands/Commands";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Route path="/" exact render={() => <Home></Home>}></Route>
          <Route path="/dashboard" exact render={() => <Dashboard />}></Route>
          <Route path="/commands" exact render={() => <Commands />}></Route>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
