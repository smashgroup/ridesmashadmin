import React, { useContext, useState, useEffect } from 'react'
import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/AuthContext'
import { collection, getDoc,  deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from '../../firebase'

const Navbar = () => {

 const {dispatch} = useContext(DarkModeContext)
 const { currentUser } = useContext(AuthContext)

 const [ adminData, setAdminData ] = useState([])

 const getAdmin = async() => {

  const docRef = doc(db, "customers", currentUser.uid);

  const docSnap = await getDoc(docRef);


  
  if (docSnap.exists()) {

    setAdminData(docSnap.data())
    // console.log(userData)
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

useEffect(()=>{
  getAdmin()
}, [])





 console.log(currentUser)
 console.log(currentUser.uid)


  return (
    <div className="navbar">
      <div className="wrapper">
          <div className="search">
            <input type="text" placeholder='Search...' />
            <SearchOutlinedIcon/>
          </div>
          <div className="items">
            <div className="item">
              <LanguageOutlinedIcon className='icon'/>
              English
            </div>
            <div className="item">
              < DarkModeOutlinedIcon className='icon' onClick={() => dispatch({type:'TOGGLE'})}/>
            </div>
            <div className="item">
              <FullscreenExitOutlinedIcon className='icon'/>
            </div>
            <div className="item">
              <NotificationsNoneOutlinedIcon className='icon'/>
              <div className="counter">1</div>
            </div>
            <div className="item">
              <ChatBubbleOutlineOutlinedIcon className='icon'/>
              <div className="counter">1</div>
            </div>
            <div className="item">
              <ListOutlinedIcon className='icon'/>
            </div>
            <div className="item">
              <img 
                src={adminData.img}
                className='pic'
              />
            </div>
            <div className="item">
              <span>{adminData.fullname}</span>
            </div>

          </div> 
      </div>     
    </div>
  )
}

export default Navbar