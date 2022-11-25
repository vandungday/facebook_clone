import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import CreatePostPopup from "./components/createPostPopup";

import Home from "./pages/home";
import Activate from "./pages/home/Active";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Reset from "./pages/reset/index";
import LoggedInRoute from "./routes/LoggedInRoute";
import NoLoggedInRoute from "./routes/NoLoggedInRoute";

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <CreatePostPopup user={user} />
      <Routes>
        <Route element={<LoggedInRoute />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/" element={<Home />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NoLoggedInRoute />}>
          <Route path="/login" element={<Login />} exact />
          <Route path="/reset" element={<Reset />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
