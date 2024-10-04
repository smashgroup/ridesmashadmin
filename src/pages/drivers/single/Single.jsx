import React, { useEffect, useState } from 'react'
import './single.scss'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import Chart from '../../../components/chart/Chart'
import { doc, getDoc } from "firebase/firestore"
import { useHistory, useParams } from "react-router-dom"
import { db } from '../../../firebase'
import DriverTripTable from '../../../components/table/DriverTripTable'

const Single = ({user}) => {

  const {driverId} = useParams()


  const [ driverData, setDriverData ] = useState("")

  // const [ orderData, setOrderData ] = useState([])

  const getDriver = async() => {

      const docRef = doc(db, "drivers", driverId);

      const docSnap = await getDoc(docRef);

      
      if (docSnap.exists()) {

        // console.log("Document data:", docSnap.data());
        setDriverData(docSnap.data())
        // console.log(userData)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  }

  useEffect(()=>{
    getDriver()
  }, [])




  return (
    <div className='single'>
      <Sidebar/>
      <div className='singleContainer'>
        <Navbar/>
        <div className="top">
          <div className="left">
            {/* <div className="editbutton">Edit</div> */}
            <h2 className='title'>Information</h2>
            <div className='item'>
            <img
                src = {driverData.img ? driverData.img : "../images/user.png"}
                alt="avatar"
                style={{width:'100px', height:'100px', borderRadius:'50%'}}
                   
            /> 
              

          
               
                <div className="details">
                  <h3 className='itemTitle'>{driverData.firstname} {driverData.Lastname}</h3>
                 
                  <div className='detailItem'>
                    <span className='itemKey'>Telephone:</span>
                    <span className='itemValue'>{driverData.telephone}</span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Email:</span>
                    <span className='itemValue'>{driverData.email}</span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Address:</span>
                    <span className='itemValue'>{driverData.address}</span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Plate Number:</span>
                    <span className='itemValue'>{driverData.platenumber}</span>
                  </div>
                
                </div>
            </div>
          </div>
          <div>
            <Chart 
              aspect={3/1}
              title = "Completed Deliveries last 6 months"
            />
          </div>
        </div>
        <div className="bottom">
        <div className='listTitle'>Driver Delivery History</div>
          <DriverTripTable
                driverId = {driverId}
          />
        </div>
      </div>
    </div>
  )
}

export default Single