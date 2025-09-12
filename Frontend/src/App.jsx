import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./Pages/Login.jsx";
import { Body } from "./pages/Body.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Home } from "./pages/Home.jsx";

import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          {/* all the routes will work in start to this basename */}
          <Routes>
            <Route path="/" element={<Body />}>
              {/* inside this we will put the children routes inside the "/" route and it will rendered under the Outlet in Body */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
