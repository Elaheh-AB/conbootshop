import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import NotFound from "../NotFound";
import Home from "./Home";

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Router>
        <Routes>
          <Route path="/" element={<Home />}>

            {/* use of outlet in Home component exemple to display the component under Header */}
            {/* <Route path="/" element={<NotFound />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
