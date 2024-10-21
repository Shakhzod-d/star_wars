import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Details, Home } from "./pages";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/person/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
