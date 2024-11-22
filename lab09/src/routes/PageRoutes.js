import { Routes, Route } from "react-router";

import Login from "components/Login/Login";
import Missing from "components/Missing";
import RequireAuth from "components/RequireAuth";

function PageRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route element={<RequireAuth />}>
      </Route>
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default PageRoutes;
