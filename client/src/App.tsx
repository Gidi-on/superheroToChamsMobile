import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import EditSinglePost from "./components/EditSinglePost";
import FormEntry from "./components/FormEntry";
import Home from "./pages/Home";

function App() {
  const shouldRedirect = true;
  return (
    <div className="font-montserrat">
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="/editPost/:id/:nickname/:description"
          element={<EditSinglePost />}
        ></Route>
        <Route path="/form" element={<FormEntry />}></Route>
        <Route
          path="/"
          element={shouldRedirect && <Navigate replace to="/home" />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
