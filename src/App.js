import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from 'react';
import { Login } from "./pages/login/Login";
import { ForgotPwd } from "./pages/forgotPwd/ForgotPwd"
import RidersList from "./pages/riders/list/List";
import RiderSingle from "./pages/riders/single/Single";
import RiderNew from "./pages/riders/new/New"; 
import DispatchList from "./pages/dispatch/list/List";
import DispatchSingle from "./pages/dispatch/single/Single";
import DispatchNew from "./pages/dispatch/new/New"; 
import RideHistoryList from "./pages/rideHistory/list/List";
import RideHistorySingle from "./pages/rideHistory/single/Single";
import RideList from "./pages/rides/list/List";
import RideSingle from "./pages/rides/single/Single";
import DriversList from "./pages/drivers/list/List";
import DriverSingle from "./pages/drivers/single/Single";
import DriversNew from "./pages/drivers/new/New"; 
import NotificationList from "./pages/notifications/list/List";
import NotificationSingle from "./pages/notifications/single/Single";
import NotificationNew from "./pages/notifications/new/New"; 
import ReviewsList from "./pages/reviews/list/List";
import ReviewsSingle from "./pages/reviews/single/Single";
import AnalyticsList from "./pages/analytics/list/List";
import AnalyticsSingle from "./pages/analytics/single/Single";
import SettingsList from "./pages/settings/list/List";
import SettingsSingle from "./pages/settings/single/Single";
import SettingsNew from "./pages/settings/new/New"; 
import { dispatchInput, driversInput, riderInput, notificationInput, settingsInput} from "./data/formSource";
import './style/dark.scss'
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  
  const { darkMode } = useContext(DarkModeContext)
  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/login"/>
  }

  return (
    <div className= {darkMode ? "app dark" : "app"}>
       <BrowserRouter>
        <Routes>
          <Route path="/">
          <Route path="login" element={<Login/>}/>
          <Route path="forgotPwd" element={<ForgotPwd/>}/>
            <Route index element={
            <RequireAuth>
                 <Home user={currentUser}/>
            </RequireAuth>
            
           } />

            <Route path="riders">
              <Route index element={
                <RequireAuth>
                 <RidersList />
              </RequireAuth>
              }/>
              <Route path=":riderId" element={
              <RequireAuth>
                  <RiderSingle/>
              </RequireAuth>
              
              }/>
              <Route path="new" element={
                <RequireAuth>
                  <RiderNew inputs={riderInput} title="Add New Rider"/>
                </RequireAuth>
              }/>
            </Route>
            <Route path="dispatch">
              <Route index element={
               <RequireAuth>
                <DispatchList />
               </RequireAuth>
              }/>
              <Route path=":dispatchId" element={
                <RequireAuth>
                 <DispatchSingle/>
                </RequireAuth>
              }/>
              <Route path="new" element={
                <RequireAuth>
                  <DispatchNew inputs={dispatchInput} title="Add New Dispatch Rider"/>
                </RequireAuth>
              }/>
              </Route> 
            </Route>
            
            <Route path="rides">
              <Route index element={
                <RequireAuth>
                  <RideList/>
                </RequireAuth>
              }/>
              <Route path=":orderId" element={
              <RequireAuth>
                  <RideSingle/>
              </RequireAuth>
              }/>
            
            </Route>

            <Route path="rideHistory">
              <Route index element={
                <RequireAuth>
                  <RideHistoryList/>
                </RequireAuth>
              }/>
              <Route path=":rideHistoryId" element={
              <RequireAuth>
                  <RideHistorySingle/>
              </RequireAuth>
              }/>
            
            </Route>

            <Route path="drivers">
              <Route index element={
                <RequireAuth>
                  <DriversList/>
                </RequireAuth>
              }/>
              <Route path=":driverId" element={
              <RequireAuth>
                  <DriverSingle/>
              </RequireAuth>
              }/>

              <Route path="new" element={
                <RequireAuth>
                  <DriversNew inputs={driversInput} title="Add New Driver"/>
                </RequireAuth>
              }/>
            
            </Route>
            <Route path="notifications">
              <Route index element={
               <RequireAuth>
                <NotificationList />
               </RequireAuth>
              }/>
              <Route path=":notificationId" element={
                <RequireAuth>
                 <NotificationSingle/>
                </RequireAuth>
              }/>
              <Route path="new" element={
                <RequireAuth>
                  <NotificationNew inputs={notificationInput} title="Add New Dish"/>
                </RequireAuth>
              }/>
              </Route>
            <Route path="reviews">
              <Route index element={
               <RequireAuth>
                <ReviewsList />
               </RequireAuth>
              }/>
              <Route path=":reviewId" element={
                <RequireAuth>
                 <ReviewsSingle/>
                </RequireAuth>
              }/>
            
              </Route>
              <Route path="analytics">
              <Route index element={
               <RequireAuth>
                <AnalyticsList />
               </RequireAuth>
              }/>
              <Route path=":analyticsId" element={
                <RequireAuth>
                 <AnalyticsSingle/>
                </RequireAuth>
              }/>
           
              </Route>

              <Route path="settings">
              <Route index element={
               <RequireAuth>
                <SettingsList />
               </RequireAuth>
              }/>
              <Route path=":settingsId" element={
                <RequireAuth>
                 <SettingsSingle/>
                </RequireAuth>
              }/>
              <Route path="new" element={
                <RequireAuth>
                  <SettingsNew inputs={settingsInput} title="Add Settings"/>
                </RequireAuth>
              }/>
              </Route>
        </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
