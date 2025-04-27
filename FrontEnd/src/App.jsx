import "./App.css";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import { Layout } from "./components/Layout"

import { MainPage } from "./pages/MainPage";

import { AdminAccounts } from "./pages/AdminAccounts";
import { AdminParking } from "./pages/AdminParking";
import { AdminHistory } from "./pages/AdminHistory";
import { AdminProfile } from "./pages/AdminProfile";

// import { UserParking } from "./pages/UserParking";
import { UserParkingView } from "./pages/UserParkingView";
import { UserParking } from "./pages/UserParking";
import { UserProfile } from "./pages/UserProfile";


// import { AdminPage } from "./pages/AdminPage";
// import { UserPage } from "./pages/UserPage";
// import { WorkerPage } from "./pages/WorkerPage";

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route element = {<Layout/>}>
              <Route path = "/" element={<MainPage />} />
              <Route path = "/adminAccounts" element={<AdminAccounts />} />
              <Route path = "/adminParking" element={<AdminParking />} />
              <Route path = "/adminHistory" element={<AdminHistory />} />
              <Route path = "/adminProfile" element={<AdminProfile />} />
              <Route path = "/userParkingView" element ={<UserParkingView />} />
              <Route path = "/userProfile" element ={<UserProfile />} />
              <Route path="/userParking/:zone" element={<UserParking />} />

            </Route>
          </Routes>
        </Router>


      {/* <MainPage /> */}
      {/* <AdminPage /> */}
      {/* <UserPage /> */}
      {/* <WorkerPage /> */}
    </>
  );
}

export default App;
