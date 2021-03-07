import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import theme from "./Theme";
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/" exact render={() => <Home></Home>}></Route>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
