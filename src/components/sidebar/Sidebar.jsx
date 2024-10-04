import React, { useContext, useState} from 'react'
import './sidebar.scss'
import Dashboard from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import StoreIcon from '@mui/icons-material/Store';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListIcon from '@mui/icons-material/List';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ReviewsIcon from '@mui/icons-material/Reviews';
// import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, Link } from 'react-router-dom'
import { DarkModeContext } from '../../context/darkModeContext';
import {signOut } from "firebase/auth";
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Sidebar = () => {

  const { darkMode, dispatch : setDarkMode } = useContext(DarkModeContext)

  // const values = [
  //   { id : 1, text : "Dashboard", link: "/", iconName : Dashboard, heading:"LIST"},
  //   { id : 2, text : "Customers", link: "/customers", iconName : PeopleOutlineIcon, heading:""},
  //   { id : 3, text : "Dishes", link: "/dishes", iconName : StoreIcon, heading:""},
  //   { id : 4, text : "Orders", link: "/orders", iconName : Inventory2Icon, heading:""},
  //   { id : 5, text : "Order History", link: "/orderHistory", iconName : ListIcon},
  //   { id : 5, text : "Drivers", link: "/drivers", iconName : DeliveryDiningIcon, heading:"USEFUL"},
  //   { id : 6, text : "Notifications", link: "/notifications", iconName : NotificationsNoneIcon, heading:""},
  //   { id : 7, text : "Reviews", link: "/reviews", iconName : ReviewsIcon, heading:""},
  //   { id : 8, text : "Analytics", link: "/analytics", iconName : BarChartIcon, heading:"SERVICES"},
  //   { id : 10, text : "Settings", link: "/settings", iconName : SettingsIcon, heading:"USER"},
  //   { id : 11, text : "Profile", link: "/profile", iconName : PermIdentityIcon, heading:""},
  // ]


  const values = [
    { id : 1, text : "Dashboard", link: "/", iconName : Dashboard, heading:"LIST"},
    { id : 2, text : "Drivers", link: "/drivers", iconName : PeopleOutlineIcon, heading:""},
    { id : 3, text : "Riders", link: "/riders", iconName : StoreIcon, heading:""},
    { id : 4, text : "Rides", link: "/rides", iconName : Inventory2Icon, heading:""},
    { id : 6, text : "Ride History", link: "/rideHistory", iconName : ListIcon},
    { id : 5, text : "Dispatch Drivers", link: "/dispatch", iconName : DeliveryDiningIcon, heading:""},
    { id : 7, text : "Delivery", link: "/delivery", iconName : DeliveryDiningIcon, heading:""},
    { id : 8, text : "DeliveryHistory", link: "/deliveryHistory", iconName : DeliveryDiningIcon, heading:""},
    { id : 9, text : "Payments", link: "/payments", iconName : StoreIcon, heading:""},
    { id : 10, text : "Coupon", link: "/coupon", iconName : DeliveryDiningIcon, heading:"USEFUL"},
    { id : 11, text : "Notifications", link: "/notifications", iconName : NotificationsNoneIcon, heading:""},
    { id : 12, text : "Reviews", link: "/reviews", iconName : ReviewsIcon, heading:""},
    { id : 13, text : "Chats", link: "/chats", iconName : NotificationsNoneIcon, heading:""},
    { id : 14, text : "messages", link: "/messages", iconName : NotificationsNoneIcon, heading:""},
    { id : 15, text : "Calls", link: "/calls", iconName : ReviewsIcon, heading:""},
    { id : 16, text : "Analytics", link: "/analytics", iconName : BarChartIcon, heading:"SERVICES"},
    { id : 17, text : "Settings", link: "/settings", iconName : SettingsIcon, heading:"USER"},
    { id : 18, text : "Profile", link: "/profile", iconName : PermIdentityIcon, heading:""},
  ]

  const navigate = useNavigate()

  const { logout, dispatch : setLogout} = useContext(AuthContext)

  const { isActive, setIsActive } = useState(null)

 

  const logOut = () =>{
    signOut(auth).then(() => {

      setLogout({ type: 'LOGOUT' });
      localStorage.removeItem('currentUser');
      navigate('/login')
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <div className='sidebar'>

      <div className='top-sidebar'>
          <div className="top">
            <Link to="/" style={{textDecoration:'none'}}>
                <span className='logo'>RIDESMASH ADMIN</span>
            </Link>
          </div>
          <hr />
          <div className="center">
            <ul>
              <p className='title'>MAIN</p>
              {values.map((value) => (
                  <>
                   
                   <li key = {value.id} >
                      <NavLink to={value.link} style={({ isActive }) => ({
                        backgroundColor: isActive &&  "#ece8ff",
                        textDecoration:"none",
                        display:"flex",
                        width:"100%",
                        height:"100%",
                        padding:"5px",
                      })}>
                      <value.iconName className='icon'/>
                      <span>{value.text}</span>
                      </NavLink>
                      
                    </li>
                    {value.heading !== "" && <p className='title'>{value.heading}</p>}
                  </>
                
              ))}
          
              
            </ul>
          </div>
          <div className="bottom">
            <div className="colorOption" onClick={() => setDarkMode({type:"LIGHT"})}></div>
            <div className="colorOption" onClick={() => setDarkMode({type:"DARK"})}></div>
          </div> 
      </div>
      <div className='bottom-sidebar'>
            <LogoutIcon className='logout-icon'/>
            <span onClick={logOut}>Logout</span>
      </div>
    </div>
  )
}

export default Sidebar