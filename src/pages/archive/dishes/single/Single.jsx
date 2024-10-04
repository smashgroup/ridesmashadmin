import React from 'react'
import './single.scss'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import Chart from '../../../components/chart/Chart'
import SalesTable from '../../../components/table/SalesTable'
import { useParams } from 'react-router-dom'



const Single = () => {

  const params = useParams()

  console.log(params)
  
  return (
    <div className='single'>
      <Sidebar/>
      <div className='singleContainer'>
        <Navbar/>
        <div className="top">
          <div className="left">
            <div className="editbutton">Edit</div>
            <h2 className='title'>Information</h2>
            <div className='item'>
                <img
                    src="../photo/student4.jpg"
                    alt="avatar"
                    className="itemimg"
                />
                <div className="details">
                  <h3 className='itemTitle'>Chukwudi Johnson</h3>
                  <div className='detailItem'>
                    <span className='itemKey'>Email:</span>
                    <span className='itemValue'>chukwudi@gmail.com</span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Phone:</span>
                    <span className='itemValue'>+2348139444402</span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Address:</span>
                    <span className='itemValue'>34 simpson st. Awka</span>
                  </div>
                  <div className='detailItem'>
                    <span className='itemKey'>Gender:</span>
                    <span className='iitemValue'>Male</span>
                  </div>
                </div>
            </div>
          </div>
          <div className='right'>
            <Chart 
              aspect={3/1}
              title = "Customer purchase last 6 months"
            />
          </div>
        </div>
        <div className="bottom">
        <div className='listTitle'>Customer Lastest Transactions</div>
          <SalesTable/>
        </div>
      </div>
    </div>
  )
}

export default Single